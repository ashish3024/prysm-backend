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
        updatedAt: Date;
        phone: string;
        company: string | null;
    }>;
    findAll(): Promise<{
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
    findOne(id: string): Promise<{
        id: number;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
        company: string | null;
    } | null>;
}
//# sourceMappingURL=customers.controller.d.ts.map