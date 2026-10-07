import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './application/controllers/app.controller.js';
import { AppService } from './services/app.service.js';
import { CreateOrders } from './use-case/create-orders.js';
import { BuildOrdersReport } from './use-case/build-orders-report.js';
import {
  InventoryBuild,
  INVENTORY_SERVICE,
} from './use-case/inventory-build.js';
import { InMemoryInventoryService } from './services/inventory.service.js';
import { OrderRepositoryImpl } from './repositories/order.repository.js';
import { ORDER_REPOSITORY } from './repositories/order.repository.js';
import {
  CLIENT_REPOSITORY,
  InMemoryClientRepository,
} from './repositories/client.repository.js';
import { UNIT_OF_WORK } from './repositories/unit-of-work.js';
import { TypeOrmUnitOfWork } from './repositories/TypeOrmUnitOfWork.js';
import { DOMAIN_EVENT_PUBLISHER } from './application/ports/domain-event-publisher.port.js';
import { LoggingDomainEventPublisher } from './application/events/logging-event-publisher.js';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './users/users.module.js';
import { UserService } from './users/services/user.service.js';
import { UsersController } from './users/controllers/users.controller.js';

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
  imports: [...observeImports, EventEmitterModule.forRoot(), UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    CreateOrders,
    BuildOrdersReport,
    InventoryBuild,
    { provide: ORDER_REPOSITORY, useClass: OrderRepositoryImpl },
    { provide: CLIENT_REPOSITORY, useClass: InMemoryClientRepository },
    { provide: UNIT_OF_WORK, useClass: TypeOrmUnitOfWork },
    { provide: INVENTORY_SERVICE, useClass: InMemoryInventoryService },
    { provide: DOMAIN_EVENT_PUBLISHER, useClass: LoggingDomainEventPublisher },
  ],
})
export class AppModule {}
