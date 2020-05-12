import { TaskStatus } from '../tasks.model';
import { IsEnum, IsOptional, IsNotEmpty } from 'class-validator';

export class TasksFilterDTO {
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search: string;
}
