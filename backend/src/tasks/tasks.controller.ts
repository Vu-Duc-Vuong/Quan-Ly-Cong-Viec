import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
export class TasksController {

  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @GetUser() user: any,
  ) {
    return this.tasksService.findAll(user.id);
  }

  @Get('search')

@UseGuards(JwtAuthGuard)

search(

  @GetUser() user: any,

  @Query('keyword') keyword: string,

) {

  return this.tasksService.search(

    user.id,

    keyword,

  );

}

  @Get('today')
  today() {
    return this.tasksService.today();
  }

  @Get('overdue')
  overdue() {
    return this.tasksService.overdue();
  }

  @Get(':id')
@UseGuards(JwtAuthGuard)
findOne(

  @Param('id') id: string,

  @GetUser() user: any,

) {

  return this.tasksService.findOne(

    +id,

    user.id,

  );

}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @GetUser() user: any,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(
      user.id,
      createTaskDto,
    );
  }

  @Put(':id')
@UseGuards(JwtAuthGuard)
update(

  @Param('id') id: string,

  @GetUser() user: any,

  @Body() updateTaskDto: UpdateTaskDto,

) {

  return this.tasksService.update(

    +id,

    user.id,

    updateTaskDto,

  );

}

  @Delete(':id')
@UseGuards(JwtAuthGuard)
remove(
  @Param('id') id: string,
  @GetUser() user: any,
) {
  return this.tasksService.remove(
    +id,
    user.id,
  );
}

  @Patch(':id/status')
@UseGuards(JwtAuthGuard)
updateStatus(

  @Param('id') id: string,

  @GetUser() user: any,

  @Body() updateStatusDto: UpdateStatusDto,

) {

  return this.tasksService.updateStatus(

    +id,

    user.id,

    updateStatusDto,

  );

}

  @Patch(':id/priority')
@UseGuards(JwtAuthGuard)
updatePriority(

  @Param('id') id: string,

  @GetUser() user: any,

  @Body() updatePriorityDto: UpdatePriorityDto,

) {

  return this.tasksService.updatePriority(

    +id,

    user.id,

    updatePriorityDto,

  );

}

  @Patch(':id/complete')
@UseGuards(JwtAuthGuard)
completeTask(

  @Param('id') id: string,

  @GetUser() user: any,

) {

  return this.tasksService.completeTask(

    +id,

    user.id,

  );

}
}