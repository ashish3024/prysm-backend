"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomersService = class CustomersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        // Validate required fields
        if (!dto.name || !dto.email || !dto.phone) {
            throw new common_1.BadRequestException('Name, email, and phone are required');
        }
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(dto.email)) {
            throw new common_1.BadRequestException('Invalid email format');
        }
        try {
            return await this.prisma.customer.create({ data: dto });
        }
        catch (error) {
            // Handle unique constraint violations
            if (error.code === 'P2002') {
                const field = error.meta?.target?.[0] || 'field';
                throw new common_1.ConflictException(`This ${field} is already in use. Please use a different value.`);
            }
            throw error;
        }
    }
    async findAll(page = 1, limit = 10) {
        // Validate pagination parameters
        if (page < 1 || limit < 1) {
            throw new common_1.BadRequestException('Page and limit must be positive numbers');
        }
        if (limit > 100) {
            throw new common_1.BadRequestException('Maximum limit is 100 records per page');
        }
        const skip = (page - 1) * limit;
        // Fetch data and total count in parallel
        const [data, totalRecords] = await Promise.all([
            this.prisma.customer.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.customer.count(),
        ]);
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            page,
            limit,
            totalRecords,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            data,
        };
    }
    async findOne(id) {
        if (!id || id < 1) {
            throw new common_1.BadRequestException('Invalid customer ID');
        }
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                tasks: {
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        createdAt: true
                    }
                }
            }
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map