import { Property, newAtom } from "@frp-ts/core";

interface IProcess extends Property<boolean> {
    readonly set: (val: boolean) => void;
}

const newProcess = (): IProcess => {
    const state = newAtom<boolean>(false);

    const set: IProcess['set'] = (val) => state.set(val);

    return {
        ...state,
        set
    }
}

export const processProp = newProcess()