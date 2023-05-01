import { constant, flow, pipe } from "fp-ts/lib/function";
import { snapshot } from "./snapshot";
import { map } from "@frp-ts/fp-ts";
import * as RD from "@devexperts/remote-data-ts";
import { Property } from "@frp-ts/core";
import { Snapshot, User } from "../abstract";
import { EMPTY_SNAPSHOT } from "../fixture";
import { get } from "../utils";
import { not } from "fp-ts/lib/Predicate";

export const isLoadingProperty: Property<boolean> = pipe(snapshot, map(flow(not(RD.isSuccess))));

export const snapshotProperty: Property<Snapshot> = pipe(snapshot, map(RD.getOrElse(constant(EMPTY_SNAPSHOT))));

export const usersProperty: Property<Array<User>> = pipe(snapshotProperty, map(get('users')));

