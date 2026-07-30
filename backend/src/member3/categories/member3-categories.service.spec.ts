import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Member3CategoriesService } from './member3-categories.service';
import { Category } from '../entities/category.entity';
import { Task } from '../../tasks/entities/task.entity';

describe('Member3CategoriesService', () => {
  let service: Member3CategoriesService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          Member3CategoriesService,
          {
            provide: getRepositoryToken(Category),
            useValue: mockRepository,
          },
          {
            provide: getRepositoryToken(Task),
            useValue: mockRepository,
          },
        ],
      }).compile();

    service = module.get<Member3CategoriesService>(
      Member3CategoriesService,
    );
  });

  it('Khởi tạo service thành công', () => {
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