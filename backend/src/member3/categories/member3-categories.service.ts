import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateMember3CategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';


@Injectable()
export class Member3CategoriesService {


  constructor(

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,


    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

  ) {}




  // Lấy danh sách category + công việc bên trong

  async findAll(userId: number) {


    const categories = await this.categoryRepository.find({

      where: {
        userId
      },

      relations: {
        tasks: true,
      },

      order: {
        name: 'ASC'
      }

    });



    return categories.map(category => ({

      id: category.id,

      name: category.name,

      description: category.description,

      tasks: category.tasks?.map(task => ({

        id: task.id,

        title: task.title,

        status: task.status,

        priority: task.priority,

        deadline: task.deadline,

      })) || []

    }));

  }







  // Tạo category

  async create(
    userId:number,
    dto:CreateCategoryDto
  ){

    const category =
    this.categoryRepository.create({

      userId,

      name:dto.name.trim(),

      description:
      dto.description?.trim() || null,

    });


    return this.categoryRepository.save(category);

  }









  // Sửa category

  async update(
    userId:number,
    id:number,
    dto:UpdateMember3CategoryDto
  ){


    const category =
    await this.categoryRepository.findOne({

      where:{
        id,
        userId
      }

    });



    if(!category){

      throw new NotFoundException(
        'Không tìm thấy danh mục'
      );

    }



    if(dto.name !== undefined){

      category.name =
      dto.name.trim();

    }



    if(dto.description !== undefined){

      category.description =
      dto.description.trim() || null;

    }



    return this.categoryRepository.save(category);

  }









  // Xóa category

  async remove(
    userId:number,
    id:number
  ){


    const category =
    await this.categoryRepository.findOne({

      where:{
        id,
        userId
      }

    });



    if(!category){

      throw new NotFoundException(
        'Không tìm thấy danh mục'
      );

    }



    await this.categoryRepository.remove(category);



    return {

      success:true,

      message:'Đã xóa danh mục'

    };


  }









  // Gán category cho task

  async assignTask(
    userId:number,
    taskId:number,
    categoryId:number
  ){


    const task =
    await this.taskRepository.findOne({

      where:{

        id:taskId,

        user:{
          id:userId
        }

      }

    });



    if(!task){

      throw new NotFoundException(
        'Không tìm thấy công việc'
      );

    }





    const category =
    await this.categoryRepository.findOne({

      where:{
        id:categoryId,
        userId
      }

    });



    if(!category){

      throw new NotFoundException(
        'Không tìm thấy danh mục'
      );

    }





    task.category = category;


    return this.taskRepository.save(task);


  }









  // Bỏ category khỏi task

  async unassignTask(
    userId:number,
    taskId:number
  ){


    const task =
    await this.taskRepository.findOne({

      where:{

        id:taskId,

        user:{
          id:userId
        }

      }

    });



    if(!task){

      throw new NotFoundException(
        'Không tìm thấy công việc'
      );

    }



    task.category = null;


    await this.taskRepository.save(task);



    return {

      success:true

    };


  }



}