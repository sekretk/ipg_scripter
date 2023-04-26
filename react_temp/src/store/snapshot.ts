import { Property, newAtom } from "@frp-ts/core"
import { Snapshot } from "../abstract"
import * as O from "fp-ts/lib/Option"
import { identity } from "fp-ts/lib/function"

// we'll need an interface to describe our counter more precisely
interface Counter extends Property<O.Option<Snapshot>> {
    readonly set: (snapshot: Snapshot) => void
}

// we'll also need a constructor that takes initial value
const newSnapshot = (): Counter => {
    // here we define local mutable state
    const state = newAtom(O.none)
    // expose readonly API
    const set = () => state.modify(identity)
    return {
        ...state,
        set,
    }
}

// now create counter and increment its value
export const snapshot = newSnapshot()