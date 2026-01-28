import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        phone: string;
        company: string | null;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
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
    findOne(id: string): Promise<{
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
//# sourceMappingURL=customers.controller.d.ts.map