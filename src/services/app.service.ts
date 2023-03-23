import * as A from 'fp-ts/lib/Array';
import * as Ord from 'fp-ts/lib/Ord';
import * as B from 'fp-ts/lib/boolean';
import * as N from 'fp-ts/lib/number';
import * as O from 'fp-ts/lib/Option';
import { Inject, Injectable } from '@nestjs/common';
import { constant, flow, pipe } from 'fp-ts/lib/function';
import {
  activateUser,
  COMMANDS,
  deactivateUser,
  getUserDetailsCommand,
  getUserGroups,
  moveUserToGroup,
  removeUserFromGroup,
} from '../consts/commands';
import { Group, User, UserChangeSet, UserDetailed } from '../dto';
import { toGroupLines, toUserLines } from '../utils/parse';
import { IShellService, SHELL_SERVICE } from './shell/shell.abstract';
import { get } from '../utils/generic';
import { FALLBACK_USER } from '../consts/fixture';
import { mergeGroups } from '../utils/group';

@Injectable()
export class AppService {
  constructor(@Inject(SHELL_SERVICE) private shellService: IShellService) {}

  users = (): Array<User> =>
    pipe(
      this.shellService.exec(COMMANDS.GET_ALL_USER),
      toUserLines,
      A.filter(flow(get('unit'), Boolean)),
      A.sortBy([
        Ord.contramap<boolean, User>(get('disabled'))(B.Ord),
        Ord.contramap<number, User>(flow(get('lastLogin'), Date.parse))(
          Ord.reverse(N.Ord),
        ),
      ]),
    );

  details = (login: string): UserDetailed => {
    const user: User = pipe(
      this.shellService.exec(getUserDetailsCommand(login)),
      toUserLines,
      A.head,
      O.getOrElse(constant(FALLBACK_USER)),
    );

    const allGroups: Array<Group> = pipe(
      this.shellService.exec(COMMANDS.GET_ALL_GROUPS),
      toGroupLines,
    );

    const userGroups: Array<Group> = pipe(
      this.shellService.exec(getUserGroups(login)),
      toGroupLines,
    );

    return { ...user, groups: mergeGroups(allGroups, userGroups) };
  };

  changeUser = (update: UserChangeSet): void => {
    console.log('change user');
  };

  deactive = (user: string): void => {
    this.shellService.exec(deactivateUser(user));
  };

  activate = (user: string): void => {
    this.shellService.exec(activateUser(user));
  };

  move = (user: string, group: string): void => {
    this.shellService.exec(moveUserToGroup(user, group));
  };

  remove = (user: string, group: string): void => {
    this.shellService.exec(removeUserFromGroup(user, group));
  };
}
