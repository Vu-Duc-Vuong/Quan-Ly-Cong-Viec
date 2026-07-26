import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';

import { LoginDto } from './dto/login.dto';

import { Get } from '@nestjs/common';

import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';

import { GetUser } from './get-user.decorator';
@Controller('auth')
export class AuthController {

  constructor(

    private readonly authService: AuthService

  ) {}

  @Post('register')

  register(

    @Body() registerDto: RegisterDto

  ) {

    return this.authService.register(
      registerDto,
    );

  }
  @Post('login')
  login(
  @Body() loginDto: LoginDto,
  ) {
  return this.authService.login(loginDto);
  }
  @Get('profile')

  @UseGuards(JwtAuthGuard)

  profile(

  @GetUser() user: any

  ) {

  return user;

  }

}