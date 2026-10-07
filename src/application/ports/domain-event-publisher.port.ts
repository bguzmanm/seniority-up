export const DOMAIN_EVENT_PUBLISHER = Symbol("DOMAIN_EVENT_PUBLISHER");

export interface DomainEvent {
  readonly name: string;
  readonly occurredAt: Date;
}

export interface DomainEventPublisher {
  publish(event: DomainEvent): Promise<void>;
}