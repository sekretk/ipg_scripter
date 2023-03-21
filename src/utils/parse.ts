import { User } from '../dto';

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
