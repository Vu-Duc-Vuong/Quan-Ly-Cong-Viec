import { IsEnum } from 'class-validator';
import { TaskPriority } from '../entities/task.entity';

export class UpdatePriorityDto {
  @IsEnum(TaskPriority, {
    message: 'Độ ưu tiên không hợp lệ',
  })
  priority: TaskPriority;
}