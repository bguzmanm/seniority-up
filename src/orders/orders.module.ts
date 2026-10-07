import { Module } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  OrderRepository,
} from './repositories/order.repository.js';

@Module({
  providers: [{ provide: ORDER_REPOSITORY, useClass: OrderRepository }],
  exports: [ORDER_REPOSITORY],
})
export class OrdersModule {}
