import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * getTasks
   * returns a list of tasks
   */
  getTasks(): Task[] {
    return this.tasks;
  }
}
