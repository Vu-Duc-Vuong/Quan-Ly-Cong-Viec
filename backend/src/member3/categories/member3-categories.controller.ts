import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { GetUser } from '../../auth/get-user.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

import { AssignCategoryDto } from '../dto/assign-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateMember3CategoryDto } from '../dto/update-category.dto';

import { Member3CategoriesService } from './member3-categories.service';


@Controller('member3/categories')
@UseGuards(JwtAuthGuard)
export class Member3CategoriesController {


  constructor(
    private readonly service: Member3CategoriesService,
  ) {}





  // Lấy danh sách category

  @Get()
  findAll(

    @GetUser() user:any,

  ) {

    return this.service.findAll(

      user.id,

    );

  }





  // Tạo category

  @Post()
  create(

    @GetUser() user:any,

    @Body() dto:CreateCategoryDto,

  ) {

    return this.service.create(

      user.id,

      dto,

    );

  }





  // Cập nhật category

  @Patch(':id')
  update(

    @GetUser() user:any,

    @Param(
      'id',
      ParseIntPipe,
    )
    id:number,

    @Body()
    dto:UpdateMember3CategoryDto,

  ) {

    return this.service.update(

      user.id,

      id,

      dto,

    );

  }





  // Xóa category

  @Delete(':id')
  remove(

    @GetUser() user:any,

    @Param(
      'id',
      ParseIntPipe,
    )
    id:number,

  ) {

    return this.service.remove(

      user.id,

      id,

    );

  }





  // Gán category cho task

  @Post('assign-task')
  assignTask(

    @GetUser() user:any,

    @Body()
    dto:AssignCategoryDto,

  ) {

    return this.service.assignTask(

      user.id,

      dto.taskId,

      dto.categoryId,

    );

  }





  // Bỏ category khỏi task

  @Delete('task/:taskId')
  unassignTask(

    @GetUser() user:any,

    @Param(
      'taskId',
      ParseIntPipe,
    )
    taskId:number,

  ) {

    return this.service.unassignTask(

      user.id,

      taskId,

    );

  }


}