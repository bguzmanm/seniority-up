import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

const observeEnabled =
  process.env.NEST_OBSERVE_APP_KEY && process.env.NEST_OBSERVE_APP_SECRET;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: observeEnabled ? ObserveInstrument : undefined,
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
