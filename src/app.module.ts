import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [PrismaModule, AuthModule, TasksModule, CustomersModule],
})
export class AppModule {}
