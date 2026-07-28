import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Task, TaskStatus } from './entities/task.entity';
import { User } from '../users/user.entity';
import { Category } from '../member3/entities/category.entity';

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

  @InjectRepository(Category)
  private categoryRepository: Repository<Category>,

) {}




// CREATE

async create(
  userId:number,
  createTaskDto:CreateTaskDto,
){

  const user = await this.userRepository.findOneBy({
    id:userId
  });


  if(!user){
    throw new Error("User not found");
  }


let category: Category | null = null;


  if(createTaskDto.categoryId){

    category =
      await this.categoryRepository.findOneBy({
        id:createTaskDto.categoryId
      });

  }



  const task = this.taskRepository.create({

    title:createTaskDto.title,

    description:createTaskDto.description,

    status:createTaskDto.status,

    priority:createTaskDto.priority,

    deadline:createTaskDto.deadline,

    user,

    category,

  });


  return this.taskRepository.save(task);

}







// READ ALL

async findAll(userId:number){

  return this.taskRepository.find({

    where:{

      user:{
        id:userId
      }

    },

    relations:{
      category:true
    }

  });

}







// READ ONE

async findOne(
  id:number,
  userId:number,
){

 return this.taskRepository.findOne({

   where:{

    id,

    user:{
      id:userId
    }

   },

   relations:{

    user:true,

    category:true

   }

 });

}







// UPDATE

async update(
 id:number,
 userId:number,
 updateTaskDto:UpdateTaskDto,
){

 const task =
 await this.taskRepository.findOne({

  where:{

    id,

    user:{
      id:userId
    }

  }

 });


 if(!task){

  throw new Error("Task not found");

 }



 const updateData:any = {
   ...updateTaskDto
 };



 if(updateTaskDto.categoryId){

   const category =
   await this.categoryRepository.findOneBy({

     id:updateTaskDto.categoryId

   });


   updateData.category = category;

   delete updateData.categoryId;

 }



 await this.taskRepository.update(
   id,
   updateData
 );


 return this.findOne(id,userId);

}








// DELETE

async remove(
 id:number,
 userId:number
){

 return this.taskRepository.delete({

  id,

  user:{
    id:userId
  }

 });

}









// UPDATE STATUS

async updateStatus(
 id:number,
 userId:number,
 updateStatusDto:UpdateStatusDto
){

 const task =
 await this.taskRepository.findOne({

  where:{

   id,

   user:{
    id:userId
   }

  }

 });


 if(!task){

  throw new Error("Task not found");

 }


 task.status =
 updateStatusDto.status;


 await this.taskRepository.save(task);


 return this.findOne(id,userId);

}









// UPDATE PRIORITY

async updatePriority(
 id:number,
 userId:number,
 updatePriorityDto:UpdatePriorityDto
){


 const task =
 await this.taskRepository.findOne({

  where:{

   id,

   user:{
    id:userId
   }

  }

 });


 if(!task){

  throw new Error("Task not found");

 }


 task.priority =
 updatePriorityDto.priority;


 await this.taskRepository.save(task);


 return task;

}









// COMPLETE TASK

async completeTask(
 id:number,
 userId:number
){

 const task =
 await this.taskRepository.findOne({

  where:{

   id,

   user:{
    id:userId
   }

  }

 });


 if(!task){

  throw new Error("Task not found");

 }


 task.status =
 TaskStatus.DONE;


 await this.taskRepository.save(task);


 return task;

}









// SEARCH

async search(
 userId:number,
 keyword:string
){


 return this.taskRepository.find({

  where:[

   {

    title:Like(`%${keyword}%`),

    user:{
      id:userId
    }

   },


   {

    description:Like(`%${keyword}%`),

    user:{
      id:userId
    }

   }

  ],


  relations:{

   user:true,

   category:true

  }


 });


}









// TODAY

today(){

 const today =
 new Date();


 today.setHours(0,0,0,0);



 const tomorrow =
 new Date(today);



 tomorrow.setDate(
  tomorrow.getDate()+1
 );



 return this.taskRepository
 .createQueryBuilder("task")

 .leftJoinAndSelect(
  "task.category",
  "category"
 )

 .where(
  "task.deadline >= :today",
  {
   today
  }
 )

 .andWhere(
  "task.deadline < :tomorrow",
  {
   tomorrow
  }
 )

 .getMany();


}









// OVERDUE

overdue(){

 return this.taskRepository
 .createQueryBuilder("task")


 .leftJoinAndSelect(
  "task.category",
  "category"
 )


 .where(
  "task.deadline < NOW()"
 )


 .andWhere(
  "task.status != :status",
  {
   status:TaskStatus.DONE
  }
 )


 .getMany();


}


}