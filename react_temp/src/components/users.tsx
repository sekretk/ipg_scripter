import { FC } from "react";
import { Button } from "react-bootstrap";
import { counter } from "../store";

export const Users: FC = () => {
    return <>Users
      <Button variant="primary" onClick={() => counter.inc()}>Primary</Button>{' '}</>
}