import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
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

  // GET /tasks/:id
  @Get('/:id')
  show(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // POST /tasks/
  @Post()
  store(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTasks(createTaskDTO);
  }

  // PATCH /tasks/:id/status
  @Patch('/:id/status')
  update(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.tasksService.updateTaskStatus(id, status);
  }

  // DELETE /tasks/:id
  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.tasksService.destroyTask(id);
  }
}
