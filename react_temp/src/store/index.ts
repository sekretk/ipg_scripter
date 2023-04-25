import { newAtom, Property } from "@frp-ts/core"


// we'll need an interface to describe our counter more precisely
interface Counter extends Property<number> {
    readonly inc: () => void
}

// we'll also need a constructor that takes initial value
const newCounter = (initial: number): Counter => {
    // here we define local mutable state
    const state = newAtom(initial)
    // expose readonly API
    const inc = () => state.modify((n) => n + 1)
    return {
        ...state,
        inc,
    }
}

// now create counter and increment its value
export const counter = newCounter(0)