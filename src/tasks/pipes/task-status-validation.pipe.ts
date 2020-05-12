import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    const conditions =
      typeof value !== 'string' ||
      !value ||
      !this.isStatusValid(value.toUpperCase());

    if (conditions) throw new BadRequestException('Invalid Status.');

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);

    return index !== -1;
  }
}
