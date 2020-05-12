import { Injectable, BadRequestException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidV1 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksFilterDTO } from './dto/get-tasks-filter.dto';

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
   * getTasksWithFilters
   */
  getTasksWithFilters({ status, search }: TasksFilterDTO): Task[] {
    let tasks = this.getTasks();

    if (status) tasks = tasks.filter(task => task.status === status);

    if (search)
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );

    return tasks;
  }

  /**
   * getTaskById
   * returns task by id
   * @argument id string
   * @return Task
   */
  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) throw new BadRequestException('Task Not Found.');

    return found;
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
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
    return { OK: true };
  }
}
