import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { selectedUserProp, usersProperty } from "../store";
import { useProperty } from "@frp-ts/react";
import styled from "styled-components";
import { UserDetails } from "./user-details";
import { constant, pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { get } from "../utils";
import { persistantProp } from "../store/persistant";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `;

export const Users: FC = () => {
  const users = useProperty(usersProperty);
  const selected = useProperty(selectedUserProp);
  return (
    <Container>
      <ListGroup>
        {
          users.map((user) => (
            <ListGroup.Item 
            key={user.name} 
            active={pipe(selected, O.map(get('name')), O.map(name => name === user.name), O.getOrElse(constant(false)))}
            onClick={() => persistantProp.selectUser(user.name)}
            >{user.fullname}</ListGroup.Item>))
        }
      </ListGroup>
      <UserDetails />
    </Container>
  )
}