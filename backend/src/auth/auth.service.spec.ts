import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "../mail/mail.service";

describe("AuthService", () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    updatePassword: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue("fake-token"),
    verify: jest.fn().mockReturnValue({
      sub: 1,
      email: "test@gmail.com",
    }),
  };

  const mockMailService = {
    sendResetPasswordEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [
          AuthService,
          {
            provide: UsersService,
            useValue: mockUsersService,
          },
          {
            provide: JwtService,
            useValue: mockJwtService,
          },
          {
            provide: MailService,
            useValue: mockMailService,
          },
        ],
      }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("Service được tạo", () => {
    expect(service).toBeDefined();
  });

  it("Có hàm register", () => {
    expect(service.register).toBeDefined();
  });

  it("Có hàm login", () => {
    expect(service.login).toBeDefined();
  });

  it("Có hàm forgotPassword", () => {
    expect(service.forgotPassword).toBeDefined();
  });

  it("Có hàm resetPassword", () => {
    expect(service.resetPassword).toBeDefined();
  });

  it("Có hàm profile", () => {
    expect(service.profile).toBeDefined();
  });
});