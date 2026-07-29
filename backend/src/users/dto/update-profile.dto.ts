import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: 'Họ và tên không được vượt quá 100 ký tự',
  })
  fullName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'Đường dẫn ảnh không được vượt quá 255 ký tự',
  })
  avatar: string;
}