import { FC } from "react";
import { groupsProperty, selectedGroupProp } from "../store";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";
import { GroupDetails } from "./group-details";
import { constant, pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { persistantProp } from "../store/persistant";
import { useProperty } from "../hoc/use-property";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `;

export const Groups: FC = () => {
    const groups = useProperty(groupsProperty);
    const selected = useProperty(selectedGroupProp);
    return (
        <Container>
            <ListGroup>
                {
                    groups.map((group) => (
                        <ListGroup.Item
                            key={group}
                            active={pipe(selected, O.map(groupName => group === groupName), O.getOrElse(constant(false)))}
                            onClick={() => persistantProp.selectGroup(group)}
                        >{group}</ListGroup.Item>))
                }
            </ListGroup>
            <GroupDetails />
        </Container>
    )
}