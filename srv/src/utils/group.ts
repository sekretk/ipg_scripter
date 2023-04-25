import { Checked, Group } from '../dto';

export const mergeGroups = (
  all: Array<Group>,
  userGroups: Array<Group>,
): Array<Checked<Group>> =>
  all.map((group) => ({
    ...group,
    _checked: userGroups.some((_) => _.name === group.name),
  }));
