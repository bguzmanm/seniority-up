import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { BuildOrdersReport } from './orders/use-case/build-orders-report.js';
import {
  InventoryBuild,
  INVENTORY_SERVICE,
} from './orders/use-case/inventory-build.js';
import { InMemoryInventoryService } from './orders/services/inventory.service.js';
import { UNIT_OF_WORK } from './repositories/unit-of-work.js';
import { TypeOrmUnitOfWork } from './repositories/TypeOrmUnitOfWork.js';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './users/users.module.js';
import { ClientsModule } from './clients/clients.module.js';
import { OrdersModule } from './orders/orders.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

// Observe (tracing a https://observe.nestjs.com) solo se activa con credenciales.
const observeImports =
  process.env.NEST_OBSERVE_APP_KEY && process.env.NEST_OBSERVE_APP_SECRET
    ? [
        ObserveModule.forRoot({
          appKey: process.env.NEST_OBSERVE_APP_KEY,
          appSecret: process.env.NEST_OBSERVE_APP_SECRET,
          serviceId: 'seniority',
        }),
      ]
    : [];

@Module({
  imports: [...observeImports, EventEmitterModule.forRoot(), UsersModule, ClientsModule, OrdersModule],
  providers: [
    BuildOrdersReport,
    InventoryBuild,
    { provide: UNIT_OF_WORK, useClass: TypeOrmUnitOfWork },
    { provide: INVENTORY_SERVICE, useClass: InMemoryInventoryService },
  ],
})
export class AppModule {}
