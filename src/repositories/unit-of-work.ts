// Puerto de UnitOfWork: un solo lugar para agrupar varias escrituras
// en una transacción atómica (todo o nada).
export const UNIT_OF_WORK = Symbol('UNIT_OF_WORK');

export interface UnitOfWork {
  run<T>(work: (manager: unknown) => Promise<T>): Promise<T>;
}
