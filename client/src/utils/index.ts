export const get =
    <T, K extends keyof T>(key: K) =>
        (item: T) =>
            item[key];