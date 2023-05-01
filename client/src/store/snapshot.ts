import { Property, newAtom } from "@frp-ts/core"
import { Snapshot } from "../abstract"
import { RemoteData, failure, initial, isSuccess, pending, success } from "@devexperts/remote-data-ts"
import * as A from "fp-ts/lib/Array";
import * as S from "fp-ts/lib/string";

interface ISnapshot extends Property<RemoteData<string, Snapshot>> {
    readonly startLoad: () => void
    readonly successLoad: (data: Snapshot) => void
    readonly failedLoad: (error: string) => void
    readonly moveUserToGroup: (user: string, group: string) => void
    readonly removeUserFromGroup: (user: string, group: string) => void
}

const newSnapshot = (): ISnapshot => {
    const state = newAtom<RemoteData<string, Snapshot>>(initial);

    const startLoad: ISnapshot['startLoad'] = () => state.set(pending);
    const successLoad: ISnapshot['successLoad'] = (data) => state.set(success(data));
    const failedLoad: ISnapshot['failedLoad'] = (error) => state.set(failure(error));

    const moveUserToGroup: ISnapshot['moveUserToGroup'] = (user, group) => state.modify((st) => {
        if (isSuccess(st)) {

            return success({
                groups: st.value.groups,
                users: st.value.users.map(usr => {
                    if (usr.name === user) {
                        return { ...usr, attachedGroups: A.uniq(S.Eq)([...usr.attachedGroups, group]) }
                    } else {
                        return usr;
                    }
                })
            })
        }
        return st;
    });

    const removeUserFromGroup: ISnapshot['removeUserFromGroup'] = (user, group) => state.modify((st) => {
        if (isSuccess(st)) {

            return success({
                groups: st.value.groups,
                users: st.value.users.map(usr => {
                    if (usr.name === user) {
                        
                        return { ...usr, attachedGroups: usr.attachedGroups.filter(userGroup => userGroup !== group) }
                    } else {
                        return usr;
                    }
                })
            })
        }
        return st;
    });

    return {
        ...state,
        startLoad,
        successLoad,
        failedLoad,
        moveUserToGroup,
        removeUserFromGroup
    }
}

export const snapshot = newSnapshot()