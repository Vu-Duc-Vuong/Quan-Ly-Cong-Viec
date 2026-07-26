import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';


import { Task, TaskStatus } from './entities/task.entity';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';



@Injectable()
export class TasksService {


constructor(

  @InjectRepository(Task)

  private taskRepository: Repository<Task>,

  @InjectRepository(User)

  private userRepository: Repository<User>,

) {}





// CREATE

async create(

  userId: number,

  createTaskDto: CreateTaskDto,

) {

const user = await this.userRepository.findOneBy({
  id: userId,
});

if (!user) {
  throw new Error('User not found');
}

const task = this.taskRepository.create({
  ...createTaskDto,
  user,
});

return this.taskRepository.save(task);

}







// READ ALL

async findAll(userId: number) {

  return this.taskRepository.find({

    where: {

      user: {

        id: userId,

      },

    },

  });

}







// READ ONE

async findOne(

  id: number,

  userId: number,

) {

  return this.taskRepository.findOne({

    where: {

      id,

      user: {

        id: userId,

      },

    },

    relations: {

      user: true,

    },

  });

}







// UPDATE

async update(

  id: number,

  userId: number,

  updateTaskDto: UpdateTaskDto,

) {

  const task = await this.taskRepository.findOne({

    where: {

      id,

      user: {

        id: userId,

      },

    },

  });

  if (!task) {

    throw new Error('Task not found');

  }

  await this.taskRepository.update(

    id,

    updateTaskDto,

  );

  return this.findOne(

    id,

    userId,

  );

}







// DELETE

async remove(
  id: number,
  userId: number,
) {
  return this.taskRepository.delete({
    id,
    user: {
      id: userId,
    },
  });
}









// ĐỔI TRẠNG THÁI

async updateStatus(
  id: number,
  userId: number,
  updateStatusDto: UpdateStatusDto,
) {

  const task = await this.taskRepository.findOne({

    where: {

      id,

      user: {

        id: userId,

      },

    },

  });

  if (!task) {

    throw new Error('Task not found');

  }

  task.status = updateStatusDto.status;

  await this.taskRepository.save(task);

  return this.findOne(id, userId);

}









// ĐỔI MỨC ƯU TIÊN

async updatePriority(
  id: number,
  userId: number,
  updatePriorityDto: UpdatePriorityDto,
) {

  const task = await this.taskRepository.findOne({

    where: {

      id,

      user: {

        id: userId,

      },

    },

  });

  if (!task) {

    throw new Error('Task not found');

  }

  task.priority = updatePriorityDto.priority;

  await this.taskRepository.save(task);

  return task;

}









// ĐÁNH DẤU HOÀN THÀNH

async completeTask(
  id: number,
  userId: number,
) {

  const task = await this.taskRepository.findOne({

    where: {

      id,

      user: {

        id: userId,

      },

    },

  });

  if (!task) {

    throw new Error('Task not found');

  }

  task.status = TaskStatus.DONE;

  await this.taskRepository.save(task);

  return task;

}









// TÌM KIẾM CÔNG VIỆC

async search(
  userId: number,
  keyword: string,
) {

  const tasks = await this.taskRepository.find({

    where: [

      {
        title: Like(`%${keyword}%`),
        user: {
          id: userId,
        },
      },

      {
        description: Like(`%${keyword}%`),
        user: {
          id: userId,
        },
      },

    ],

    relations: {
      user: true,
    },

  });

  return tasks.map(task => ({

    ...task,

    user: {

      id: task.user.id,

      fullName: task.user.fullName,

      email: task.user.email,

      avatar: task.user.avatar,

    },

  }));

}









// TASK HÔM NAY

today(){

    const today = new Date();

    today.setHours(0,0,0,0);


    const tomorrow = new Date(today);

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );


    return this.taskRepository
    .createQueryBuilder('task')

    .where(
        'task.deadline >= :today',
        {
            today
        }
    )

    .andWhere(
        'task.deadline < :tomorrow',
        {
            tomorrow
        }
    )

    .getMany();

}









// TASK QUÁ HẠN

overdue(){

    return this.taskRepository
    .createQueryBuilder('task')

    .where(
        'task.deadline < NOW()'
    )

    .andWhere(
        'task.status != :status',
        {
            status: TaskStatus.DONE
        }
    )

    .getMany();

}


}