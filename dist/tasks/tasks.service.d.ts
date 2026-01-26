import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTaskDto): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        updatedAt: Date;
        assignedTo: number;
        customerId: number;
    }>;
    findAll(user: any): Promise<({
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
    updateStatus(id: number, status: any, user: any): Promise<{
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
//# sourceMappingURL=tasks.service.d.ts.map