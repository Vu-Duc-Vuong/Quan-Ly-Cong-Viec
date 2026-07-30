import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    updateStatus: jest.fn(),
    updatePriority: jest.fn(),
    completeTask: jest.fn(),
    search: jest.fn(),
    today: jest.fn(),
    overdue: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [TasksController],
        providers: [
          {
            provide: TasksService,
            useValue: mockTasksService,
          },
        ],
      }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('Khởi tạo TasksController thành công', () => {
    expect(controller).toBeDefined();
  });

  it('Có hàm create', () => {
    expect(controller.create).toBeDefined();
  });

  it('Có hàm findAll', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('Có hàm update', () => {
    expect(controller.update).toBeDefined();
  });

  it('Có hàm remove', () => {
    expect(controller.remove).toBeDefined();
  });
});