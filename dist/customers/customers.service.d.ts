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
        updatedAt: Date;
        phone: string;
        company: string | null;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        page: number;
        limit: number;
        totalRecords: number;
        totalPages: number;
        data: {
            id: number;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
            company: string | null;
        }[];
    }>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        company: string | null;
    } | null>;
}
//# sourceMappingURL=customers.service.d.ts.map