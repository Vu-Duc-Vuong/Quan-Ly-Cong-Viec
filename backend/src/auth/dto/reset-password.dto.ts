import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Token không được để trống' })
  token: string;

  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
  @MaxLength(50, { message: 'Mật khẩu mới không được vượt quá 50 ký tự' })
  newPassword: string;
}