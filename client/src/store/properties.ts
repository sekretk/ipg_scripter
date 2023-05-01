import { constant, flow, pipe } from "fp-ts/lib/function";
import { snapshot } from "./snapshot";
import * as FRP from "@frp-ts/fp-ts";
import * as RD from "@devexperts/remote-data-ts";
import { Property } from "@frp-ts/core";
import { Page, Snapshot, User } from "../abstract";
import { EMPTY_SNAPSHOT } from "../fixture";
import { get } from "../utils";
import { not } from "fp-ts/lib/Predicate";
import { persistantProp } from "./persistant";
import * as O from "fp-ts/lib/Option";

export const isLoadingProperty: Property<boolean> = pipe(snapshot, FRP.map(flow(not(RD.isSuccess))));

export const snapshotProperty: Property<Snapshot> = pipe(snapshot, FRP.map(RD.getOrElse(constant(EMPTY_SNAPSHOT))));

export const usersProperty: Property<Array<User>> = pipe(snapshotProperty, FRP.map(get('users')));

export const groupsProperty: Property<Array<string>> = pipe(snapshotProperty, FRP.map(get('groups')));

export const pageProperty: Property<Page> = pipe(persistantProp, FRP.map(get('page')));

export const selectedUserProp: Property<O.Option<User>> = pipe(FRP.sequenceT(persistantProp, usersProperty),
    FRP.map(
        ([{ selectedUser }, users]) => users.find(user => user.name === selectedUser)
    ), FRP.map(O.fromNullable));

export const selectedGroupProp: Property<O.Option<string>> = pipe(FRP.sequenceT(persistantProp, groupsProperty),
FRP.map(
    ([{ selectedGroup }, groups]) => groups.find(group => group === selectedGroup)
), FRP.map(O.fromNullable));