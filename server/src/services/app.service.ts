import * as A from 'fp-ts/lib/Array';
import * as Ord from 'fp-ts/lib/Ord';
import * as B from 'fp-ts/lib/boolean';
import * as N from 'fp-ts/lib/number';
import * as O from 'fp-ts/lib/Option';
import * as S from 'fp-ts/lib/string';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { constant, flow, pipe } from 'fp-ts/lib/function';
import {
  activateUser,
  changePassword,
  COMMANDS,
  createFolderInRoot,
  createFolderWithRoot,
  createResource,
  createUser,
  deactivateUser,
  deleteUser,
  getUserDetailsCommand,
  getUserGroups,
  moveUserToGroup,
  removeUserFromGroup,
} from '../consts/commands';
import { Group, Snapshot, User, UserChangeSet, UserDetailed } from '../dto';
import { toGroupLines, toUserLines, toUsersWithGroup } from '../utils/parse';
import { IShellService, SHELL_SERVICE } from './shell/shell.abstract';
import { get } from '../utils/generic';
import { FALLBACK_USER } from '../consts/fixture';
import { mergeGroups } from '../utils/group';
import { ConfigService } from '@nestjs/config';
import { ENV_KEYS } from '../consts/config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @Inject(SHELL_SERVICE) private shellService: IShellService,
    private configService: ConfigService,
  ) {}

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

  allGroups = (): Array<Group> =>
    pipe(
      this.shellService.exec(COMMANDS.GET_ALL_GROUPS),
      toGroupLines(this.configService.get(ENV_KEYS.PREFIX)),
    );

  details = (login: string): UserDetailed => {
    const user: User = pipe(
      this.shellService.exec(getUserDetailsCommand(login)),
      toUserLines,
      A.head,
      O.getOrElse(constant(FALLBACK_USER)),
    );

    const allGroups = this.allGroups();

    const userGroups: Array<Group> = pipe(
      this.shellService.exec(getUserGroups(login)),
      toGroupLines(this.configService.get(ENV_KEYS.PREFIX)),
    );

    return { ...user, groups: mergeGroups(allGroups, userGroups) };
  };

  snapshot = (): Snapshot => {
    this.logger.debug('snapshot asked');

    const res = this.shellService.exec(COMMANDS.SNAPSHOT);

    const users = toUsersWithGroup(res);

    const all_groups = this.allGroups().map((_) =>
      _.name.replace(this.configService.get(ENV_KEYS.PREFIX), ''),
    );

    const groups = all_groups.filter((grp) =>
      all_groups.every((g) => g === grp || !g.startsWith(grp)),
    );

    return {
      groups,
      users,
    };
  };

  changeUser = (update: UserChangeSet): void => {
    console.log('change user');
  };

  delete = (user: string): void => {
    this.shellService.exec(
      deleteUser(user, this.configService.get(ENV_KEYS.SCRIPT_ROOTS)),
    );
  };

  deactive = (user: string): void => {
    this.shellService.exec(deactivateUser(user));
  };

  activate = (user: string): void => {
    this.shellService.exec(activateUser(user));
  };

  move = (user: string, group: string): void => {
    this.shellService.exec(
      moveUserToGroup(
        user,
        `${this.configService.get(ENV_KEYS.PREFIX)}${group}`,
      ),
    );
  };

  remove = (user: string, group: string): void => {
    this.shellService.exec(
      removeUserFromGroup(
        user,
        `${this.configService.get(ENV_KEYS.PREFIX)}${group}`,
      ),
    );
  };

  createFolder = (folder: string): void => {
    this.shellService.exec(
      createResource(
        folder,
        this.configService.get(ENV_KEYS.SCRIPT_ROOTS),
        this.configService.get(ENV_KEYS.SHARE_ROOT),
        this.configService.get(ENV_KEYS.PREFIX),
      ),
    );
  };

  createFolderWithRoot = (folder: string, root: string): void => {
    console.log(
      'appSrv#createFolderWithRoot',
      `${this.configService.get(ENV_KEYS.SHARE_ROOT)}${root}\\${folder}`,
      `${this.configService.get(
        ENV_KEYS.PREFIX,
      )}${root.toUpperCase()}_${folder.toUpperCase()}`,
      `${this.configService.get(ENV_KEYS.PREFIX)}${root.toUpperCase()}`,
      this.configService.get(ENV_KEYS.SCRIPT_ROOTS),
    );
    this.shellService.exec(
      createFolderWithRoot(
        `${this.configService.get(ENV_KEYS.SHARE_ROOT)}${root}\\${folder}`,
        `${this.configService.get(
          ENV_KEYS.PREFIX,
        )}${root.toUpperCase()}_${folder.toUpperCase()}`,
        `${this.configService.get(ENV_KEYS.PREFIX)}${root}`,
        `${this.configService.get(ENV_KEYS.PREFIX)}${root.toUpperCase()}`,
        this.configService.get(ENV_KEYS.SCRIPT_ROOTS),
      ),
    );
  };

  createFolderInRoot = (folder: string, root: string): void => {
    console.log(
      'appSrv#createFolderInRoot',
      `${this.configService.get(ENV_KEYS.SHARE_ROOT)}${root}\\${folder}`,
      `${this.configService.get(
        ENV_KEYS.PREFIX,
      )}${root.toUpperCase()}_${folder.toUpperCase()}`,
      `${this.configService.get(ENV_KEYS.PREFIX)}${root.toUpperCase()}`,
      this.configService.get(ENV_KEYS.SCRIPT_ROOTS),
    );
    this.shellService.exec(
      createFolderInRoot(
        `${this.configService.get(ENV_KEYS.SHARE_ROOT)}${root}\\${folder}`,
        `${this.configService.get(
          ENV_KEYS.PREFIX,
        )}${root.toUpperCase()}_${folder.toUpperCase()}`,
        `${this.configService.get(ENV_KEYS.PREFIX)}${root.toUpperCase()}`,
        this.configService.get(ENV_KEYS.SCRIPT_ROOTS),
      ),
    );
  };

  createUser = (
    login: string,
    name: string,
    dep: string,
    password: string,
  ): void => {
    this.shellService.exec(
      createUser(
        this.configService.get(ENV_KEYS.SCRIPT_ROOTS),
        login,
        name,
        dep,
        password,
      ),
    );
  };

  changePassword = (user: string, password: string): void => {
    this.shellService.exec(
      changePassword(
        user,
        password,
        this.configService.get(ENV_KEYS.SCRIPT_ROOTS),
      ),
    );
  };
}
