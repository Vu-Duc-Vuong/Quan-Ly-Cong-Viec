import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateMember3CategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class Member3CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Lấy danh sách category + công việc bên trong
  async findAll(userId: number) {
    try {
      const categories = await this.categoryRepository.find({
        where: {
          userId,
        },
        relations: {
          tasks: true,
        },
        order: {
          name: 'ASC',
        },
      });

      return categories.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        tasks:
          category.tasks?.map(task => ({
            id: task.id,
            title: task.title,
            status: task.status,
            priority: task.priority,
            deadline: task.deadline,
          })) || [],
      }));
    } catch {
      throw new InternalServerErrorException(
        'Không lấy được danh sách danh mục',
      );
    }
  }

  // Tạo category
  async create(userId: number, dto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      userId,
      name: dto.name.trim(),
      description: dto.description?.trim() || null,
    });

    try {
      return await this.categoryRepository.save(category);
    } catch {
      throw new InternalServerErrorException(
        'Không thể tạo danh mục',
      );
    }
  }

  // Sửa category
  async update(userId: number, id: number, dto: UpdateMember3CategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }

    if (dto.name !== undefined) {
      category.name = dto.name.trim();
    }

    if (dto.description !== undefined) {
      category.description = dto.description.trim() || null;
    }

    try {
      return await this.categoryRepository.save(category);
    } catch {
      throw new InternalServerErrorException(
        'Không thể cập nhật danh mục',
      );
    }
  }

  // Xóa category
  async remove(userId: number, id: number) {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }

    try {
      await this.categoryRepository.remove(category);
    } catch {
      throw new InternalServerErrorException(
        'Không thể xóa danh mục',
      );
    }

    return {
      success: true,
      message: 'Đã xóa danh mục',
    };
  }

  // Gán category cho task
  async assignTask(userId: number, taskId: number, categoryId: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        user: {
          id: userId,
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Không tìm thấy công việc');
    }

    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }

    task.category = category;

    try {
      return await this.taskRepository.save(task);
    } catch {
      throw new InternalServerErrorException(
        'Không thể gán danh mục cho công việc',
      );
    }
  }

  // Bỏ category khỏi task
  async unassignTask(userId: number, taskId: number) {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
        user: {
          id: userId,
        },
      },
    });

    if (!task) {
      throw new NotFoundException('Không tìm thấy công việc');
    }

    task.category = null;

    try {
      await this.taskRepository.save(task);
    } catch {
      throw new InternalServerErrorException(
        'Không thể bỏ danh mục khỏi công việc',
      );
    }

    return {
      success: true,
    };
  }
}