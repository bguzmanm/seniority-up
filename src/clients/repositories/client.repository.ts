import { Client } from "../models/client.js";

export const CLIENT_REPOSITORY = Symbol('CLIENT_REPOSITORY');

export interface ClientRepository {
  findById(id: string): Promise<Client | null>;      // ← solo de a uno. No hay lote.
  save(client: Client): Promise<Client>;
}

// Stub en memoria para que el módulo levante. TODO(clase): reemplazar por
// la implementación real con el ORM.
export class InMemoryClientRepository implements ClientRepository {
  async findById(id: string): Promise<Client | null> {
    return null;
  }
  async save(client: Client): Promise<Client> {
    return client;
  }
}