import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  // @Get('find/by/get-task/:id')
  // findTask(@Param('id') id: string) {
  //   return this.taskService.findTask(+id);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //return this.taskService.findOne(+id);
    return this.taskService.findTask(+id);
  }

    @Get(':task_id/:project_id')
    findTasks(
      @Param('task_id') task_id: string,
      @Param('project_id') project_id: string,
    ) {
      return this.taskService.findTasks(+project_id);
    }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
