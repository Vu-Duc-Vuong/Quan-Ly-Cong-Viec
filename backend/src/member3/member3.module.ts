import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { Task } from '../tasks/entities/task.entity';
import { Category } from './entities/category.entity';
import { TaskCategory } from './entities/task-category.entity';

import { Member3CategoriesController } from './categories/member3-categories.controller';
import { Member3CategoriesService } from './categories/member3-categories.service';

import { Member3StatisticsController } from './statistics/member3-statistics.controller';
import { Member3StatisticsService } from './statistics/member3-statistics.service';

import { Member3TaskQueryController } from './task-query/member3-task-query.controller';
import { Member3TaskQueryService } from './task-query/member3-task-query.service';


@Module({

imports:[

  AuthModule,

  TypeOrmModule.forFeature([
    Task,
    Category,
    TaskCategory
  ])

],


controllers:[

 Member3CategoriesController,
 Member3StatisticsController,
 Member3TaskQueryController

],


providers:[

 Member3CategoriesService,
 Member3StatisticsService,
 Member3TaskQueryService

]

})

export class Member3Module {}