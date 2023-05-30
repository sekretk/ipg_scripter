export type Group = string | { parent: string; items: Array<string> };

export type GroupItem = string | { parent: string; item: string };