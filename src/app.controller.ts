import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('test')
  getHello() {
    return { message: this.appService.getHello() };
  }
}
