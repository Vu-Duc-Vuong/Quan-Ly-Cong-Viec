import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @MaxLength(100, {
    message: 'Tên danh mục không được vượt quá 100 ký tự',
  })
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, {
    message: 'Mô tả không được vượt quá 500 ký tự',
  })
  description?: string;
}