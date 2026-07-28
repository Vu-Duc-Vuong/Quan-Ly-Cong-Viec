import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { User } from '../users/user.entity';
import { Category } from '../member3/entities/category.entity';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';


@Module({

  imports: [

    TypeOrmModule.forFeature([
      Task,
      User,
      Category,
    ]),

  ],


  controllers: [
    TasksController,
  ],


  providers: [
    TasksService,
  ],


})

export class TasksModule {}