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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        // Validate input
        if (!dto.email || !dto.password || !dto.name) {
            throw new common_1.BadRequestException('Email, password, and name are required');
        }
        if (dto.password.length < 6) {
            throw new common_1.BadRequestException('Password must be at least 6 characters');
        }
        // Check if user already exists
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (existing) {
            throw new common_1.ConflictException('Email already registered. Try logging in.');
        }
        // Hash password with bcrypt (10 rounds for security)
        const hashedPassword = await bcryptjs_1.default.hash(dto.password, 10);
        try {
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hashedPassword,
                    role: dto.role || 'EMPLOYEE'
                },
            });
            // Return user without exposing password
            const { password, ...result } = user;
            return result;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('This email is already in use');
            }
            throw error;
        }
    }
    async login(dto) {
        if (!dto.email || !dto.password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        // Find user by email
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        // Verify password matches
        const isPasswordValid = await bcryptjs_1.default.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map