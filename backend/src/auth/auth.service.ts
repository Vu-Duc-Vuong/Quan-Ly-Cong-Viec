import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
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

}