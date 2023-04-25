import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { execSync } from 'child_process';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  process.env.ENV !== 'development' && execSync('chcp 65001');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));  
  app.setViewEngine('hbs');

  await app.listen(4444);
}
bootstrap();
