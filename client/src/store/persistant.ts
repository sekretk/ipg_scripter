import { Property, newAtom } from "@frp-ts/core"
import { Persistant } from "../abstract/persistant"
import { Department, Page } from "../abstract";

const DEFAULT_PERSISTANT: Persistant = {
    page: 'users',
    usersFilterText: ''
}

interface IPersistant extends Property<Persistant> {
    readonly update: (upd: Partial<Persistant>) => void;
    readonly page: (page: Page) => void;
    readonly selectUser: (user: string | undefined) => void;
    readonly selectGroup: (group: string | undefined) => void;
    readonly usersFilterText: (str: string) => void;
    readonly usersFilterDep: (dep: Department) => void;
    readonly groupsFilterText: (str: string) => void;
}

const setPage =
    (page: Page) =>
        (persistant: Persistant): Persistant => ({ ...persistant, page })

const updatePersistant =
    (upd: Partial<Persistant>) =>
        (persistant: Persistant): Persistant => ({ ...persistant, ...upd })

const setUser =
    (selectedUser: string | undefined) =>
        (persistant: Persistant): Persistant => ({ ...persistant, selectedUser })

const setGroup =
    (selectedGroup: string | undefined) =>
        (persistant: Persistant): Persistant => ({ ...persistant, selectedGroup })

const setUsersFilterText = (usersFilterText: string) => (persistant: Persistant): Persistant => ({
    ...persistant, usersFilterText
})
const setUsersDepText = (department: Department) => (persistant: Persistant): Persistant =>
({
    ...persistant, usersFilterDep: persistant.usersFilterDep === department ? undefined : department
})

const setGroupsFilterText = (groupsFilter: string) => (persistant: Persistant): Persistant =>
 ({ ...persistant, groupsFilter })

const newPersistant = (): IPersistant => {
    const state = newAtom<Persistant>(DEFAULT_PERSISTANT);

    const update: IPersistant['update'] = (upd) => state.modify(updatePersistant(upd));
    const page: IPersistant['page'] = (page) => state.modify(setPage(page));
    const selectUser: IPersistant['selectUser'] = (user) => state.modify(setUser(user));
    const selectGroup: IPersistant['selectGroup'] = (group) => state.modify(setGroup(group));
    const usersFilterText: IPersistant['usersFilterText'] = (str) => state.modify(setUsersFilterText(str));
    const usersFilterDep: IPersistant['usersFilterDep'] = (dep) => state.modify(setUsersDepText(dep));
    const groupsFilterText: IPersistant['groupsFilterText'] = (str) => state.modify(setGroupsFilterText(str));

    return {
        ...state,
        update,
        page,
        selectUser,
        selectGroup,
        usersFilterText,
        usersFilterDep,
        groupsFilterText
    }
}

export const persistantProp = newPersistant()