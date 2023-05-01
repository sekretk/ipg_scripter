import { Property, newAtom } from "@frp-ts/core"
import { Persistant } from "../abstract/persistant"
import { Page } from "../abstract";

const DEFAULT_PERSISTANT: Persistant = {
    page: 'users'
}

interface IPersistant extends Property<Persistant> {
    readonly update: (upd: Partial<Persistant>) => void;
    readonly page: (page: Page) => void;
    readonly selectUser: (user: string | undefined) => void;
    readonly selectGroup: (group: string | undefined) => void;
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

const newPersistant = (): IPersistant => {
    const state = newAtom<Persistant>(DEFAULT_PERSISTANT);

    const update: IPersistant['update'] = (upd) => state.modify(updatePersistant(upd));
    const page: IPersistant['page'] = (page) => state.modify(setPage(page));
    const selectUser: IPersistant['selectUser'] = (user) => state.modify(setUser(user));
    const selectGroup: IPersistant['selectGroup'] = (group) => state.modify(setGroup(group));

    return {
        ...state,
        update,
        page,
        selectUser,
        selectGroup
    }
}

export const persistantProp = newPersistant()