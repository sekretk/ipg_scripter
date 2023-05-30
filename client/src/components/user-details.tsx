import { processProp, selectedUserGroupsProp, selectedUserProp, snapshot } from "../store";
import * as O from "fp-ts/lib/Option";
import { constant, pipe } from "fp-ts/lib/function";
import styled from "styled-components";
import { Badge, Button, Form, ListGroup, Modal } from "react-bootstrap";
import { unitColor, unitDescription } from "../utils";
import { useCallback, useState } from "react";
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
        processProp.set(true);
        axios.post(`${API_URL}users/${user}/removeFromGroup/${group}`).then(() => {
            toast.info(`${user} удалён из ${group}`);
            snapshot.removeUserFromGroup(user, group);
            processProp.set(false);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/addToGroup/${group}`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            processProp.set(false);
        })
    }, [])

    const addtoGroup = useCallback((group: string, user: string) => {
        processProp.set(true);
        axios.post(`${API_URL}users/${user}/addToGroup/${group}`).then(() => {
            toast.warn(`${user} добавлен в ${group}`);
            snapshot.moveUserToGroup(user, group);
            processProp.set(false);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/addToGroup/${group}`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            processProp.set(false);
        })
    }, [])

    const blockUser = useCallback((user: string) => {
        processProp.set(true);
        axios.post(`${API_URL}users/${user}/deactivate`).then(() => {
            toast.warn(`${user} деактивирован`);
            snapshot.blockUser(user);
            processProp.set(false);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/deactivate`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            processProp.set(false);
        })
    }, []);

    const unblockUser = useCallback((user: string) => {
        processProp.set(true);
        axios.post(`${API_URL}users/${user}/activate`).then(() => {
            toast.info(`${user} активирован`);
            snapshot.unblockUser(user);
            processProp.set(false);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/activate`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            processProp.set(false);
        })
    }, [])

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleCloseChangePassword = () => {
        setShowChangePassword(false);
        setPassword('');
    };

    const changePassword = useCallback((user: string) => {
        if (!Boolean(password)) {
            return;
        }

        processProp.set(true);
        axios.post(`${API_URL}users/${user}/password/${password}`).then(() => {
            toast.info(`Для '${user}' пароль сменён`);
            processProp.set(false);
            setPassword('');
            setShowChangePassword(false);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/password`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            setPassword('');
            processProp.set(false);
            setShowChangePassword(false);
        })
    }, [password]);
    return (pipe(
        selected,
        O.fold(
            constant(<p>Выберите пользователя</p>),
            (user) => (
                <>
                    <Container>
                        <Badge bg={unitColor[user.unit]}>{unitDescription[user.unit]}</Badge>
                        <p>Логин: {user.name}</p>
                        <p>Дата последнего логина: {user.lastLogin}</p>
                        {user.disabled && <Button className="m-1" variant="primary" onClick={() => unblockUser(user.name)}>Разбокировать</Button>}
                        {!user.disabled && <Button className="m-1" variant="warning" onClick={() => blockUser(user.name)}>Заблокировать</Button>}
                        <Button className="m-1" variant="info" onClick={() => setShowChangePassword(true)}>Сменить пароль</Button>
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
                                            style={({ 'cursor': 'pointer' })}
                                            onChange={() => isChecked ? removeFromGroup(value, user.name) : addtoGroup(value, user.name)}
                                        />
                                    </ListGroup.Item>))
                            }
                        </ListGroup>
                    </Container>
                    <Modal show={showChangePassword} onHide={handleCloseChangePassword}>
                        <Modal.Header closeButton>
                            <Modal.Title>Смена пароля</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Label>Новый пароль</Form.Label>
                            <Form.Control type="text" placeholder="новый пароль" value={password} onChange={e => setPassword(e.target.value)} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseChangePassword}>Отмена</Button>
                            <Button variant="primary" onClick={() => changePassword(user.name)}>Сменить</Button>
                        </Modal.Footer>
                    </Modal>
                </>)
        )
    )
    );
}