import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    // Validate Employee existence
    const employee = await this.prisma.user.findUnique({ where: { id: dto.assignedTo } });
    if (!employee || employee.role !== 'EMPLOYEE') {
      throw new NotFoundException('Assigned user must be an existing EMPLOYEE');
    }

    return this.prisma.task.create({ data: dto });
  }

  async findAll(user: any) {
    if (user.role === 'ADMIN') {
      return this.prisma.task.findMany({ include: { assignedToUser: true, customer: true } });
    }
    // EMPLOYEE: Only show their own tasks
    return this.prisma.task.findMany({
      where: { assignedTo: user.id },
      include: { assignedToUser: true, customer: true },
    });
  }

  async updateStatus(id: number, status: any, user: any) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    // SECURITY CHECK: Employee can only update THEIR OWN task
    if (user.role === 'EMPLOYEE' && task.assignedTo !== user.id) {
      throw new ForbiddenException('You are not allowed to update this task');
    }

    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }
}