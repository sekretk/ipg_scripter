import { useProperty } from "@frp-ts/react";
import { FC } from "react";
import { counter } from "../store";

export const Groups: FC = () => {
    const count = useProperty(counter)
    return <>Groups{count}</>
}