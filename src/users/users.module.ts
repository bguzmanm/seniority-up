import { Module } from '@nestjs/common';
import { UserService } from './services/user.service.js';
import { EmailListener } from './listeners/email.listener.js';
import { AuditListener } from './listeners/audit.listener.js';
import { UsersController } from './controllers/users.controller.js';

@Module({
  controllers: [UsersController],
  providers: [UserService, EmailListener, AuditListener],
  exports: [UserService],
})
export class UsersModule {}
