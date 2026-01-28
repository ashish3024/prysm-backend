import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCustomerDto): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        phone: string;
        company: string | null;
        updatedAt: Date;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        page: number;
        limit: number;
        totalRecords: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        data: {
            id: number;
            email: string;
            name: string;
            createdAt: Date;
            phone: string;
            company: string | null;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: number): Promise<{
        tasks: {
            id: number;
            createdAt: Date;
            title: string;
            status: import(".prisma/client").$Enums.TaskStatus;
        }[];
    } & {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        phone: string;
        company: string | null;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=customers.service.d.ts.map