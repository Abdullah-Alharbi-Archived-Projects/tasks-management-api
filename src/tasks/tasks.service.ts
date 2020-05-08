import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  /**
   * getTasks
   * returns a list of tasks
   */
  getTasks() {
    return this.tasks;
  }
}
