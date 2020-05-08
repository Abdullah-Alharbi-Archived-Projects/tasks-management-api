import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

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

  // POST /tasks/
  @Post()
  store(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.createTasks(title, description);
  }
}
