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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        // Validate required fields
        if (!dto.title || !dto.assignedTo || !dto.customerId) {
            throw new common_1.BadRequestException('Title, assignedTo, and customerId are required');
        }
        // Verify the employee exists and has EMPLOYEE role
        const employee = await this.prisma.user.findUnique({
            where: { id: dto.assignedTo }
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${dto.assignedTo} not found`);
        }
        if (employee.role !== 'EMPLOYEE') {
            throw new common_1.BadRequestException('Task can only be assigned to an EMPLOYEE role user');
        }
        // Verify customer exists
        const customer = await this.prisma.customer.findUnique({
            where: { id: dto.customerId }
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${dto.customerId} not found`);
        }
        // Create task with validated references
        return this.prisma.task.create({
            data: dto,
            include: {
                assignedToUser: { select: { id: true, name: true, email: true } },
                customer: { select: { id: true, name: true, email: true } }
            }
        });
    }
    async findAll(user) {
        if (!user || !user.id) {
            throw new common_1.BadRequestException('User information is required');
        }
        // ADMIN can see all tasks, EMPLOYEE sees only their own
        if (user.role === 'ADMIN') {
            return this.prisma.task.findMany({
                include: {
                    assignedToUser: { select: { id: true, name: true, email: true } },
                    customer: { select: { id: true, name: true } }
                },
                orderBy: { createdAt: 'desc' }
            });
        }
        // Employee: filter by assigned user
        return this.prisma.task.findMany({
            where: { assignedTo: user.id },
            include: {
                assignedToUser: { select: { id: true, name: true, email: true } },
                customer: { select: { id: true, name: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async updateStatus(id, status, user) {
        if (!id || !status) {
            throw new common_1.BadRequestException('Task ID and status are required');
        }
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        // Security: EMPLOYEE can only update their own tasks
        if (user.role === 'EMPLOYEE' && task.assignedTo !== user.id) {
            throw new common_1.ForbiddenException('You can only update tasks assigned to you');
        }
        // Validate status transition if needed
        const validStatuses = ['PENDING', 'IN_PROGRESS', 'DONE'];
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException(`Invalid status. Allowed: ${validStatuses.join(', ')}`);
        }
        return this.prisma.task.update({
            where: { id },
            data: { status },
            include: {
                assignedToUser: { select: { id: true, name: true, email: true } },
                customer: { select: { id: true, name: true } }
            }
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map