import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../../tasks/entities/task.entity';
import { Category } from '../entities/category.entity';
import { TaskCategory } from '../entities/task-category.entity';

@Injectable()
export class Member3TaskQueryService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(TaskCategory) private readonly taskCategoryRepository: Repository<TaskCategory>,
  ) {}

  async searchAndFilter(userId: number, keyword?: string, categoryId?: number, status?: TaskStatus) {
    const query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoin('task.user', 'user')
      .where('user.id = :userId', { userId });

    if (keyword?.trim()) {
      query.andWhere('(LOWER(task.title) LIKE :keyword OR LOWER(task.description) LIKE :keyword)', {
        keyword: `%${keyword.trim().toLowerCase()}%`,
      });
    }

    if (status && Object.values(TaskStatus).includes(status)) {
      query.andWhere('task.status = :status', { status });
    }

    if (categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: categoryId, userId } });
      if (!category) return [];
      const links = await this.taskCategoryRepository.find({ where: { categoryId } });
      const taskIds = links.map((link) => link.taskId);
      if (!taskIds.length) return [];
      query.andWhere('task.id IN (:...taskIds)', { taskIds });
    }

    const tasks = await query.orderBy('task.updatedAt', 'DESC').getMany();
    const links = tasks.length
      ? await this.taskCategoryRepository
          .createQueryBuilder('link')
          .where('link.taskId IN (:...taskIds)', { taskIds: tasks.map((task) => task.id) })
          .getMany()
      : [];
    const categoryIds = [...new Set(links.map((link) => link.categoryId))];
    const categories = categoryIds.length
      ? await this.categoryRepository
          .createQueryBuilder('category')
          .where('category.id IN (:...categoryIds)', { categoryIds })
          .andWhere('category.userId = :userId', { userId })
          .getMany()
      : [];

    const categoryMap = new Map(categories.map((category) => [category.id, category]));
    const linkMap = new Map(links.map((link) => [link.taskId, categoryMap.get(link.categoryId) || null]));
    return tasks.map((task) => ({ ...task, category: linkMap.get(task.id) || null }));
  }
}
