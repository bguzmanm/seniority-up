import { Money } from '../../vo/money.js';
import { Client } from '../../clients/models/client.js';

export class Order {
  private items: OrderItem[] = [];
  private constructor(
    public readonly id: string,
    public readonly clientId: string,
    public readonly status = 'CREATED',
    public readonly createdAt: Date = new Date(),
  ) {}

  static create(id: string, clientId: string): Order {
    return new Order(id, clientId);
  }

  addItem(item: OrderItem): void {
    if (this.items.length >= 20) throw new Error('Máximo 20 ítems por orden');
    if (this.items.some((i) => i.name === item.name)) {
      throw new Error('Ítem duplicado: incrementá la cantidad en su lugar');
    }
    this.items.push(item);
  }

  changeQuantity(name: string, quantity: number): void {
    const item = this.items.find((i) => i.name === name);
    if (!item) throw new Error(`Ítem inexistente: ${name}`);
    this.items[this.items.indexOf(item)] = OrderItem.create(
      item.name,
      item.price,
      quantity,
    );
  }

  get total(): Money {
    return this.items.reduce(
      (acc, i) => acc.add(i.subtotal),
      Money.of(0, 'USD'),
    );
  }

  get itemLines(): readonly OrderItem[] {
    return [...this.items]; // copia: leer sí, escribir solo por mí
  }
}

export interface OrderWithDetails {
  order: Order;
  items: readonly OrderItem[];
  client: Client;
}

export class OrderItem {
  private constructor(
    public readonly name: string,
    public readonly price: Money, // ← VOs del bloque 1, ya construyen su propia validez
    public quantity: number,
  ) {}

  static create(name: string, price: Money, quantity: number): OrderItem {
    if (quantity < 1 || quantity > 99)
      throw new Error('Cantidad fuera de rango');
    return new OrderItem(name, price, quantity);
  }

  get subtotal(): Money {
    return this.price.multiply(this.quantity);
  }
}