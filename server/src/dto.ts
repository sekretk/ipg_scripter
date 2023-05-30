export type User = {
  name: string;
  unit?: string;
  fullname?: string;
  disabled: boolean;
  lastLogin: string;
  attachedGroups?: Array<string>;
};

export type Group = {
  name: string;
  id: string;
};

export type Checked<T> = { _checked: boolean } & T;

export type UserChangeSet = Partial<{
  enable: boolean;
}>;

export type UserDetailed = User & {
  groups: Array<Checked<Group>>;
};

export type Snapshot = {
  users: Array<User>;
  groups: Array<string>;
};
