import { Inject, Injectable } from '@nestjs/common';
import {
  ORDER_REPOSITORY,
  type IOrderRepository,
} from '../repositories/order.repository.js';
import {
  CLIENT_REPOSITORY,
  type ClientRepository,
} from '../../clients/repositories/client.repository.js';
import {
  UNIT_OF_WORK,
  type UnitOfWork,
} from '../../repositories/unit-of-work.js';
import { Order } from '../models/order.js';

export interface DecrementStockCommand {
  order: Order;
  sku: string;
  quantity: number;
}

// Puerto para el servicio de inventario (a implementar en clase si hace falta).
export interface InventoryService {
  decrement(sku: string, quantity: number): Promise<void>;
}

export const INVENTORY_SERVICE = Symbol('INVENTORY_SERVICE');

@Injectable()
export class InventoryBuild {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: ClientRepository,
    @Inject(UNIT_OF_WORK) private readonly unitOfWork: UnitOfWork,
    @Inject(INVENTORY_SERVICE) private readonly inventory: InventoryService,
  ) {}

  async execute(command: DecrementStockCommand): Promise<void> {
    const { order, sku, quantity } = command;

    // OLVIDEMOS dónde estamos escribiendo este código; lo importante
    // es la idea sobre las transacciones compuestas:
    //
    //   try {
    //     await this.unitOfWork.run(async (manager) => {
    //       // begin transaction
    //       await orderRepository.save(order, manager);   // crear la orden
    //       await inventory.decrement(sku, quantity);     // ajustar stock
    //     });
    //   } catch (e) {
    //     // rollback implícito: si algo falla, NADA queda persistido
    //     console.error(e);
    //     throw e;
    //   }
    //
    // TODO(clase): implementar esto usando UnitOfWork para que save +
    // decrement sean atómicos. Sin transacción, si decrement falla,
    // la orden queda creada pero sin stock reservado.

    await this.orderRepository.save(order);
    await this.inventory.decrement(sku, quantity);
  }
}
