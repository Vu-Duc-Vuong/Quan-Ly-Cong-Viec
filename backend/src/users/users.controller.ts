import {
  Controller,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { GetUser } from '../auth/get-user.decorator';

import { UpdateProfileDto } from './dto/update-profile.dto';

import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {

  constructor(

    private readonly usersService: UsersService,

  ) {}

  @Put('profile')

  @UseGuards(JwtAuthGuard)

  updateProfile(

    @GetUser() user: any,

    @Body() updateProfileDto: UpdateProfileDto,

  ) {

    return this.usersService.updateProfile(

      user.id,

      updateProfileDto,

    );

  }
  @UseGuards(JwtAuthGuard)
@Put('change-password')
changePassword(

  @GetUser() user: any,

  @Body() changePasswordDto: ChangePasswordDto,

) {

  return this.usersService.changePassword(

    user.id,

    changePasswordDto.oldPassword,

    changePasswordDto.newPassword,

  );

}

}