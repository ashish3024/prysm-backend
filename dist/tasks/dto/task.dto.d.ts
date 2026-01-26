import { TaskStatus } from '@prisma/client';
export declare class CreateTaskDto {
    title: string;
    description?: string;
    assignedTo: number;
    customerId: number;
}
export declare class UpdateTaskStatusDto {
    status: TaskStatus;
}
//# sourceMappingURL=task.dto.d.ts.map