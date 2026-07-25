import {
Controller,
Get,
Post,
Body,
Param,
Put,
Delete,
Patch,
Query
} from '@nestjs/common';



import { TasksService } from './tasks.service';


import { CreateTaskDto } from './dto/create-task.dto';

import { UpdateTaskDto } from './dto/update-task.dto';


import { UpdateStatusDto } from './dto/update-status.dto';

import { UpdatePriorityDto } from './dto/update-priority.dto';




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







// GET /tasks/search?keyword=abc

@Get('search')

search(
@Query('keyword') keyword:string
){

    return this.tasksService.search(keyword);

}







// GET /tasks/today

@Get('today')

today(){

    return this.tasksService.today();

}







// GET /tasks/overdue

@Get('overdue')

overdue(){

    return this.tasksService.overdue();

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









// PATCH /tasks/1/status
// Đổi trạng thái

@Patch(':id/status')

updateStatus(

@Param('id') id:string,

@Body() updateStatusDto:UpdateStatusDto

){

    return this.tasksService.updateStatus(
        +id,
        updateStatusDto
    );

}









// PATCH /tasks/1/priority
// Đổi mức ưu tiên

@Patch(':id/priority')

updatePriority(

@Param('id') id:string,

@Body() updatePriorityDto:UpdatePriorityDto

){

    return this.tasksService.updatePriority(
        +id,
        updatePriorityDto
    );

}









// PATCH /tasks/1/complete
// Đánh dấu hoàn thành

@Patch(':id/complete')

completeTask(

@Param('id') id:string

){

    return this.tasksService.completeTask(+id);

}



}