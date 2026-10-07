import { Injectable, Logger } from '@nestjs/common';
import type { InventoryService } from '../use-case/inventory-build.js';

// Stub de inventario: simula descontar stock. En clase se puede conectar
// a una tabla real o hacerlo fallar para demostrar el rollback transaccional.
@Injectable()
export class InMemoryInventoryService implements InventoryService {
  private readonly logger = new Logger('Inventory');

  async decrement(sku: string, quantity: number): Promise<void> {
    this.logger.log(`Stock -${quantity} para ${sku}`);
  }
}
