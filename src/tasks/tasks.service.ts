import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidV1 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

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
  public createTasks(createTaskDTO: CreateTaskDTO): Task {
    const task: Task = {
      id: uuidV1(),
      ...createTaskDTO,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
