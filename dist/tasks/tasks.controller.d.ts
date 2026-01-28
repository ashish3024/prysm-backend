import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<{
        customer: {
            id: number;
            email: string;
            name: string;
        };
        assignedToUser: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        assignedTo: number;
        customerId: number;
    }>;
    findAll(req: any): Promise<({
        customer: {
            id: number;
            name: string;
        };
        assignedToUser: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        assignedTo: number;
        customerId: number;
    })[]>;
    updateStatus(id: string, body: UpdateTaskStatusDto, req: any): Promise<{
        customer: {
            id: number;
            name: string;
        };
        assignedToUser: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        assignedTo: number;
        customerId: number;
    }>;
}
//# sourceMappingURL=tasks.controller.d.ts.map