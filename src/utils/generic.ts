export const get =
  <T, K extends keyof T>(key: K) =>
  (item: T): T[K] =>
    item[key];
