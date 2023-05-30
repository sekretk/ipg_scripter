import { Property, newAtom } from "@frp-ts/core"
import { Snapshot, User } from "../abstract"
import { RemoteData, failure, initial, isSuccess, pending, success } from "@devexperts/remote-data-ts"
import * as A from "fp-ts/lib/Array";
import * as S from "fp-ts/lib/string";
import { pipe } from "fp-ts/lib/function";

interface ISnapshot extends Property<RemoteData<string, Snapshot>> {
    readonly startLoad: () => void
    readonly successLoad: (data: Snapshot) => void
    readonly failedLoad: (error: string) => void
    readonly moveUserToGroup: (user: string, group: string) => void
    readonly removeUserFromGroup: (user: string, group: string) => void
    readonly blockUser: (user: string) => void
    readonly unblockUser: (user: string) => void
    readonly createFolder: (folder: string) => void
    readonly createSecondFolder: (folder: string, root: string) => void
    readonly createUser: (user: Pick<User, 'name' | 'fullname' | 'unit'>) => void
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
                parents: st.value.parents,
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
                parents: st.value.parents,
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

    const blockUser: ISnapshot['blockUser'] = (user) => state.modify(st => {
        if (isSuccess(st)) {

            return success({
                groups: st.value.groups,
                parents: st.value.parents,
                users: st.value.users.map(usr => {
                    if (usr.name === user) {
                        return { ...usr, disabled: true }
                    } else {
                        return usr;
                    }
                })
            })
        }
        return st;
    })

    const unblockUser: ISnapshot['unblockUser'] = (user) => state.modify(st => {
        if (isSuccess(st)) {

            return success({
                groups: st.value.groups,
                parents: st.value.parents,
                users: st.value.users.map(usr => {
                    if (usr.name === user) {
                        return { ...usr, disabled: false }
                    } else {
                        return usr;
                    }
                })
            })
        }
        return st;
    });

    const createFolder: ISnapshot['createFolder'] = (folder) => state.modify(st => {
        if (isSuccess(st)) {

            return success({
                groups: [...st.value.groups, `IPG_${folder.toUpperCase()}`],
                parents: st.value.parents,
                users: st.value.users
            })
        }
        return st;
    });

    const createSecondFolder: ISnapshot['createSecondFolder'] = (folder, root) => state.modify(st => {
        if (isSuccess(st)) {

            return success({
                groups: [...st.value.groups, `IPG_${folder.toUpperCase()}`],
                parents: pipe(st.value.parents, A.concat([`IPG_${root.toUpperCase()}`]), A.uniq(S.Eq)),
                users: st.value.users
            })
        }
        return st;
    });

    const createUser: ISnapshot['createUser'] = (user) => state.modify(st => {
        if (isSuccess(st)) {

            return success({
                groups: st.value.groups,
                parents: st.value.parents,
                users: [...st.value.users, {...user, attachedGroups: [], lastLogin: '-', disabled: false} ]
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
        removeUserFromGroup,
        blockUser,
        unblockUser,
        createFolder,
        createSecondFolder,
        createUser
    }
}

export const snapshot = newSnapshot()