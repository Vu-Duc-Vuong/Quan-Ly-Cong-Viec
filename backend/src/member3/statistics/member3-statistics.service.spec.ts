import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Member3StatisticsService } from './member3-statistics.service';
import { Task } from '../../tasks/entities/task.entity';

describe('Member3StatisticsService', () => {
  let service: Member3StatisticsService;

  const mockRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          Member3StatisticsService,
          {
            provide: getRepositoryToken(Task),
            useValue: mockRepository,
          },
        ],
      }).compile();

    service = module.get<Member3StatisticsService>(
      Member3StatisticsService,
    );
  });

  it('Khởi tạo service thành công', () => {
    expect(service).toBeDefined();
  });

  it('Có hàm summary', () => {
    expect(service.summary).toBeDefined();
  });
});