import { Order, OrderWithDetails } from '../models/order.js';
import { Money } from "../../vo/money.js";

export const ORDER_REPOSITORY = Symbol("ORDER_REPOSITORY");

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  findUnpaidOrders(): Promise<Order[]>; // "las que esperan pago"
  save(order: Order): Promise<Order>;
  monthlyTotalByClient(
    clientId: string,
    month: number,
    year: number,
  ): Promise<Money>;
  findAllWithDetails(): Promise<OrderWithDetails[]>;
}

export class OrderRepository implements IOrderRepository {
  findById(id: string): Promise<Order | null> {
    return Promise.resolve(null);
  }

  findUnpaidOrders(): Promise<Order[]> {
    return Promise.resolve([]);
  }

  monthlyTotalByClient(
    clientId: string,
    month: number,
    year: number,
  ): Promise<Money> {
    return Promise.resolve(Money.of(0, 'USD'));
  }

  save(order: Order): Promise<Order> {
    return Promise.resolve(order);
  }

  findAllWithDetails(): Promise<OrderWithDetails[]> {
    return Promise.resolve([]);
  }

  /*findAllWithDetails(): Promise<OrderWithDetails[]> {
    //ejemplo con typeORM
    const rows = await this.repo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'item')
      .leftJoinAndSelect('order.client', 'client')
      .getMany();

    return rows.map((row) => this.toDomain(row));
  }*/

  /*//parseo
  private toDomain(row: OrderRow): OrderWithDetails {
    const order = Order.restore(row.id);
    for(const itemRow of order.items) {
      order.addItem(toOrderItem(itemRow));
    }
    return { order, items: order.itemLines, client : Client.restore(row.client)};
  }*/



}