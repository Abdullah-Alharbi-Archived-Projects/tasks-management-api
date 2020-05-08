import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // Nest Dependency Injection
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks/
  @Get()
  index() {
    // this will call getTasks from the TasksService
    return this.tasksService.getTasks();
  }
}
