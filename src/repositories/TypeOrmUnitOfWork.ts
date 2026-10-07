import type { UnitOfWork } from './unit-of-work.js';

// TODO(clase): implementar con TypeORM una vez instalemos typeorm:
//
//   import { DataSource, EntityManager } from 'typeorm';
//
//   export class TypeOrmUnitOfWork implements UnitOfWork {
//     constructor(private readonly dataSource: DataSource) {}
//
//     async run<T>(work: (manager: EntityManager) => Promise<T>): Promise<T> {
//       return this.dataSource.transaction(async (manager) => work(manager));
//     }
//   }
//
// Por ahora SOLO ejecuta el trabajo sin transacción real, para que el
// proyecto compile y se pueda correr. Usá esto para mostrar el "antes".
export class TypeOrmUnitOfWork implements UnitOfWork {
  async run<T>(work: (manager: unknown) => Promise<T>): Promise<T> {
    return work(undefined);
  }
}
