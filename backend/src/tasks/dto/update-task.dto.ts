import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(200, {
    message: 'Tiêu đề không được vượt quá 200 ký tự',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000, {
    message: 'Mô tả không được vượt quá 1000 ký tự',
  })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Trạng thái không hợp lệ',
  })
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority, {
    message: 'Độ ưu tiên không hợp lệ',
  })
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString({}, {
    message: 'Hạn hoàn thành không đúng định dạng',
  })
  deadline?: Date;

  @IsOptional()
  @IsInt({
    message: 'Category ID phải là số nguyên',
  })
  categoryId?: number;
}