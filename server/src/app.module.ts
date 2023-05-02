import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { SHELL_SERVICE } from './services/shell/shell.abstract';
import { ShellService } from './services/shell/shell.service';
import { ShellServiceMock } from './services/shell/shell.service.mock';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: SHELL_SERVICE,
      useClass:
        process.env.ENV === 'development' ? ShellServiceMock : ShellService,
    },
  ],
})
export class AppModule {}
