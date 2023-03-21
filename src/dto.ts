export type User = {
  name: string;
  unit?: string;
  fullname?: string;
  enabled: boolean;
};

export type Group = {
  name: string;
  id: string;
};

export type Checked<T> = { _checked: boolean } & T;

export type UserChangeSet = Partial<{
  enable: boolean;
}>;
