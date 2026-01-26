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
        // Validate Employee existence
        const employee = await this.prisma.user.findUnique({ where: { id: dto.assignedTo } });
        if (!employee || employee.role !== 'EMPLOYEE') {
            throw new common_1.NotFoundException('Assigned user must be an existing EMPLOYEE');
        }
        return this.prisma.task.create({ data: dto });
    }
    async findAll(user) {
        if (user.role === 'ADMIN') {
            return this.prisma.task.findMany({ include: { assignedToUser: true, customer: true } });
        }
        // EMPLOYEE: Only show their own tasks
        return this.prisma.task.findMany({
            where: { assignedTo: user.id },
            include: { assignedToUser: true, customer: true },
        });
    }
    async updateStatus(id, status, user) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        // SECURITY CHECK: Employee can only update THEIR OWN task
        if (user.role === 'EMPLOYEE' && task.assignedTo !== user.id) {
            throw new common_1.ForbiddenException('You are not allowed to update this task');
        }
        return this.prisma.task.update({
            where: { id },
            data: { status },
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map