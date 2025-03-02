import { SERVER_PORT } from './config/constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  // server port
  const port = configService.get<number>(SERVER_PORT) || 3000;
  await app.listen(port);
}
bootstrap();