import { IsInt, IsPositive } from 'class-validator';

export class AssignCategoryDto {
  @IsInt({
    message: 'Task ID phải là số nguyên',
  })
  @IsPositive({
    message: 'Task ID phải lớn hơn 0',
  })
  taskId!: number;

  @IsInt({
    message: 'Category ID phải là số nguyên',
  })
  @IsPositive({
    message: 'Category ID phải lớn hơn 0',
  })
  categoryId!: number;
}