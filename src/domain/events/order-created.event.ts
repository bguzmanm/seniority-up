import { DomainEvent } from '../../application/ports/domain-event-publisher.port.js';

export class OrderCreated implements DomainEvent {
   readonly name = 'order.created';
   readonly occurredAt = new Date();

   constructor(readonly orderId: string, readonly clientId: string) {}
}