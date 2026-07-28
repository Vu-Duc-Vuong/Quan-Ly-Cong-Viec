import { IsInt, IsPositive } from 'class-validator';

export class AssignCategoryDto {
  @IsInt()
  @IsPositive()
  taskId!: number;

  @IsInt()
  @IsPositive()
  categoryId!: number;
}