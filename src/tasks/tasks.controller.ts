import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  // Nest Dependency Injection
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks/
  @Get()
  index(@Query(ValidationPipe) tasksFilterDTO: TasksFilterDTO): Task[] {
    return Object.keys(tasksFilterDTO).length
      ? this.tasksService.getTasksWithFilters(tasksFilterDTO)
      : this.tasksService.getTasks();
  }

  // GET /tasks/:id
  @Get('/:id')
  show(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  // POST /tasks/
  @Post()
  @UsePipes(ValidationPipe)
  store(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTasks(createTaskDTO);
  }

  // PATCH /tasks/:id/status
  @Patch('/:id/status')
  update(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatus(id, status);
  }

  // DELETE /tasks/:id
  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this.tasksService.destroyTask(id);
  }
}
