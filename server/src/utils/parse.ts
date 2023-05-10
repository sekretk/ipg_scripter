import { flow, FunctionN } from 'fp-ts/lib/function';
import * as A from 'fp-ts/lib/Array';
import * as S from 'fp-ts/lib/string';
import { Group, User } from '../dto';
import { byLines } from './string.utils';
import { not } from 'fp-ts/lib/Predicate';
import {
  AD_UNIT_SEPERATOR,
  AUX_SEPERATOR,
  ENV_KEYS,
  MAIN_SEPERATOR,
} from '../consts/config';

const fullNameParse = (value: string): { unit?: string; fullname?: string } => {
  const values = value?.split(AD_UNIT_SEPERATOR) ?? [];

  const unit = values.find((_) => _.startsWith('OU='))?.replace('OU=', '');

  const fullname = values.find((_) => _.startsWith('CN='))?.replace('CN=', '');

  return {
    fullname,
    unit,
  };
};

export const toUser = (str: string): User => {
  const [name, description, enabled, lastLogin] = str
    .split(MAIN_SEPERATOR)
    .filter(Boolean);

  const { fullname, unit } = fullNameParse(description);

  const res = {
    name,
    disabled: enabled === 'False',
    fullname,
    unit,
    lastLogin,
  };

  console.log(`[toUser] ${str}`);

  return res;
};

export const toUserLines: FunctionN<[string], Array<User>> = flow(
  byLines,
  A.map(S.trim),
  A.filter(Boolean),
  A.map(toUser),
);

export const toGroup = (str: string): Group => {
  const [name, id] = str.split(/\s/gm).filter(Boolean);

  console.log(`[toGroup] ${str}`);

  return { id, name };
};

export const toGroupLines: (prefix: string) => FunctionN<[string], Array<Group>> = (prefix) => flow(
  byLines,
  A.map(S.trim),
  A.filter(Boolean),
  A.filter(not(S.startsWith('---'))),
  A.filter(not(S.startsWith('Name'))),
  A.filter(S.startsWith(process.env[ENV_KEYS.PREFIX])),
  A.map(toGroup),
);

export const toUsersWithGroup: FunctionN<[string], Array<User>> = (value) => {
  const users: Array<User> = [];

  const lines = byLines(value);

  lines.forEach((line) => {
    const [name, description, enabled, lastLogin, groups] = line
      .split(MAIN_SEPERATOR)
      .filter(Boolean);

    const groupsArr =
      groups?.split(AUX_SEPERATOR)?.map(S.replace('\r', '')) ?? [];

    const { fullname, unit } = fullNameParse(description);

    const user = {
      name,
      disabled: enabled === 'False',
      fullname,
      unit,
      lastLogin,
      attachedGroups: groupsArr,
    };

    console.log(`[toUsersWithGroup] user`, user);

    users.push(user);
  });

  return users.filter((user) => Boolean(user.unit));
};
