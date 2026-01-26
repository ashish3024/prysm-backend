import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        updatedAt: Date;
        assignedTo: number;
        customerId: number;
    }>;
    findAll(req: any): Promise<({
        customer: {
            id: number;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            company: string | null;
        };
        assignedToUser: {
            id: number;
            email: string;
            name: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        updatedAt: Date;
        assignedTo: number;
        customerId: number;
    })[]>;
    updateStatus(id: string, body: UpdateTaskStatusDto, req: any): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        updatedAt: Date;
        assignedTo: number;
        customerId: number;
    }>;
}
//# sourceMappingURL=tasks.controller.d.ts.map