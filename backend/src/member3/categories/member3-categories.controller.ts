import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../../auth/get-user.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AssignCategoryDto } from '../dto/assign-category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateMember3CategoryDto } from '../dto/update-category.dto';
import { Member3CategoriesService } from './member3-categories.service';

@Controller('member3/categories')
@UseGuards(JwtAuthGuard)
export class Member3CategoriesController {
  constructor(private readonly service: Member3CategoriesService) {}

  @Get()
  findAll(@GetUser() user: any) {
    return this.service.findAll(user.id);
  }

  @Post()
  create(@GetUser() user: any, @Body() dto: CreateCategoryDto) {
    return this.service.create(user.id, dto);
  }

  @Patch(':id')
  update(@GetUser() user: any, @Param('id') id: string, @Body() dto: UpdateMember3CategoryDto) {
    return this.service.update(user.id, Number(id), dto);
  }

  @Delete(':id')
  remove(@GetUser() user: any, @Param('id') id: string) {
    return this.service.remove(user.id, Number(id));
  }

  @Post('assign-task')
  assignTask(@GetUser() user: any, @Body() dto: AssignCategoryDto) {
    return this.service.assignTask(user.id, dto.taskId, dto.categoryId);
  }

  @Delete('task/:taskId')
  unassignTask(@GetUser() user: any, @Param('taskId') taskId: string) {
    return this.service.unassignTask(user.id, Number(taskId));
  }
}
