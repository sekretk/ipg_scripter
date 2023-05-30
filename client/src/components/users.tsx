import { FC, useEffect } from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { filteredUsersProp, selectedUserProp } from "../store";
import styled from "styled-components";
import { UserDetails } from "./user-details";
import { constant, pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { get, unitColor } from "../utils";
import { persistantProp } from "../store/persistant";
import { UsersFilter } from "./users-filter";
import { useProperty } from "../hoc/use-property";

const Container = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
  `;

const UsersContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `;

export const Users: FC = () => {
  const users = useProperty(filteredUsersProp);
  const selected = useProperty(selectedUserProp);

  useEffect(() => {
    if (O.isSome(selected) && users.every(usr => usr.name !== selected.value.name)) {
      persistantProp.selectUser(undefined);
    }
  }, [users, selected])

  return (
    <Container>
      <UsersFilter />
      <UsersContainer>
        <ListGroup className="m-1">
          {
            users.map((user) =>
              user.disabled ? (<s  key={user.name}>
                <ListGroup.Item
                  variant={user.disabled ? 'secondary' : ''}                 
                  active={pipe(selected, O.map(get('name')), O.map(name => name === user.name), O.getOrElse(constant(false)))}
                  onClick={() => persistantProp.selectUser(user.name)}
                > <Badge pill bg={unitColor[user.unit]} className="m-1">
                    {user.unit}
                  </Badge>
                  {user.fullname}
                </ListGroup.Item>
              </s>) : <ListGroup.Item
                variant={user.disabled ? 'secondary' : ''}
                key={user.name}
                active={pipe(selected, O.map(get('name')), O.map(name => name === user.name), O.getOrElse(constant(false)))}
                onClick={() => persistantProp.selectUser(user.name)}
              > <Badge pill bg={unitColor[user.unit]} className="m-1">
                  {user.unit}
                </Badge>
                {user.fullname}
              </ListGroup.Item>
            )
          }
        </ListGroup>
        <UserDetails />
      </UsersContainer>
    </Container>
  )
}