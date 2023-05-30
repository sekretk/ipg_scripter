import { groupsProperty, processProp, selectedUserProp, snapshot } from "../store";
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
import React from "react";

const Container = styled.div`
margin: 10px;`;

export const UserDetails = () => {
    const selected = useProperty(selectedUserProp);

    const groups = useProperty(groupsProperty);

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

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');

    const handleCloseChangePassword = () => {
        setShowChangePassword(false);
        setPassword('');
    };

    const handleCloseMessageDialog = () => {
        setShowMessage(false);
        setMessage('');
    }

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


    const logoff = useCallback((user: string) => {
        processProp.set(true);
        axios.post(`${API_URL}users/logoff/${user}`).then(() => {
            toast.info(`'${user}' отключен`);
            processProp.set(false);
        }).catch((err) => {
            console.log(`Error on POST /users/logoff/${user}`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            processProp.set(false);
            setShowChangePassword(false);
        })
    }, []);

    const signoff = useCallback((user: string) => {
        processProp.set(true);
        axios.post(`${API_URL}users/signoff/${user}`).then(() => {
            toast.info(`'${user}' закрыта сессия сессие`);
            processProp.set(false);
        }).catch((err) => {
            console.log(`Error on POST /users/signoff/${user}`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            processProp.set(false);
            setShowChangePassword(false);
        })
    }, []);

    const sendMessage = useCallback((user: string) => {
        if (!Boolean(message)) {
            return;
        }

        processProp.set(true);
        axios.post(`${API_URL}users/${user}/message/${message}`).then(() => {
            toast.info(`'${user}' отправлено сообщение`);
            processProp.set(false);
            setMessage('');
            setShowMessage(false);
        }).catch((err) => {
            console.log(`Error on POST /users/${user}/message/${message}`, err)
            toast.error('Ошибка', { autoClose: 5000 });
            setMessage('');
            processProp.set(false);
            setShowMessage(false);
        })
    }, [])

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
                        <Button className="m-1" variant="danger" onClick={() => logoff(user.name)}>Закрыть сессию</Button>
                        <Button className="m-1" variant="success" onClick={() => signoff(user.name)}>Выйти из сессии</Button>
                        <Button className="m-1" variant="secondary" onClick={() => setShowMessage(true)}>Отправить сообщение</Button>
                        <ListGroup className="m-1">
                            {
                                groups.map((group, idx) => typeof group === 'string' ? (
                                    <ListGroup.Item
                                        key={idx}
                                    >
                                        <Form.Check
                                            type={'checkbox'}
                                            checked={user.attachedGroups.includes(group)}
                                            label={group}
                                            style={({ 'cursor': 'pointer' })}
                                            onChange={() => user.attachedGroups.includes(group) ? removeFromGroup(group, user.name) : addtoGroup(group, user.name)}
                                        />
                                    </ListGroup.Item>
                                ) : (
                                    <React.Fragment key={idx}>
                                        <p>{group.parent}</p>
                                        {group.items.map(item => (<ListGroup.Item key={item}
                                        ><Form.Check
                                                type={'checkbox'}
                                                checked={user.attachedGroups.includes(`${group.parent}_${item}`)}
                                                label={item}
                                                style={({ 'cursor': 'pointer' })}
                                                onChange={() => user.attachedGroups.includes(`${group}_${item}`) ? removeFromGroup(`${group.parent}_${item}`, user.name) : addtoGroup(`${group.parent}_${item}`, user.name)}
                                            /></ListGroup.Item>))}
                                        -----
                                    </React.Fragment>
                                ))

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

                    <Modal show={showMessage} onHide={handleCloseMessageDialog}>
                        <Modal.Header closeButton>
                            <Modal.Title>Отправка сообщения</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Label>Сообщение для '{user.fullname}'</Form.Label>
                            <Form.Control type="text" placeholder="текст сообщения" value={message} onChange={e => setMessage(e.target.value)} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseMessageDialog}>Отмена</Button>
                            <Button variant="primary" onClick={() => sendMessage(user.name)}>Отправить</Button>
                        </Modal.Footer>
                    </Modal>
                </>)
        )
    )
    );
}