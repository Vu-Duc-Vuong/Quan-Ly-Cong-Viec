import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../../auth/get-user.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TaskStatus } from '../../tasks/entities/task.entity';
import { Member3TaskQueryService } from './member3-task-query.service';

@Controller('member3/tasks')
@UseGuards(JwtAuthGuard)
export class Member3TaskQueryController {
  constructor(private readonly service: Member3TaskQueryService) {}

  @Get('query')
  query(
    @GetUser() user: any,
    @Query('keyword') keyword?: string,
    @Query('categoryId') categoryId?: string,
    @Query('status') status?: TaskStatus,
  ) {
    return this.service.searchAndFilter(
      user.id,
      keyword,
      categoryId ? Number(categoryId) : undefined,
      status,
    );
  }
}
