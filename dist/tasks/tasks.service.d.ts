import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, TaskStatus } from './dto/task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTaskDto): Promise<{
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
    findAll(user: any): Promise<({
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
    updateStatus(id: number, status: TaskStatus, user: any): Promise<{
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
//# sourceMappingURL=tasks.service.d.ts.map