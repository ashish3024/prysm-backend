import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    try {
      return await this.prisma.customer.create({ data: dto });
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Email or Phone already exists');
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [data, totalRecords] = await Promise.all([
      this.prisma.customer.findMany({ skip, take: +limit }),
      this.prisma.customer.count(),
    ]);

    return {
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      data,
    };
  }

  async findOne(id: number) {
    return this.prisma.customer.findUnique({ where: { id } });
  }
}