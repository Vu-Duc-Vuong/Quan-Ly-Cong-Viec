import { Controller, Get, Query } from '@nestjs/common';

@Controller('api/tasks')
export class TaskQueryController {
  @Get('search')
  search(@Query('keyword') keyword: string) {
    return {
      success: true,
      keyword,
      data: [],
    };
  }

  @Get('filter')
  filter(
    @Query('categoryId') categoryId?: string,
    @Query('status') status?: string,
  ) {
    return {
      success: true,
      filterParams: { categoryId, status },
      data: [],
    };
  }
}