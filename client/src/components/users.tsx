import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { usersProperty } from "../store";
import { useProperties } from "@frp-ts/react";

export const Users: FC = () => {
    const [users] = useProperties(usersProperty);
    return (
      <ListGroup>
        {
          users.map((user) => (<ListGroup.Item key={user.name}>{user.fullname}</ListGroup.Item>))
        }
    </ListGroup>
    )
}