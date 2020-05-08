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
   * getTaskById
   * returns task by id
   * @argument id string
   * @return Task
   */
  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  /**
   * createTasks
   * create new task and it returns a newly created task object to the Controller.
   * @argument title string
   * @argument description string
   * @return Task[]
   */
  createTasks(createTaskDTO: CreateTaskDTO): Task {
    const task: Task = {
      id: uuidV1(),
      ...createTaskDTO,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  /**
   * updateTaskStatus
   * update the task status with:
   *  - OPEN
   *  - IN_PROGRESS
   *  - DONE
   * @argument id
   * @argument status
   * @return Task
   */
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = TaskStatus[status];
    return task;
  }

  /**
   * destroyTask
   * delete a specific task.
   * @argument id string
   * @return { OK: true }
   */
  destroyTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    return { OK: true };
  }
}
