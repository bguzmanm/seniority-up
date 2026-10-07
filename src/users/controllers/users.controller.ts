import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from '../services/user.service.js';

@Controller('/users')
export class UsersController {
  constructor(
    @Inject() private readonly service: UserService) {}

  @Get()
  getHello(): string {



    this.service.register('hola@hola.com');
      return "hola";
  }
}
