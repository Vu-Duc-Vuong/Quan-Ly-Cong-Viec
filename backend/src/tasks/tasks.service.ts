import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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


  if (!user) {
    throw new NotFoundException(
      'Không tìm thấy người dùng',
    );
  }


let category: Category | null = null;


  if(createTaskDto.categoryId){

    category =
      await this.categoryRepository.findOneBy({
        id:createTaskDto.categoryId
      });

  }


  if (createTaskDto.categoryId && !category) {
    throw new NotFoundException(
      'Không tìm thấy danh mục',
    );
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


  try {
    return await this.taskRepository.save(task);
  } catch {
    throw new InternalServerErrorException(
      'Không thể tạo công việc',
    );
  }

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

 const task = await this.taskRepository.findOne({

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

 if (!task) {
   throw new NotFoundException(
     'Không tìm thấy công việc',
   );
 }

 return task;

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


 if (!task) {

  throw new NotFoundException(
    'Không tìm thấy công việc',
  );

 }



 const updateData:any = {
   ...updateTaskDto
 };



 if(updateTaskDto.categoryId){

   const category =
   await this.categoryRepository.findOneBy({

     id:updateTaskDto.categoryId

   });


   if (!category) {
     throw new NotFoundException(
       'Không tìm thấy danh mục',
     );
   }


   updateData.category = category;

   delete updateData.categoryId;

 }



 try {
   await this.taskRepository.update(
     id,
     updateData
   );
 } catch {
   throw new InternalServerErrorException(
     'Không thể cập nhật công việc',
   );
 }


 return this.findOne(id,userId);

}








// DELETE

async remove(
 id:number,
 userId:number
){

 const task = await this.findOne(id, userId);

 await this.taskRepository.remove(task);

 return {
   message: 'Xóa công việc thành công',
 };

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


 if (!task) {

  throw new NotFoundException(
    'Không tìm thấy công việc',
  );

 }


 task.status =
 updateStatusDto.status;


 try {
   await this.taskRepository.save(task);
 } catch {
   throw new InternalServerErrorException(
     'Không thể cập nhật trạng thái',
   );
 }


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


 if (!task) {

  throw new NotFoundException(
    'Không tìm thấy công việc',
  );

 }


 task.priority =
 updatePriorityDto.priority;


 try {
   await this.taskRepository.save(task);
 } catch {
   throw new InternalServerErrorException(
     'Không thể cập nhật độ ưu tiên',
   );
 }


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


 if (!task) {

  throw new NotFoundException(
    'Không tìm thấy công việc',
  );

 }


 task.status =
 TaskStatus.DONE;


 try {
   await this.taskRepository.save(task);
 } catch {
   throw new InternalServerErrorException(
     'Không thể cập nhật công việc',
   );
 }


 return task;

}









// SEARCH

async search(
 userId:number,
 keyword:string
){

 if (!keyword.trim()) {
   throw new BadRequestException(
     'Từ khóa tìm kiếm không được để trống',
   );
 }


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