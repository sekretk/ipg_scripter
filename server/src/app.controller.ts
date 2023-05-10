import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  root() {
    Redirect('index.html');
  }

  @Get('/users')
  @Render('users')
  getUsers() {
    const users = this.appService.users();
    return {
      users,
      length: users.length,
    };
  }

  @Get('/users/:id')
  @Render('user')
  getUser(@Param('id') id: string) {
    console.log('USER DETAILS', this.appService.details(id));
    return this.appService.details(id);
  }

  @Get('/snapshot')
  getSnapshot() {
    console.log('snapshot');
    return this.appService.snapshot();
  }

  @Delete('/users/:user')
  deleteUse(@Param('user') user: string) {
    console.log('USER delete', user);
    return this.appService.delete(user);
  }

  @Post('/users/:id/activate')
  activate(@Param('id') id: string) {
    console.log('[AppController#Activate]', id);
    this.appService.activate(id);
  }

  @Post('/users/:id/deactivate')
  deactivate(@Param('id') id: string) {
    console.log('[AppController#Deactivate]', id);
    this.appService.deactive(id);
  }

  @Post('/users/:id/addToGroup/:group')
  togroup(@Param('id') id: string, @Param('group') group: string) {
    console.log('[AppController#togroup]', id, group);
    this.appService.move(id, group);
  }

  @Post('/users/:id/removeFromGroup/:group')
  fromgroup(@Param('id') id: string, @Param('group') group: string) {
    console.log('[AppController#fromgroup]', id, group);
    this.appService.remove(id, group);
  }

  @Post('/users/createFolder/:folder')
  createFolder(@Param('folder') folder: string) {
    console.log('[AppController#createFolder]', folder);

    this.appService.createFolder(folder);
  }

  @Post('/users/:id/password/:password')
  changePassword(
    @Param('id') user: string,
    @Param('password') password: string,
  ) {
    console.log('[AppController#changePassword]', user, password);

    this.appService.changePassword(user, password);
  }
}
