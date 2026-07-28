import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            updateProfile: jest.fn(),
            changePassword: jest.fn(),
            updatePassword: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("Service được tạo", () => {
    expect(service).toBeDefined();
  });

  it("Có hàm create", () => {
    expect(service.create).toBeDefined();
  });

  it("Có hàm findByEmail", () => {
    expect(service.findByEmail).toBeDefined();
  });

  it("Có hàm updateProfile", () => {
    expect(service.updateProfile).toBeDefined();
  });

  it("Có hàm changePassword", () => {
    expect(service.changePassword).toBeDefined();
  });
});