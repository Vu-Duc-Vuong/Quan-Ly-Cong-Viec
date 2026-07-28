import { TaskPriority, TaskStatus } from '../entities/task.entity';


export class CreateTaskDto {

    title: string;

    description?: string;

    status?: TaskStatus;

    priority?: TaskPriority;

    deadline?: Date;

    categoryId?: number;

}