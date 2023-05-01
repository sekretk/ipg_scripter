import { Property, newAtom } from "@frp-ts/core"
import { Snapshot } from "../abstract"
import { RemoteData, failure, initial, pending, success } from "@devexperts/remote-data-ts"

// we'll need an interface to describe our counter more precisely
interface Counter extends Property<RemoteData<string, Snapshot>> {
    readonly startLoad: () => void
    readonly successLoad: (data: Snapshot) => void
    readonly failedLoad: (error: string) => void
}

const newSnapshot = (): Counter => {
    const state = newAtom<RemoteData<string, Snapshot>>(initial);

    const startLoad: Counter['startLoad']  = () => state.set(pending);
    const successLoad: Counter['successLoad'] = (data) => state.set(success(data));
    const failedLoad: Counter['failedLoad'] = (error) => state.set(failure(error));

    return {
        ...state,
        startLoad,
        successLoad,
        failedLoad
    }
}

export const snapshot = newSnapshot()