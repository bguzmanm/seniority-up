import { Client } from '../model/client.js';
import { Order, type OrderWithDetails } from '../model/order.js';
import { Money } from '../vo/money.js';
import { Inject, Injectable } from '@nestjs/common';
import {
  type IOrderRepository,
  ORDER_REPOSITORY,
} from '../repositories/order.repository.js';
import {
  CLIENT_REPOSITORY,
  type ClientRepository,
} from '../repositories/client.repository.js';

export interface ReportRow {
  order: Order;
  client: Client | null;
  total: Money;
}

@Injectable()
export class BuildOrdersReport {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
  ) {}

  async execute(): Promise<ReportRow[]> {
    /*
    // consultas secuenciales (problema N+1):
    const orders = await this.orderRepository.findUnpaidOrders();
    const rows: ReportRow[] = [];
    for (const order of orders) {
      const client = await this.clientRepository.findById(order.clientId);
      rows.push({ order, client, total: order.total });
    }
    return rows;

    // mismas consultas en paralelo:
    const orders = await this.orderRepository.findUnpaidOrders();
    const clients = await Promise.all(
      orders.map((order) => this.clientRepository.findById(order.clientId)),
    );
    */

    // solución: una sola consulta con joins (ver findAllWithDetails)
    const rows: OrderWithDetails[] =
      await this.orderRepository.findAllWithDetails();

    return rows.map(({ order, client }) => ({
      order,
      client,
      total: order.total,
    }));
  }
}
