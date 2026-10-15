
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = Number(config.get('PORT', 3000));
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port');
  }

  app.enableCors();
  app.enableShutdownHooks();
  app.getHttpAdapter().get('/', (req, res) => res.send({ message: 'Server Running Successfully!' }));

  await app.listen(port, '0.0.0.0');
  console.log(`Server listening on http://localhost:${port}`);
}

bootstrap().catch((error: unknown) => {
  console.error('Application failed to start', error);
  process.exitCode = 1;
});
