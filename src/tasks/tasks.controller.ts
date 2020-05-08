import { Controller, Get } from '@nestjs/common';
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
}
