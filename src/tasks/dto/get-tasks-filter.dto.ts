import { TaskStatus } from '../tasks.model';

export class TasksFilterDTO {
  status: TaskStatus;
  search: string;
}
