import { NestFactory } from '@nestjs/core';
import { execSync } from 'child_process';
import { AppModule } from './app.module';

async function bootstrap() {
  execSync('chcp 65001')
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
