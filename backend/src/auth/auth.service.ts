import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../users/users.service";
import { MailService } from "../mail/mail.service";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByEmail(
      registerDto.email,
    );

    if (user) {
      throw new ConflictException(
        "Email đã tồn tại",
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
      message: "Đăng ký thành công",
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(
      loginDto.email,
    );

    if (!user) {
      throw new UnauthorizedException(
        "Email hoặc mật khẩu không đúng",
      );
    }

    const checkPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!checkPassword) {
      throw new UnauthorizedException(
        "Email hoặc mật khẩu không đúng",
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

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ) {
    const user = await this.usersService.findByEmail(
      forgotPasswordDto.email,
    );

    if (!user) {
      return {
        message:
          "Nếu email tồn tại, hệ thống sẽ gửi hướng dẫn đặt lại mật khẩu",
      };
    }

    const token = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
      },
      {
        expiresIn: "15m",
      },
    );

    const link =
      `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    try {
      await this.mailService.sendResetPasswordEmail(
        user.email,
        link,
      );
    } catch {
      throw new InternalServerErrorException(
        "Không gửi được email đặt lại mật khẩu",
      );
    }

    return {
      message: "Đã gửi email đặt lại mật khẩu",
    };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ) {
    try {
      const payload = this.jwtService.verify(
        resetPasswordDto.token,
      );

      const user = await this.usersService.findById(
        payload.sub,
      );

      if (!user) {
        throw new NotFoundException(
          "Người dùng không tồn tại",
        );
      }

      const password = await bcrypt.hash(
        resetPasswordDto.newPassword,
        10,
      );

      await this.usersService.updatePassword(
        user.id,
        password,
      );

      return {
        message: "Đặt lại mật khẩu thành công",
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new UnauthorizedException(
        "Token không hợp lệ hoặc đã hết hạn",
      );
    }
  }

  async profile(id: number) {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException(
        "Không tìm thấy người dùng",
      );
    }

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
    };
  }
}