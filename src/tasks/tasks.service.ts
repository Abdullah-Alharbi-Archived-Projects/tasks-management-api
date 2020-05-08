import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  /**
   * getTasks
   * returns a list of tasks
   * @return Task[]
   */
  getTasks(): Task[] {
    return this.tasks;
  }

  /**
   * createTasks
   * create new task and it returns a newly created task object to the Controller.
   * @argument title string
   * @argument description string
   * @return Task[]
   */
  public createTasks(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
