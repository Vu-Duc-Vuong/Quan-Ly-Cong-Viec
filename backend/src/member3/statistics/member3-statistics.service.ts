import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../../tasks/entities/task.entity';

@Injectable()
export class Member3StatisticsService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  async summary(userId: number) {
    const tasks = await this.taskRepository.find({ where: { user: { id: userId } } });
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return {
      totalTasks: tasks.length,
      dueTodayTasks: tasks.filter((task) => {
        if (!task.deadline) return false;
        const deadline = new Date(task.deadline);
        return deadline >= start && deadline < end;
      }).length,
      overdueTasks: tasks.filter((task) =>
        Boolean(task.deadline) && new Date(task.deadline) < now && task.status !== TaskStatus.DONE,
      ).length,
      completedTasks: tasks.filter((task) => task.status === TaskStatus.DONE).length,
    };
  }
}
