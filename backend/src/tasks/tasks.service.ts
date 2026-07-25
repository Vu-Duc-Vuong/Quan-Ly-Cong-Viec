import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';


import { Task, TaskStatus } from './entities/task.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';



@Injectable()
export class TasksService {


constructor(

@InjectRepository(Task)

private taskRepository: Repository<Task>

){}





// CREATE

create(createTaskDto: CreateTaskDto){

    return this.taskRepository.save(createTaskDto);

}







// READ ALL

findAll(){

    return this.taskRepository.find();

}







// READ ONE

findOne(id:number){

    return this.taskRepository.findOneBy({
        id
    });

}







// UPDATE

update(
    id:number,
    updateTaskDto:UpdateTaskDto
){

    return this.taskRepository.update(
        id,
        updateTaskDto
    );

}







// DELETE

remove(id:number){

    return this.taskRepository.delete(id);

}









// ĐỔI TRẠNG THÁI

async updateStatus(
    id:number,
    updateStatusDto:UpdateStatusDto
){


    await this.taskRepository.update(
        id,
        {
            status:updateStatusDto.status
        }
    );


    return this.findOne(id);

}









// ĐỔI MỨC ƯU TIÊN

async updatePriority(
    id:number,
    updatePriorityDto:UpdatePriorityDto
){


    await this.taskRepository.update(
        id,
        {
            priority:updatePriorityDto.priority
        }
    );


    return this.findOne(id);

}









// ĐÁNH DẤU HOÀN THÀNH

async completeTask(id:number){


    await this.taskRepository.update(
        id,
        {
            status:TaskStatus.DONE
        }
    );


    return this.findOne(id);

}









// TÌM KIẾM CÔNG VIỆC

search(keyword:string){


    return this.taskRepository.find({

        where:[

            {
                title: Like(`%${keyword}%`)
            },


            {
                description: Like(`%${keyword}%`)
            }

        ]

    });


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