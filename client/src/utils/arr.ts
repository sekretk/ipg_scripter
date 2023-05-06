import { Predicate } from "fp-ts/lib/Predicate";

export const all =
	<T>(predicate: Predicate<T>) =>
	(items: Array<T>) =>
		items.every(predicate);


export const any =
	<T>(predicate: Predicate<T>) =>
	(items: Array<T>) =>
		items.some(predicate);