import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskStatusDto, TaskStatus } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    // Validate required fields
    if (!dto.title || !dto.assignedTo || !dto.customerId) {
      throw new BadRequestException('Title, assignedTo, and customerId are required');
    }

    // Verify the employee exists and has EMPLOYEE role
    const employee = await this.prisma.user.findUnique({ 
      where: { id: dto.assignedTo } 
    });
    
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${dto.assignedTo} not found`);
    }

    if (employee.role !== 'EMPLOYEE') {
      throw new BadRequestException('Task can only be assigned to an EMPLOYEE role user');
    }

    // Verify customer exists
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customerId }
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${dto.customerId} not found`);
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

  async findAll(user: any) {
    if (!user || !user.id) {
      throw new BadRequestException('User information is required');
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

  async updateStatus(id: number, status: TaskStatus, user: any) {
    if (!id || !status) {
      throw new BadRequestException('Task ID and status are required');
    }

    const task = await this.prisma.task.findUnique({ where: { id } });
    
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Security: EMPLOYEE can only update their own tasks
    if (user.role === 'EMPLOYEE' && task.assignedTo !== user.id) {
      throw new ForbiddenException('You can only update tasks assigned to you');
    }

    // Validate status transition if needed
    const validStatuses: TaskStatus[] = ['PENDING', 'IN_PROGRESS', 'DONE'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status. Allowed: ${validStatuses.join(', ')}`);
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
}