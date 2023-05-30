import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  InternalServerErrorException
} from '@nestjs/common';
import { AppService } from './services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

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
    try {
      this.appService.move(id, group);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
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

  @Post('/users/createFolderInRoot/:folder/:root')
  createFolderInRoot(
    @Param('folder') folder: string,
    @Param('root') root: string,
  ) {
    console.log('[AppController#createFolderinRoot]', folder, root);

    this.appService.createFolderInRoot(folder, root);
  }

  @Post('/users/createFolderWithRoot/:folder/:root')
  createFolderWithRoot(
    @Param('folder') folder: string,
    @Param('root') root: string,
  ) {
    console.log('[AppController#createFolderWithRoot]', folder, root);

    this.appService.createFolderWithRoot(folder, root);
  }

  @Post('/users/createUser')
  createUser(
    @Body()
    user: {
      login: string;
      name: string;
      department: string;
      password: string;
    },
  ) {
    console.log('[AppController#createUser]', user);

    this.appService.createUser(
      user.login,
      user.name,
      user.department,
      user.password,
    );
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
