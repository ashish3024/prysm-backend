import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  title!: string;
  description?: string;
  assignedTo!: number;
  customerId!: number;
}

export class UpdateTaskStatusDto {
  status!: TaskStatus;
}
