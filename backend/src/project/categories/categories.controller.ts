import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    return { success: true, data: this.categoriesService.findAll() };
  }

  @Post()
  create(@Body() body: { name: string; description?: string }) {
    return { success: true, data: this.categoriesService.create(body) };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: { name: string; description?: string }) {
    return { success: true, data: this.categoriesService.update(id, body) };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}