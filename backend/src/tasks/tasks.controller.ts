import {
Controller,
Get,
Post,
Body,
Param,
Put,
Delete
} from '@nestjs/common';


import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';

import { UpdateTaskDto } from './dto/update-task.dto';



@Controller('tasks')
export class TasksController {


constructor(
private readonly tasksService:TasksService
){}



// GET /tasks

@Get()

findAll(){

return this.tasksService.findAll();

}



// GET /tasks/1

@Get(':id')

findOne(
@Param('id') id:string
){

return this.tasksService.findOne(+id);

}



// POST /tasks

@Post()

create(
@Body() createTaskDto:CreateTaskDto
){

return this.tasksService.create(createTaskDto);

}



// PUT /tasks/1

@Put(':id')

update(
@Param('id') id:string,

@Body() updateTaskDto:UpdateTaskDto

){

return this.tasksService.update(
+id,
updateTaskDto
);

}



// DELETE /tasks/1

@Delete(':id')

remove(
@Param('id') id:string
){

return this.tasksService.remove(+id);

}


}