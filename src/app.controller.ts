import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  @Render('users')
  getUsers() {
    return {
      users: this.appService.users(),
      length: this.appService.users().length,
    };
  }

  @Get('/users/:id')
  @Render('user')
  getUser(@Param('id') id: string) {
    return {
      name: id,
      fullname: 'fullname',
    };
  }
}
