import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { User } from '../users/user.entity';
import { Category } from '../member3/entities/category.entity';

describe('TasksService', () => {
  let service: TasksService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          TasksService,
          {
            provide: getRepositoryToken(Task),
            useValue: mockRepository,
          },
          {
            provide: getRepositoryToken(User),
            useValue: mockRepository,
          },
          {
            provide: getRepositoryToken(Category),
            useValue: mockRepository,
          },
        ],
      }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('Khởi tạo TasksService thành công', () => {
    expect(service).toBeDefined();
  });

  it('Có hàm create', () => {
    expect(service.create).toBeDefined();
  });

  it('Có hàm findAll', () => {
    expect(service.findAll).toBeDefined();
  });

  it('Có hàm update', () => {
    expect(service.update).toBeDefined();
  });

  it('Có hàm remove', () => {
    expect(service.remove).toBeDefined();
  });
});