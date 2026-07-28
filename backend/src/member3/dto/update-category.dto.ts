import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateMember3CategoryDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;
}
