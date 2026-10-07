import { Order } from '../model/order.js';
import { Inject, Injectable } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  type IOrderRepository,
} from '../repositories/order.repository.js';
import { OrderCreated } from '../domain/events/order-created.event.js';
import {
  DOMAIN_EVENT_PUBLISHER,
  type DomainEventPublisher,
} from '../application/ports/domain-event-publisher.port.js';

@Injectable()
export class CreateOrders {
  constructor(
    @Inject(ORDER_REPOSITORY) readonly orderRepository: IOrderRepository,
    @Inject(DOMAIN_EVENT_PUBLISHER)
    readonly eventPublisher: DomainEventPublisher,
  ) {}

  async execute(order: Order): Promise<Order> {
    // Nota para la clase: hoy save y publish NO son atómicos.
    // Si falla el publish después de guardar, el pedido quedó creado
    // pero nadie se entera. ¿Cómo lo resolvés con UnitOfWork + eventos?
    await this.orderRepository.save(order);
    await this.eventPublisher.publish(
      new OrderCreated(order.id, order.clientId),
    );
    return order;
  }
}
