import { Inject, Injectable } from '@nestjs/common';
import { COMMANDS } from '../consts/commands';
import { Checked, Group, User, UserChangeSet } from '../dto';
import { toUser } from '../utils/parse';
import { byLines } from '../utils/string.utils';
import { IShellService, SHELL_SERVICE } from './shell/shell.abstract';

@Injectable()
export class AppService {
  constructor(@Inject(SHELL_SERVICE) private shellService: IShellService) {}

  getHello(): string {
    return this.shellService.exec('HELLO');
  }

  users = (): Array<User> =>
    byLines(this.shellService.exec(COMMANDS.GET_ALL_USER))
      .filter((_) => Boolean(_.trim()))
      .map(toUser)
      .filter((_) => Boolean(_.unit))
      .sort((a, b) => {
        if (a.disabled > b.disabled) {
          return 1;
        } else {
          if (a.disabled < b.disabled) {
            return -1;
          }
        }

        if (new Date(a.lastLogin) < new Date(b.lastLogin)) {
          return 1;
        } else {
          if (new Date(a.lastLogin) > new Date(b.lastLogin)) {
            return -1;
          }
        }

        return 0;
      });

  groups = (user: string): Array<Checked<Group>> => [];

  changeUser = (update: UserChangeSet): void => {
    console.log('change user');
  };
}
