import { Module } from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  InMemoryClientRepository,
} from './repositories/client.repository.js';

@Module({
  providers: [
    {
      provide: CLIENT_REPOSITORY,
      useClass: InMemoryClientRepository,
    },
  ],
  exports: [CLIENT_REPOSITORY],
})
export class ClientsModule {}
