# Prysm Backend - NestJS CRM API

A professional NestJS backend for managing customers and tasks with role-based authentication using JWT and PostgreSQL via Prisma ORM.

## 📋 Table of Contents
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Database Migration](#database-migration)
- [How to Start](#how-to-start)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- PostgreSQL database

### Installation Steps

1. **Clone the repository:**
```bash
git clone https://github.com/ashish3024/prysm-backend.git
cd prysm-backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Generate Prisma Client:**
```bash
npm run prisma:generate
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory. You can use `.env.example` as a reference:

```bash
cp .env.example .env
```

Then update the following variables:

```env
# Database Configuration (Required)
DATABASE_URL=postgresql://username:password@host:5432/database_name

# JWT Secret (Required for authentication)
JWT_SECRET=your-super-secret-key

# Application Port (Optional, defaults to 3000)
PORT=3000

# Environment (Optional, defaults to development)
NODE_ENV=development
```

**Example for Render PostgreSQL:**
```env
DATABASE_URL=postgresql://user:password@host.postgres.render.com:5432/dbname?sslmode=require
```

## 🗄️ Database Migration

Prisma schemas are already configured. Run migrations to set up your database:

```bash
# Create and apply migrations in development
npm run prisma:migrate

# Generate Prisma Client after schema changes
npm run prisma:generate
```

This will:
- Create all tables (User, Customer, Task)
- Set up relationships
- Generate TypeScript types

## ▶️ How to Start

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm run start
```

The application will start on `http://localhost:3000`

## 📚 API Documentation

### Swagger Documentation
Once the server is running, visit:
```
http://localhost:3000/api
```

### Available Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

#### Tasks
- `POST /tasks` - Create a task (Admin only)
- `GET /tasks` - Get all tasks (filtered by role)
- `PATCH /tasks/:id/status` - Update task status

#### Customers
- `POST /customers` - Create a customer
- `GET /customers` - List all customers
- `GET /customers/:id` - Get customer by ID

## 📁 Project Structure

```
prysm-backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── jwt.strategy.ts
│   │   ├── dto/
│   │   └── auth.module.ts
│   ├── tasks/             # Tasks module
│   │   ├── tasks.service.ts
│   │   ├── tasks.controller.ts
│   │   ├── dto/
│   │   └── tasks.module.ts
│   ├── customers/         # Customers module
│   │   ├── customers.service.ts
│   │   ├── customers.controller.ts
│   │   ├── dto/
│   │   └── customers.module.ts
│   ├── prisma/            # Database module
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── common/            # Shared utilities
│   │   ├── guards/        # JWT & Roles guards
│   │   └── decorators/    # Custom decorators
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── migrations/            # Prisma migrations
├── schema.prisma          # Prisma schema
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── README.md              # This file
```

## 🔐 Authentication & Authorization

- **JWT Authentication:** All endpoints (except /auth/*) require a valid JWT token
- **Role-Based Access Control:**
  - `ADMIN`: Can create tasks, view all tasks
  - `EMPLOYEE`: Can only view and update their assigned tasks

## 📝 Example Usage

### 1. Register User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "ADMIN"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword"
  }'
```

### 3. Create Customer (with JWT token)
```bash
curl -X POST http://localhost:3000/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "+1234567890",
    "company": "Acme Corporation"
  }'
```

## 🛠️ Technology Stack

- **Framework:** NestJS 10
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT + Passport
- **Documentation:** Swagger/OpenAPI
- **Validation:** Class Validator

## 📦 Scripts

```json
{
  "npm run dev": "Start development server with auto-reload",
  "npm run build": "Build for production",
  "npm run start": "Start production server",
  "npm run prisma:generate": "Generate Prisma Client",
  "npm run prisma:migrate": "Run database migrations"
}
```

## 🐛 Troubleshooting

### Cannot connect to database
- Verify `DATABASE_URL` in `.env` is correct
- Ensure PostgreSQL server is running
- Check firewall/security group settings

### JWT token errors
- Ensure `JWT_SECRET` is set in `.env`
- Token may have expired (valid for 1 day by default)
- Include token in Authorization header: `Bearer YOUR_TOKEN`

### Port already in use
- Change `PORT` in `.env` or use: `PORT=3001 npm run dev`

## 📄 License

This project is provided as-is for educational purposes.

## 👤 Author

Created by Ashish

---

**Happy coding!** 🚀
