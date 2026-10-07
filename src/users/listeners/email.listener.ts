import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event.js';

@Injectable()
export class EmailListener {
  @OnEvent('user.registered')
  handlerUserRegistered(event: UserRegisteredEvent) {
    // efecto secundario (mock)
    console.log(`[EMAIL] Enviando email de bienvenida a ${event.email}`);
  }
}