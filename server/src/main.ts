import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { execSync } from 'child_process';

async function bootstrap() {
  process.env.ENV !== 'development' && execSync('chcp 65001');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.enableCors();

  await app.listen(process.env.PORT ?? 4444);
}
bootstrap();