import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';



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

update(id:number, updateTaskDto:UpdateTaskDto){

return this.taskRepository.update(
    id,
    updateTaskDto
);

}



// DELETE

remove(id:number){

return this.taskRepository.delete(id);

}


}