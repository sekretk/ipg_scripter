import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  InternalServerErrorException,
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
    try {
      const users = this.appService.users();
      return {
        users,
        length: users.length,
      };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get('/users/:id')
  @Render('user')
  getUser(@Param('id') id: string) {
    console.log('USER DETAILS', this.appService.details(id));

    try {
      return this.appService.details(id);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get('/snapshot')
  getSnapshot() {
    console.log('snapshot');

    try {
      return this.appService.snapshot();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Delete('/users/:user')
  deleteUse(@Param('user') user: string) {
    console.log('USER delete', user);

    try {
      return this.appService.delete(user);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('/users/logoff/:user')
  logoff(@Param('user') user: string) {
    console.log('[AppController#logoff]', user);

    try {
      return this.appService.logoff(user);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('/users/signoff/:user')
  signoff(@Param('user') user: string) {
    console.log('[AppController#signoff]', user);

    try {
      return this.appService.signoff(user);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('/users/:id/activate')
  activate(@Param('id') id: string) {
    console.log('[AppController#Activate]', id);

    try {
      this.appService.activate(id);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('/users/:id/deactivate')
  deactivate(@Param('id') id: string) {
    console.log('[AppController#Deactivate]', id);

    try {
      this.appService.deactive(id);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
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

    try {
      this.appService.remove(id, group);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('/users/createFolder/:folder')
  createFolder(@Param('folder') folder: string) {
    console.log('[AppController#createFolder]', folder);

    try {
      this.appService.createFolder(folder);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('/users/createFolderInRoot/:folder/:root')
  createFolderInRoot(
    @Param('folder') folder: string,
    @Param('root') root: string,
  ) {
    console.log('[AppController#createFolderinRoot]', folder, root);

    try {
      this.appService.createFolderInRoot(folder, root);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('/users/createFolderWithRoot/:folder/:root')
  createFolderWithRoot(
    @Param('folder') folder: string,
    @Param('root') root: string,
  ) {
    console.log('[AppController#createFolderWithRoot]', folder, root);

    try {
      this.appService.createFolderWithRoot(folder, root);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
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

    try {
      this.appService.createUser(
        user.login,
        user.name,
        user.department,
        user.password,
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('/users/:id/password/:password')
  changePassword(
    @Param('id') user: string,
    @Param('password') password: string,
  ) {
    console.log('[AppController#changePassword]', user, password);

    try {
      this.appService.changePassword(user, password);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
