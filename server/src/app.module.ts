import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { SHELL_SERVICE } from './services/shell/shell.abstract';
import { ShellService } from './services/shell/shell.service';
import { ShellServiceMock } from './services/shell/shell.service.mock';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino/file',
              level: 'debug',
              options: { destination: 'logs/debug.log', mkdir: true },
            },
            {
              target: 'pino/file',
              level: 'error',
              options: { destination: 'logs/error.log', mkdir: true },
            },
            {
              target: 'pino/file',
              level: 'warn',
              options: { destination: 'logs/warn.log', mkdir: true },
            },
            {
              target: 'pino/file',
              level: 'info',
              options: { destination: 'logs/info.log', mkdir: true },
            },
          ],
        },
      },
    }),
  ],
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
