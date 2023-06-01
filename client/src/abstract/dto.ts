export const DEPARTMENTS = ['RND', 'MSK', 'SPB', 'CRM', 'VLG', 'KRN'] as const;

export type Department = typeof DEPARTMENTS[number];

export type User = {
    name: string;
    unit: Department;
    fullname: string;
    disabled: boolean;
    lastLogin: string;
    attachedGroups: Array<string>;
  };

export type Snapshot = {
    users: Array<User>;
    groups: Array<string>;
}