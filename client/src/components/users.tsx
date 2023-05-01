import { FC } from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { filteredUsersProp, selectedUserProp, usersProperty } from "../store";
import { useProperty } from "@frp-ts/react";
import styled from "styled-components";
import { UserDetails } from "./user-details";
import { constant, pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { get, unitColor } from "../utils";
import { persistantProp } from "../store/persistant";
import { UsersFilter } from "./users-filter";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1;
  `;



export const Users: FC = () => {
  const users = useProperty(usersProperty);
  const selected = useProperty(selectedUserProp);

  return (
    <Container>
      <UsersFilter/>
      <ListGroup>
        {
          users.map((user) => (
            <ListGroup.Item
              key={user.name}
              active={pipe(selected, O.map(get('name')), O.map(name => name === user.name), O.getOrElse(constant(false)))}
              onClick={() => persistantProp.selectUser(user.name)}
            > <Badge pill bg={unitColor[user.unit]} className="m-1">
                {user.unit}
              </Badge>
              {user.fullname}
            </ListGroup.Item>))
        }
      </ListGroup>
      <UserDetails />
    </Container>
  )
}