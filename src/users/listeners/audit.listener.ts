import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../events/user-registered.event.js';

@Injectable()
export class AuditListener {
  @OnEvent('user.registered')
  handlerUserRegistered(event: UserRegisteredEvent){
    // efecto secundario (mock)
    console.log(`[AUDIT] Registrado usuario ${event.email} a las ${new Date().toISOString()}`);
  }
}