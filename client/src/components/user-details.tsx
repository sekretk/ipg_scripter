import { selectedUserGroupsProp, selectedUserProp, snapshot } from "../store";
import * as O from "fp-ts/lib/Option";
import { constant, pipe } from "fp-ts/lib/function";
import styled from "styled-components";
import { Badge, Button, Form, ListGroup } from "react-bootstrap";
import { unitColor, unitDescription } from "../utils";
import { useCallback } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { API_URL } from "../config";
import { useProperty } from "../hoc/use-property";

const Container = styled.div`
margin: 10px;`;

export const UserDetails = () => {
    const selected = useProperty(selectedUserProp);
    const groups = useProperty(selectedUserGroupsProp);

    const removeFromGroup = useCallback((group: string, user: string) => {
        axios.post(`${API_URL}users/${user}/removeFromGroup/${group}`).then(() => {
            toast.info(`${user} удалё из ${group}`);
            snapshot.removeUserFromGroup(user, group);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/addToGroup/${group}`, err)
            toast.error('Ошибка', { autoClose: 5000 });
        })
    }, [])

    const addtoGroup = useCallback((group: string, user: string) => {
        axios.post(`${API_URL}users/${user}/addToGroup/${group}`).then(() => {
            toast.warn(`${user} добавлен в ${group}`);
            snapshot.moveUserToGroup(user, group);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/addToGroup/${group}`, err)
            toast.error('Ошибка', { autoClose: 5000 });
        })
    }, [])

    const blockUser = useCallback((user: string) => {
        axios.post(`${API_URL}users/${user}/deactivate`).then(() => {
            toast.warn(`${user} деактивирован`);
            snapshot.blockUser(user);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/deactivate`, err)
            toast.error('Ошибка', { autoClose: 5000 });
        })
    }, []);

    const unblockUser = useCallback((user: string) => {
        axios.post(`${API_URL}users/${user}/activate`).then(() => {
            toast.info(`${user} активирован`);
            snapshot.unblockUser(user);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/activate`, err)
            toast.error('Ошибка', { autoClose: 5000 });
        })
    }, [])

    return (
        pipe(
            selected,
            O.fold(
                constant(<p>Выберите пользователя</p>),
                (user) => (
                    <Container>
                        <Badge bg={unitColor[user.unit]}>{unitDescription[user.unit]}</Badge>
                        <p>Логин: {user.name}</p>
                        <p>Дата последнего логина: {user.lastLogin}</p>
                        {user.disabled && <Button variant="primary" onClick={() => unblockUser(user.name)}>Разбокировать</Button> }
                        {!user.disabled && <Button variant="warning" onClick={() => blockUser(user.name)}>Заблокировать</Button>}
                        <ListGroup className="m-1">
                            {
                                groups.map(({ isChecked, value }) => (
                                    <ListGroup.Item
                                        key={value}
                                    >
                                        <Form.Check
                                            type={'checkbox'}
                                            checked={isChecked}
                                            label={value}
                                            onChange={() => isChecked ? removeFromGroup(value, user.name) : addtoGroup(value, user.name)}
                                        />
                                    </ListGroup.Item>))
                            }
                        </ListGroup>
                    </Container>)
            )
        )
    );
}