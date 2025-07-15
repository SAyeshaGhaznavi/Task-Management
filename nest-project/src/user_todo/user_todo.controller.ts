import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTodoService } from './user_todo.service';
import { CreateUserTodoDto } from './dto/create-user_todo.dto';
import { UpdateUserTodoDto } from './dto/update-user_todo.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('user-todo')
export class UserTodoController {
  constructor(
    private readonly userTodoService: UserTodoService,
    @InjectQueue('notification-queue') private readonly notificationQueue: Queue,
  ) {}

  @Post()
  create(@Body() createUserTodoDto: CreateUserTodoDto) {
    // TODO: Replace  assigningUserId with actual user ID from auth/session
    //const assigningUserId = null; // e.g., req.user.userId if using auth
    return this.userTodoService.create({ ...createUserTodoDto});
  }

  @Get()
  findAll() {
    return this.userTodoService.findAll();
  }

  @Get(':user_id/:todo_id')
 findOne(
   @Param('user_id') user_id: string,
   @Param('todo_id') todo_id: string,
 ) {
   return this.userTodoService.findOne(+user_id, +todo_id);
 }

 @Get(':user_id')
  findTodo(
    @Param('user_id') user_id:string,
  )
  {
    return this.userTodoService.findTodo(+user_id);
  }
 
 @Patch(':user_id/:todo_id')
 update(
   @Param('user_id') user_id: string,
   @Param('todo_id') todo_id: string,
   @Body() updateDto: UpdateUserTodoDto,
 ) {
   return this.userTodoService.update(+user_id, +todo_id, updateDto);
 }
 
 @Delete(':user_id/:todo_id')
 remove(
   @Param('user_id') user_id: string,
   @Param('todo_id') todo_id: string,
 ) {
   return this.userTodoService.remove(+user_id, +todo_id);
 }

  // @Get('test/job')
  // async testQueueJob() {
  // try {
  //   await this.notificationQueue.add('notify', {
  //     userId: 6,
  //     todoId: 29,
  //     projectId: 5,
  //     message: 'Test background notification 🔔',
  //   });

  //   return { status: 'Job added to queue' };
  // } catch (err) {
  //   console.error('❌ Error adding job:', err);
  //   return { status: 'Failed to enqueue job', error: err.message };
  // }
  // }


}
