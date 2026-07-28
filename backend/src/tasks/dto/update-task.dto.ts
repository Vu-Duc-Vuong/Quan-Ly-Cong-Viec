import { TaskPriority, TaskStatus } from '../entities/task.entity';


export class UpdateTaskDto {

    title?: string;

    description?: string;

    status?: TaskStatus;

    priority?: TaskPriority;

    deadline?: Date;

    // ID danh mục gán cho task
    categoryId?: number;

}