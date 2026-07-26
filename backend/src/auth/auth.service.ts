import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {

    const user = await this.usersService.findByEmail(
      registerDto.email,
    );

    if (user) {

      throw new BadRequestException(
        'Email đã tồn tại',
      );

    }

    const password = await bcrypt.hash(
      registerDto.password,
      10,
    );

    await this.usersService.create({

      fullName: registerDto.fullName,

      email: registerDto.email,

      password,

    });

    return {

      message: 'Đăng ký thành công',

    };

  }

  async login(loginDto: LoginDto) {

    const user = await this.usersService.findByEmail(
      loginDto.email,
    );

    if (!user) {

      throw new UnauthorizedException(
        'Email hoặc mật khẩu không đúng',
      );

    }

    const checkPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!checkPassword) {

      throw new UnauthorizedException(
        'Email hoặc mật khẩu không đúng',
      );

    }

    const payload = {

      sub: user.id,

      email: user.email,

    };

    return {

      access_token: this.jwtService.sign(payload),

      user: {

        id: user.id,

        fullName: user.fullName,

        email: user.email,

      },

    };

  }

}