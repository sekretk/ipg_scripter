import { useProperty } from "@frp-ts/react";
import { selectedUserProp } from "../store";
import * as O from "fp-ts/lib/Option";
import { constant, pipe } from "fp-ts/lib/function";

export const UserDetails = () => {
    const selected = useProperty(selectedUserProp);
    return (
        pipe(
            selected,
            O.fold(
                constant(<p>Выберите пользователя</p>),
                (user) => <>{user.fullname}</>
            )
        )
    );
}