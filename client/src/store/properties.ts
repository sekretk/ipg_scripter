import { constant, flow, pipe } from "fp-ts/lib/function";
import { snapshot } from "./snapshot";
import * as FRP from "@frp-ts/fp-ts";
import * as RD from "@devexperts/remote-data-ts";
import { Property } from "@frp-ts/core";
import { Checked, Department, Page, Snapshot, User } from "../abstract";
import { EMPTY_SNAPSHOT } from "../fixture";
import { get } from "../utils";
import { not } from "fp-ts/lib/Predicate";
import { persistantProp } from "./persistant";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import * as Ord from "fp-ts/lib/Ord";
import * as S from "fp-ts/lib/string";
import { Persistant } from "../abstract/persistant";

export const isLoadingProperty: Property<boolean> = pipe(snapshot, FRP.map(flow(not(RD.isSuccess))));

export const snapshotProperty: Property<Snapshot> = pipe(snapshot, FRP.map(RD.getOrElse(constant(EMPTY_SNAPSHOT))));

export const usersProperty: Property<Array<User>> = pipe(snapshotProperty,
    FRP.map(
        flow(
            get('users'),
            A.sort(Ord.contramap<string, User>(get('lastLogin'))(S.Ord)))));

export const groupsProperty: Property<Array<string>> = pipe(snapshotProperty, FRP.map(
    flow(
        get('groups'),
        A.sort(S.Ord)
    )));

export const pageProperty: Property<Page> = pipe(persistantProp, FRP.map(get('page')));

export const selectedUserProp: Property<O.Option<User>> = pipe(FRP.sequenceT(persistantProp, usersProperty),
    FRP.map(
        ([{ selectedUser }, users]) => users.find(user => user.name === selectedUser)
    ), FRP.map(O.fromNullable));

export const selectedGroupProp: Property<O.Option<string>> = pipe(FRP.sequenceT(persistantProp, groupsProperty),
    FRP.map(
        ([{ selectedGroup }, groups]) => groups.find(group => group === selectedGroup)
    ), FRP.map(O.fromNullable));

export const selectedUserGroupsProp: Property<Array<Checked<string>>> = pipe(
    FRP.sequenceT(persistantProp, snapshotProperty),
    FRP.map(
        ([{ selectedUser }, { users, groups }]) => {
            const user = users.find(user => user.name === selectedUser);

            if (user === undefined) {
                return [];
            }

            return pipe(groups, A.sort(S.Ord), A.map(group => ({
                value: group,
                isChecked: Boolean(user.attachedGroups?.find(userGroup => userGroup === group)) ? true : false
            })))
        }
    ));

export const usersFilterStrProp: Property<string> = pipe(
    persistantProp,
    FRP.map(flow(get('usersFilterText')))
);

export const usersFilterDepProp: Property<Department | undefined> = pipe(
    persistantProp,
    FRP.map(flow(get('usersFilterDep'), O.fromNullable, O.toUndefined))
);

export const groupsFilterProp: Property<Persistant['groupsFilter']> = pipe(persistantProp, FRP.map(get('groupsFilter')));

export const filteredUsersProp: Property<Array<User>> = pipe(
    FRP.sequenceT(usersProperty, usersFilterStrProp),
    FRP.map(([users, filter]) => users.filter(user => {

        console.log('XXX filter', filter )

        if (Boolean(filter?.substring) && (!user.name.includes(filter) && !user.fullname.includes(filter))) {
            return false;
        }

        // if (Boolean(filter?.department) && user.unit !== filter?.department) {
        //     return false;
        // }

        return true;
    }))
)