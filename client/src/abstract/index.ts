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

export type Snapshot = {
    users: Array<User>;
    groups: Array<Group>;
}