import { Accordion, Button, ButtonGroup, Container, Form, Modal, Nav, NavDropdown, Navbar, Row, ToggleButton } from "react-bootstrap"
import { DEPARTMENTS, Department, PAGES, Page } from "../abstract";
import { groupsPlainProperty, pageProperty, parentsProperty, processProp, snapshot } from "../store";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { persistantProp } from "../store/persistant";
import { useProperty } from "../hoc/use-property";
import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-toastify";
import { string as S } from "fp-ts";
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

  const parents = useProperty(parentsProperty);

  const allGroups = useProperty(groupsPlainProperty);

  const pageNavMap: Record<Page, FC<Page>> = {
    groups: (page) => <Nav.Link key={'groups'} active={page === 'groups'} onClick={() => persistantProp.page('groups')}>Группы</Nav.Link>,
    users: (page) => <Nav.Link key={'users'} active={page === 'users'} onClick={() => persistantProp.page('users')}>Пользователи</Nav.Link>
  }

  const [isCreateFolderOpened, setIsCreateFolderOpened] = useState(false);
  const [isCreateUserOpened, setIsCreateUserOpened] = useState(false);
  const [folder, setFolder] = useState('');
  const [subFolder, setSubFolder] = useState('');
  const [parentFolder, setParentFolder] = useState(parents[0] ?? '');
  const [subFolderOpened, setSubFolderOpened] = useState<'0' | undefined>(undefined);
  const [currentFolderMode, setCurrentFolderMode] = useState<'second' | 'root'>('root')
  const [user, setUser] = useState<UserForm>(emptyUser);

  const onSubFolderClicked = useCallback(() => setSubFolderOpened(subFolderOpened === '0' ? undefined : '0'), [subFolderOpened])

  const handleCloseCreateFolder = useCallback(() => {
    setFolder('');
    setIsCreateFolderOpened(false);
  }, []);

  const handleCloseCreateUser = useCallback(() => {
    setUser(emptyUser);
    setIsCreateUserOpened(false);
  }, [])

  const createFolder = useCallback(() => {

    if (currentFolderMode === 'second') {
      if (!Boolean(folder)) {
        toast.error('Не задан каталог', { autoClose: 5000 });
        return;
      }

      if (!Boolean(parentFolder)) {
        toast.error('Не задан корневой каталог', { autoClose: 5000 });
        return;
      }

      if (folder.includes('_') || parentFolder.includes('_')) {
        toast.error('Подчеркивание нельзя использовать', { autoClose: 5000 });
        return;
      }

      if (allGroups.includes(`${parentFolder}_${folder}`) ) {
        toast.error('Такой каталог уже есть', { autoClose: 5000 });
        return;
      }

      if (allGroups.some(grp => grp.startsWith(`${parentFolder}_${folder}`))) {
        toast.error('Колизия с другим каталогом, начало должно быть уникальным', { autoClose: 5000 });
        return;
      }

      if (folder.includes(' ') || parentFolder.includes(' ')) {
        toast.error('Пробелы нельзя использовать', { autoClose: 5000 });
        return;
      }

      processProp.set(true);

      setIsCreateFolderOpened(false);

      axios.post(`${API_URL}users/createFolderInRoot/${folder}/${parentFolder}`).then(() => {
        toast.info(`Каталог '${folder}' создан в '${parentFolder}'`);
        processProp.set(false);
        snapshot.createSecondFolder(folder, parentFolder);
        setFolder('');
        setParentFolder(parents[0] ?? '');
      }).catch((err) => {
        console.log(`Error on POST users/createFolderInRoot/${folder}/${parentFolder}`, err)
        toast.error('Ошибка', { autoClose: 5000 });
        processProp.set(false);
        setFolder('');
      })

      return;
    }

    if (subFolderOpened === '0') {
      if (!Boolean(folder)) {
        toast.error('Не задан корневой каталог', { autoClose: 5000 });
        return;
      }

      if (!Boolean(subFolder)) {
        toast.error('Не задан каталог', { autoClose: 5000 });
        return;
      }

      if (folder.includes('_') || subFolder.includes('_')) {
        toast.error('Подчеркивание нельзя использовать', { autoClose: 5000 });
        return;
      }

      if (folder.includes(' ') || subFolder.includes(' ')) {
        toast.error('Пробелы нельзя использовать', { autoClose: 5000 });
        return;
      }

      if (allGroups.includes(`${folder}_${subFolder}`) ) {
        toast.error('Такой каталог уже есть', { autoClose: 5000 });
        return;
      }

      if (allGroups.some(grp => grp.startsWith(`${folder}_${subFolder}`))) {
        toast.error('Колизия с другим каталогом, начало должно быть уникальным', { autoClose: 5000 });
        return;
      }

      processProp.set(true);

      setIsCreateFolderOpened(false);

      axios.post(`${API_URL}users/createFolderWithRoot/${subFolder}/${folder}`).then(() => {
        toast.info(`Каталог '${folder}' и его подкаталог '${subFolder}' созданы`);
        processProp.set(false);
        snapshot.createSecondFolder(subFolder, folder);
        setFolder('');
        setSubFolder('');
      }).catch((err) => {
        console.log(`Error on POST users/createFolderWithRoot/${subFolder}/${folder}`, err)
        toast.error('Ошибка', { autoClose: 5000 });
        processProp.set(false);
        setFolder('');
        setSubFolder('');
      })

      return;
    }

    if (!Boolean(folder)) {
      toast.error('Не задан каталог', { autoClose: 5000 });
      return;
    }

    if (folder.includes('_')) {
      toast.error('Подчеркивание нельзя использовать', { autoClose: 5000 });
      return;
    }

    if (folder.includes(' ')) {
      toast.error('Пробелы нельзя использовать', { autoClose: 5000 });
      return;
    }


    if (allGroups.includes(folder) ) {
      toast.error('Такой каталог уже есть', { autoClose: 5000 });
      return;
    }

    if (allGroups.some(grp => grp.startsWith(folder))) {
      toast.error('Колизия с другим каталогом, начало должно быть уникальным', { autoClose: 5000 });
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
  }, [currentFolderMode, folder, parentFolder, parents, subFolder, subFolderOpened]);

  const createUser = useCallback(() => {
    if (!Boolean(user.login)
      || !Boolean(user.name)
      || !Boolean(user.password)
      || user.password?.length < 6
      || !/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/g.test(user.login)) {
        toast.error('Ошибка ввода', { autoClose: 5000 });
      return;
    }

    processProp.set(true);

    setIsCreateUserOpened(false);

    axios.post(`${API_URL}users/createUser`, user).then(() => {
      toast.info(`Пользователь '${user.name}' создан`);
      processProp.set(false);
      snapshot.createUser({ fullname: user.name, name: user.login, unit: user.department });
      setFolder('');
      persistantProp.selectUser(user.login);
      
    }).catch((err) => {
      console.log(`Error on POST users/createUser/${folder}`, err)
      toast.error('Ошибка', { autoClose: 5000 });
      processProp.set(false);
      setFolder('');
    })
  }, [user]);

  useEffect(() => {
    setFolder('');
    setSubFolder('');
  }, [currentFolderMode])

  useEffect(() => {
    setCurrentFolderMode('root');
    setFolder('');
    setSubFolder('');
    setParentFolder(parents[0] ?? '')
    setSubFolderOpened(undefined);
  }, [isCreateFolderOpened])


  useEffect(() => {
    setUser(emptyUser);
  }, [isCreateUserOpened]);

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
                  [x] Написать всем сообщение
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
          <Row className="mb-2">
            <ButtonGroup>

              <ToggleButton
                type="radio"
                variant={'outline-danger'}
                name="radio"
                value={''}
                checked={currentFolderMode === 'root'}
                onClick={() => setCurrentFolderMode('root')}
              >
                1 уровня
              </ToggleButton>
              <ToggleButton
                type="radio"
                variant={'outline-success'}
                name="radio"
                value={''}
                checked={currentFolderMode === 'second'}
                onClick={() => setCurrentFolderMode('second')}
              >
                2 уровня
              </ToggleButton>
            </ButtonGroup>
          </Row>

          {
            currentFolderMode === 'second' && (
              <>
                <Form.Label>Родительский Каталог</Form.Label>
                <Form.Select aria-label="Default select example" value={parentFolder} onChange={(e => setParentFolder(e.target.value))}>
                  {
                    parents.map(parent => <option value={parent} key={parent}>{parent}</option>)
                  }
                </Form.Select>
                <Form.Label>Каталог 2 уровня</Form.Label>
                <Form.Control type="text" placeholder="каталог 2 уровня" value={folder} onChange={e => setFolder(e.target.value)} />
              </>
            )
          }

          {
            currentFolderMode === 'root' && (
              <>
                <Form.Label>Родительский Каталог</Form.Label>
                <Form.Control type="text" placeholder="Родительский Каталог" value={folder} onChange={e => setFolder(e.target.value)} />

                <Accordion className="mt-3" activeKey={subFolderOpened} onSelect={onSubFolderClicked} >
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Подкаталог</Accordion.Header>
                    <Accordion.Body>
                      <Form.Label>Каталог 2 уровня</Form.Label>
                      <Form.Control type="text" placeholder="каталог 2 уровня" value={subFolder} onChange={e => setSubFolder(e.target.value)} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>
            )
          }

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
          <Form.Control type="text" placeholder="Логин латиницей" value={user.login} onChange={e => setUser({ ...user, login: e.target.value })} />

          <Form.Label>Имя</Form.Label>
          <Form.Control type="text" placeholder="Имя пользователя" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />

          <Form.Label>Пароль</Form.Label>
          <Form.Control type="text" placeholder="Пароль от 6 символов" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />

          <Form.Label>Отделение</Form.Label>
          <Form.Select placeholder="Пароль" value={user.department} onChange={e => setUser({ ...user, department: e.target.value as Department })}>
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