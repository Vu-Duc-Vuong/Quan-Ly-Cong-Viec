import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import {
  Task,
  TaskStatus
} from '../../tasks/entities/task.entity';


@Injectable()
export class Member3TaskQueryService {


  constructor(

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>

  ) {}



  async searchAndFilter(

    userId:number,

    keyword?:string,

    categoryId?:number,

    status?:TaskStatus

  ) {


    const query = this.taskRepository

      .createQueryBuilder('task')

      .leftJoinAndSelect(
        'task.category',
        'category'
      )

      .leftJoin(
        'task.user',
        'user'
      )

      .where(
        'user.id = :userId',
        {
          userId
        }
      );



    // tìm kiếm từ khóa

    if(keyword?.trim()){


      query.andWhere(

        `
        LOWER(task.title) LIKE :keyword
        OR
        LOWER(task.description) LIKE :keyword
        `,

        {
          keyword:
          `%${keyword.trim().toLowerCase()}%`
        }

      );


    }



    // lọc trạng thái

    if(status){


      query.andWhere(

        'task.status = :status',

        {
          status
        }

      );


    }



    // lọc danh mục

    if(categoryId){


      query.andWhere(

        'category.id = :categoryId',

        {
          categoryId
        }

      );


    }



    const tasks = await query

      .orderBy(
        'task.updatedAt',
        'DESC'
      )

      .getMany();



    return tasks;


  }


}