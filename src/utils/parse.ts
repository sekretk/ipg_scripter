import { flow, FunctionN, pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/lib/Array';
import * as S from 'fp-ts/lib/string';
import { Group, User } from '../dto';
import { byLines } from './string.utils';
import { not } from 'fp-ts/lib/Predicate';

const fullNameParse = (value: string): { unit?: string; fullname?: string } => {
  const values = value?.split(',') ?? [];

  const unit = values.find((_) => _.startsWith('OU='))?.replace('OU=', '');

  const fullname = values.find((_) => _.startsWith('CN='))?.replace('CN=', '');

  return {
    fullname,
    unit,
  };
};

export const toUser = (str: string): User => {
  const [name, description, enabled, lastLogin] = str
    .split(/\s/gm)
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
  A.filter(not(S.startsWith('---'))),
  A.filter(not(S.startsWith('SamAccountName'))),
  A.map(toUser),
);

export const toGroup = (str: string): Group => {
  const [name, id] = str.split(/\s/gm).filter(Boolean);

  console.log(`[toGroup] ${str}`);

  return { id, name };
};

export const toGroupLines: FunctionN<[string], Array<Group>> = flow(
  byLines,
  A.map(S.trim),
  A.filter(Boolean),
  A.filter(not(S.startsWith('---'))),
  A.filter(not(S.startsWith('Name'))),
  A.filter(S.startsWith('IPG_')),
  A.map(toGroup),
);
