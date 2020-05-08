import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  // Nest Dependency Injection
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks/
  @Get()
  index(): Task[] {
    // this will call getTasks from the TasksService
    return this.tasksService.getTasks();
  }

  @Get(':id')
  show(@Param('id') id: string): Task {}

  // POST /tasks/
  @Post()
  store(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTasks(createTaskDTO);
  }
}
