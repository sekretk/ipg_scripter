export const PAGES = ['users', 'groups'] as const;
export type Page = typeof PAGES[number];