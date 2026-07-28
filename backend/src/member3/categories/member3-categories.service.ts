import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateMember3CategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import { TaskCategory } from '../entities/task-category.entity';

@Injectable()
export class Member3CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(TaskCategory)
    private readonly taskCategoryRepository: Repository<TaskCategory>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  findAll(userId: number) {
    return this.categoryRepository.find({ where: { userId }, order: { name: 'ASC' } });
  }

  async create(userId: number, dto: CreateCategoryDto) {
  return this.categoryRepository.save(
    this.categoryRepository.create({
      userId,
      name: dto.name.trim(),
      description: dto.description?.trim() || null,
    }),
  );
}

  async update(userId: number, id: number, dto: UpdateMember3CategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id, userId } });
    if (!category) throw new NotFoundException('Không tìm thấy danh mục');

    if (dto.name !== undefined) category.name = dto.name.trim();
    if (dto.description !== undefined) category.description = dto.description.trim() || null;
    return this.categoryRepository.save(category);
  }

  async remove(userId: number, id: number) {
    const category = await this.categoryRepository.findOne({ where: { id, userId } });
    if (!category) throw new NotFoundException('Không tìm thấy danh mục');

    await this.taskCategoryRepository.delete({ categoryId: id });
    await this.categoryRepository.remove(category);
    return { success: true, message: 'Đã xóa danh mục' };
  }

  async assignTask(userId: number, taskId: number, categoryId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId, user: { id: userId } } });
    if (!task) throw new NotFoundException('Không tìm thấy công việc');

    const category = await this.categoryRepository.findOne({ where: { id: categoryId, userId } });
    if (!category) throw new NotFoundException('Không tìm thấy danh mục');

    const oldLinks = await this.taskCategoryRepository.find({ where: { taskId } });
    if (oldLinks.length) await this.taskCategoryRepository.remove(oldLinks);

    return this.taskCategoryRepository.save(
      this.taskCategoryRepository.create({ taskId, categoryId }),
    );
  }

  async unassignTask(userId: number, taskId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId, user: { id: userId } } });
    if (!task) throw new NotFoundException('Không tìm thấy công việc');
    await this.taskCategoryRepository.delete({ taskId });
    return { success: true };
  }
}
