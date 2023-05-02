import { Property } from "@frp-ts/core"
import { useCallback, useEffect, useState, useSyncExternalStore } from "react"

export const useProperty = <A>(property: Property<A>): A => {
    const [state, setState] = useState(property.get());
    useEffect(() => {
        property.subscribe({
            next: () => {
                setState(property.get())
            }
        })
    }, [])
    return state;
}