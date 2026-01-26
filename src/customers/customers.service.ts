import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    // Validate required fields
    if (!dto.name || !dto.email || !dto.phone) {
      throw new BadRequestException('Name, email, and phone are required');
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dto.email)) {
      throw new BadRequestException('Invalid email format');
    }

    try {
      return await this.prisma.customer.create({ data: dto });
    } catch (error: any) {
      // Handle unique constraint violations
      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0] || 'field';
        throw new ConflictException(`This ${field} is already in use. Please use a different value.`);
      }
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    // Validate pagination parameters
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be positive numbers');
    }

    if (limit > 100) {
      throw new BadRequestException('Maximum limit is 100 records per page');
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

  async findOne(id: number) {
    if (!id || id < 1) {
      throw new BadRequestException('Invalid customer ID');
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
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }
}