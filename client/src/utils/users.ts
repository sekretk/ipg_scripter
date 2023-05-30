import { Ord, contramap, getMonoid } from "fp-ts/lib/Ord";
import * as B from "fp-ts/lib/boolean";
import * as S from "fp-ts/lib/string";
import { Department, User } from "../abstract";
import { concatAll } from "fp-ts/lib/Monoid";
import { get } from "./obj";
import { pipe } from "fp-ts/lib/function";

export const usersFilter = (str: string, dep: Department | undefined) => (user: User): boolean => {
    if (Boolean(str) && (!user.name.toLowerCase().includes(str.toLowerCase()) && !user.fullname.toLowerCase().includes(str.toLowerCase()))) {
        return false;
    }

    if (Boolean(dep) && user.unit !== dep) {
        return false;
    }

    return true;
}

const byDisability: Ord<User> = pipe(B.Ord, contramap(get('disabled')));
const byName: Ord<User>  = pipe(S.Ord, contramap(get('fullname')));

export const usersOrd: Ord<User> = concatAll(getMonoid<User>())([byDisability, byName])