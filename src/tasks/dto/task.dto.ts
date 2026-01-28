export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';

export class CreateTaskDto {
  title!: string;
  description?: string;
  assignedTo!: number;
  customerId!: number;
}

export class UpdateTaskStatusDto {
  status!: TaskStatus;
}
