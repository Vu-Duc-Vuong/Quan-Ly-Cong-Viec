import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';

import {
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';


describe('AuthService', () => {

  let service: AuthService;


  const mockUsersService = {

    findByEmail: jest.fn(),

    create: jest.fn(),

    findById: jest.fn(),

    updatePassword: jest.fn(),

  };



  const mockJwtService = {

    sign: jest.fn()
      .mockReturnValue('fake-token'),

    verify: jest.fn()
      .mockReturnValue({

        sub: 1,

        email: 'test@gmail.com',

      }),

  };



  const mockMailService = {

    sendResetPasswordEmail: jest.fn()
      .mockResolvedValue(true),

  };




  beforeEach(async () => {

    jest.clearAllMocks();


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


    service =
      module.get<AuthService>(AuthService);

  });





  it('Khởi tạo AuthService thành công', () => {

    expect(service).toBeDefined();

  });







  describe('register()', () => {


    it('Đăng ký thành công', async () => {


      mockUsersService.findByEmail
        .mockResolvedValue(null);



      mockUsersService.create
        .mockResolvedValue({

          id: 1,

          email: 'test@gmail.com',

        });



      const result =
        await service.register({

          fullName: 'Test User',

          email: 'test@gmail.com',

          password: '123456',

        });



      expect(result).toEqual({

        message: 'Đăng ký thành công',

      });



      expect(
        mockUsersService.create,
      ).toHaveBeenCalled();


    });






    it('Không cho đăng ký email đã tồn tại', async () => {


      mockUsersService.findByEmail
        .mockResolvedValue({

          id: 1,

          email: 'test@gmail.com',

        });



      await expect(

        service.register({

          fullName: 'Test',

          email: 'test@gmail.com',

          password: '123456',

        })

      ).rejects.toThrow(
        ConflictException,
      );


    });


  });









  describe('login()', () => {



    it('Đăng nhập thành công', async () => {


      const password =
        await bcrypt.hash(
          '123456',
          10,
        );



      mockUsersService.findByEmail
        .mockResolvedValue({

          id: 1,

          fullName: 'Test User',

          email: 'test@gmail.com',

          password,

        });



      const result =
        await service.login({

          email: 'test@gmail.com',

          password: '123456',

        });



      expect(
        result.access_token,
      ).toBe('fake-token');



      expect(
        result.user.email,
      ).toBe(
        'test@gmail.com',
      );


    });







    it('Sai mật khẩu phải báo lỗi', async () => {


      const password =
        await bcrypt.hash(
          'wrong',
          10,
        );



      mockUsersService.findByEmail
        .mockResolvedValue({

          id: 1,

          email: 'test@gmail.com',

          password,

        });



      await expect(

        service.login({

          email: 'test@gmail.com',

          password: '123456',

        })

      ).rejects.toThrow(
        UnauthorizedException,
      );


    });


  });









  describe('forgotPassword()', () => {


    it('Gửi email reset password thành công', async () => {


      mockUsersService.findByEmail
        .mockResolvedValue({

          id:1,

          email:'test@gmail.com',

        });



      const result =
        await service.forgotPassword({

          email:'test@gmail.com',

        });



      expect(
        mockMailService.sendResetPasswordEmail,
      ).toHaveBeenCalled();



      expect(result.message)
        .toBe(
          'Đã gửi email đặt lại mật khẩu',
        );


    });


  });









  describe('resetPassword()', () => {


    it('Reset password thành công', async () => {


      mockUsersService.findById
        .mockResolvedValue({

          id:1,

          email:'test@gmail.com',

        });



      const result =
        await service.resetPassword({

          token:'fake-token',

          newPassword:'123456',

        });



      expect(
        mockUsersService.updatePassword,
      ).toHaveBeenCalled();



      expect(result.message)
        .toBe(
          'Đặt lại mật khẩu thành công',
        );


    });


  });









  describe('profile()', () => {



    it('Không tìm thấy user', async () => {


      mockUsersService.findById
        .mockResolvedValue(null);



      await expect(

        service.profile(1)

      ).rejects.toThrow(
        NotFoundException,
      );


    });







    it('Lấy profile thành công', async () => {


      mockUsersService.findById
        .mockResolvedValue({

          id:1,

          fullName:'Test User',

          email:'test@gmail.com',

          avatar:'avatar.png',

        });



      const result =
        await service.profile(1);



      expect(result.email)
        .toBe(
          'test@gmail.com',
        );


    });



  });



});