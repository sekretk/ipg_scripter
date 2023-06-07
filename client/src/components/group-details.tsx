import { constant, pipe } from "fp-ts/lib/function";
import { processProp, selectedGroupProp, selectedGroupUsersProp, snapshot } from "../store";
import * as O from "fp-ts/lib/Option";
import { useProperty } from "../hoc/use-property";
import { Badge, Container, Form, ListGroup } from "react-bootstrap";
import { useCallback } from "react";
import { User } from "../abstract";
import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-toastify";
import { unitColor } from "../utils";

export const GroupDetails = () => {
    const selected = useProperty(selectedGroupProp);
    const users = useProperty(selectedGroupUsersProp);

    const removeUserFromGroup = useCallback((user: User, group: string) => {
        processProp.set(true);
        axios.post(`${API_URL}users/${user.name}/removeFromGroup/${group}`).then(() => {
            toast.info(`${user} удалён из ${group}`);
            snapshot.removeUserFromGroup(user.name, group);
            processProp.set(false);
        }).catch((err) => {
            console.log(`Error on POST /users/${user.name}/addToGroup/${group}`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            processProp.set(false);
        })
    }, [])

    const addUserToGroup = useCallback((user: User, group: string) => {
        processProp.set(true);
        axios.post(`${API_URL}users/${user.name}/addToGroup/${group}`).then(() => {
            toast.warn(`${user.fullname} добавлен в ${group}`);
            snapshot.moveUserToGroup(user.name, group);
            processProp.set(false);
        }).catch((err) => {
            console.log(`Error on POST /users/${user.name}/addToGroup/${group}`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            processProp.set(false);
        })
    }, [])

    return (
        pipe(
            selected,
            O.fold(
                constant(<p>Выберите пользователя</p>),
                (group) => (
                    <Container>
                        <ListGroup className="m-1">
                            {
                                users.map(({ isChecked, value }) => (
                                    <ListGroup.Item
                                        key={value.name}
                                    >
                                        <Form.Check
                                            type={'checkbox'}
                                            label={(
                                                <>
                                                    <Badge pill bg={unitColor[value.unit]} className="m-1">
                                                        {value.unit}
                                                    </Badge>
                                                    {value.fullname}</>
                                            )}
                                            checked={isChecked}
                                            style={({ 'cursor': 'pointer' })}
                                            onChange={() => isChecked ? removeUserFromGroup(value, group) : addUserToGroup(value, group)}
                                        />
                                    </ListGroup.Item>))
                            }
                        </ListGroup>
                    </Container>
                )
            )
        )
    );
}