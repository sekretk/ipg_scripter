import { Button, Container, Form, Modal, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { DEPARTMENTS, Department, PAGES, Page } from "../abstract";
import { pageProperty, processProp, snapshot } from "../store";
import { FC, memo, useCallback, useState } from "react";
import { persistantProp } from "../store/persistant";
import { useProperty } from "../hoc/use-property";
import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-toastify";
import { string } from "fp-ts";
import { unitDescription } from "../utils";

type UserForm = {
  login: string,
  name: string,
  department: Department,
  password: string
}

const emptyUser: UserForm = {
  login: '',
  name: '',
  department: "MSK",
  password: ''
};

export const MainToolBar = memo(() => {

  const currentPage = useProperty(pageProperty);

  const pageNavMap: Record<Page, FC<Page>> = {
    groups: (page) => <Nav.Link key={'groups'} active={page === 'groups'} onClick={() => persistantProp.page('groups')}>Группы</Nav.Link>,
    users: (page) => <Nav.Link key={'users'} active={page === 'users'} onClick={() => persistantProp.page('users')}>Пользователи</Nav.Link>
  }

  const [isCreateFolderOpened, setIsCreateFolderOpened] = useState(false);
  const [isCreateUserOpened, setIsCreateUserOpened] = useState(false);
  const [folder, setFolder] = useState('');

  const [user, setUser] = useState<UserForm>(emptyUser);

  const handleCloseCreateFolder = useCallback(() => {
    setFolder('');
    setIsCreateFolderOpened(false);
  }, []);

  const handleCloseCreateUser = useCallback(() => {
    setUser(emptyUser);
    setIsCreateUserOpened(false);
  }, [])

  const createFolder = useCallback(() => {
    if (!Boolean(folder)) {
      return;
    }

    processProp.set(true);

    setIsCreateFolderOpened(false);

    axios.post(`${API_URL}users/createFolder/${folder}`).then(() => {
      toast.info(`Каталог '${folder}' создан`);
      processProp.set(false);
      snapshot.createFolder(folder);
      setFolder('');
    }).catch((err) => {
      console.log(`Error on POST users/createFolder/${folder}`, err)
      toast.error('Ошибка', { autoClose: 5000 });
      processProp.set(false);
      setFolder('');
    })
  }, [folder]);

  const createUser = useCallback(() => {
    if (!Boolean(user.login) 
    || !Boolean(user.name) 
    || !Boolean(user.password) 
    || !/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/g.test( user.login)) {
      return;
    }

    processProp.set(true);

    setIsCreateUserOpened(false);

    axios.post(`${API_URL}users/createUser`, user).then(() => {
      toast.info(`Пользователь '${user.name}' создан`);
      processProp.set(false);
      snapshot.createUser({fullname: user.name, name: user.login, unit: user.department});
      setFolder('');
    }).catch((err) => {
      console.log(`Error on POST users/createUser/${folder}`, err)
      toast.error('Ошибка', { autoClose: 5000 });
      processProp.set(false);
      setFolder('');
    })
  }, [user]);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>IPG пользователи</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                PAGES.map(page => pageNavMap[page](currentPage))
              }
              <NavDropdown title="Действия" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => setIsCreateUserOpened(true)}>Создать пользователя</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setIsCreateFolderOpened(true)}>
                  Создать каталог
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  [x] Написать сообщение
                </NavDropdown.Item>
                <NavDropdown.Item>
                  [x] Перезапустить 1С
                </NavDropdown.Item>
                <NavDropdown.Item>
                  [x] Перезапустить терминал
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={isCreateFolderOpened} onHide={handleCloseCreateFolder}>
        <Modal.Header closeButton>
          <Modal.Title>Создание каталога</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Label>Имя</Form.Label>
          <Form.Control type="text" placeholder="название каталога" value={folder} onChange={e => setFolder(e.target.value)} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateFolder}>Отмена</Button>
          <Button variant="primary" onClick={createFolder}>Создать</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isCreateUserOpened} onHide={handleCloseCreateUser}>
        <Modal.Header closeButton>
          <Modal.Title>Создание пользователя</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Label>Логин</Form.Label>
          <Form.Control type="text" placeholder="Логин латиницей" value={user.login} onChange={e => setUser({...user, login: e.target.value})} />

          <Form.Label>Имя</Form.Label>
          <Form.Control type="text" placeholder="Имя пользователя" value={user.name} onChange={e => setUser({...user, name: e.target.value})} />

          <Form.Label>Пароль</Form.Label>
          <Form.Control type="text" placeholder="Пароль" value={user.password} onChange={e => setUser({...user, password: e.target.value})} />

          <Form.Label>Отделение</Form.Label>
          <Form.Select placeholder="Пароль" value={user.department} onChange={e => setUser({...user, department: e.target.value as Department})}>
            {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{unitDescription[dep]}</option>)}
          </Form.Select>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateUser}>Отмена</Button>
          <Button variant="primary" onClick={createUser}>Создать</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
})