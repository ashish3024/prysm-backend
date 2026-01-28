import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    // Validate input
    if (!dto.email || !dto.password || !dto.name) {
      throw new BadRequestException('Email, password, and name are required');
    }

    if (dto.password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    // Check if user already exists
    const existing = await this.prisma.user.findUnique({ 
      where: { email: dto.email } 
    });
    if (existing) {
      throw new ConflictException('Email already registered. Try logging in.');
    }

    // Hash password with bcrypt (10 rounds for security)
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: { 
          name: dto.name,
          email: dto.email,
          password: hashedPassword,
          role: (dto.role as any) || 'EMPLOYEE'
        },
      });

      // Return user without exposing password
      const { password, ...result } = user;
      return result;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('This email is already in use');
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    if (!dto.email || !dto.password) {
      throw new BadRequestException('Email and password are required');
    }

    // Find user by email
    const user = await this.prisma.user.findUnique({ 
      where: { email: dto.email } 
    });
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password matches
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    
    return {
      accessToken: this.jwtService.sign(payload),
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      },
    };
  }
}