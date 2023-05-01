import { constant, pipe } from "fp-ts/lib/function";
import { selectedGroupProp } from "../store";
import * as O from "fp-ts/lib/Option";
import { useProperty } from "@frp-ts/react";

export const GroupDetails = () => {
    const selected = useProperty(selectedGroupProp);
    return (
        pipe(
            selected,
            O.fold(
                constant(<p>Выберите пользователя</p>),
                (group) => <>{group}</>
            )
        )
    );
}