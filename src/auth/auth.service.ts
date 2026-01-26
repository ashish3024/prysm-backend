import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    // 1. Check uniqueness
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already exists');

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Save User
    const user = await this.prisma.user.create({
      data: { 
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: (dto.role as any) || 'EMPLOYEE'
      },
    });

    // 4. Return without password
    const { password, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }
}