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
  ParseIntPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';


@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {


  constructor(
    private readonly tasksService: TasksService,
  ) {}



  // GET ALL TASK

  @Get()
  findAll(
    @GetUser() user: any,
  ) {

    return this.tasksService.findAll(
      user.id,
    );

  }





  // SEARCH TASK

  @Get('search')
  search(

    @GetUser() user: any,

    @Query('keyword') keyword: string,

  ) {

    return this.tasksService.search(

      user.id,

      keyword,

    );

  }





  // TASK TODAY

  @Get('today')
  today(

    @GetUser() user: any,

  ) {

    return this.tasksService.today();

  }





  // TASK OVERDUE

  @Get('overdue')
  overdue(

    @GetUser() user: any,

  ) {

    return this.tasksService.overdue();

  }





  // GET ONE TASK

  @Get(':id')
  findOne(

    @Param(
      'id',
      ParseIntPipe,
    )
    id:number,

    @GetUser() user:any,

  ) {

    return this.tasksService.findOne(

      id,

      user.id,

    );

  }





  // CREATE TASK

  @Post()
  create(

    @GetUser() user:any,

    @Body() createTaskDto:CreateTaskDto,

  ) {

    return this.tasksService.create(

      user.id,

      createTaskDto,

    );

  }





  // UPDATE TASK

  @Put(':id')
  update(

    @Param(
      'id',
      ParseIntPipe,
    )
    id:number,

    @GetUser() user:any,

    @Body() updateTaskDto:UpdateTaskDto,

  ) {

    return this.tasksService.update(

      id,

      user.id,

      updateTaskDto,

    );

  }





  // DELETE TASK

  @Delete(':id')
  remove(

    @Param(
      'id',
      ParseIntPipe,
    )
    id:number,

    @GetUser() user:any,

  ) {

    return this.tasksService.remove(

      id,

      user.id,

    );

  }





  // UPDATE STATUS

  @Patch(':id/status')
  updateStatus(

    @Param(
      'id',
      ParseIntPipe,
    )
    id:number,

    @GetUser() user:any,

    @Body()
    updateStatusDto:UpdateStatusDto,

  ) {

    return this.tasksService.updateStatus(

      id,

      user.id,

      updateStatusDto,

    );

  }





  // UPDATE PRIORITY

  @Patch(':id/priority')
  updatePriority(

    @Param(
      'id',
      ParseIntPipe,
    )
    id:number,

    @GetUser() user:any,

    @Body()
    updatePriorityDto:UpdatePriorityDto,

  ) {

    return this.tasksService.updatePriority(

      id,

      user.id,

      updatePriorityDto,

    );

  }





  // COMPLETE TASK

  @Patch(':id/complete')
  completeTask(

    @Param(
      'id',
      ParseIntPipe,
    )
    id:number,

    @GetUser() user:any,

  ) {

    return this.tasksService.completeTask(

      id,

      user.id,

    );

  }


}