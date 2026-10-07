import { Injectable, Logger } from '@nestjs/common';
import type {
  DomainEvent,
  DomainEventPublisher,
} from '../ports/domain-event-publisher.port.js';

// Adapter sencillo: loguea los eventos. TODO(clase): reemplazar por un
// publisher real (p.ej. @nestjs/event-emitter o un bus tipo RabbitMQ)
// y mostrar publish/subscribe con @OnEvent('order.created').
@Injectable()
export class LoggingDomainEventPublisher implements DomainEventPublisher {
  private readonly logger = new Logger('DomainEvents');

  async publish(event: DomainEvent): Promise<void> {
    this.logger.log(`Evento publicado: ${event.name}`);
  }
}
