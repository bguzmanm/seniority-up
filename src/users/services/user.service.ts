import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomUUID } from 'node:crypto';
import { UserRegisteredEvent } from '../events/user-registered.event.js';

@Injectable()
export class UserService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  register(email: string) {
    // lógica de crear el usuario
    const user = { id: randomUUID(), email};

    // emitir el evento
    this.eventEmitter.emit(
      'user.registered',
       new UserRegisteredEvent(user.id, user.email),
    );

    return user;
  }
}