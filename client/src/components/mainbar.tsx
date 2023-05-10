import { Button, Container, Form, Modal, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { PAGES, Page } from "../abstract";
import { pageProperty, processProp, snapshot } from "../store";
import { FC, memo, useCallback, useState } from "react";
import { persistantProp } from "../store/persistant";
import { useProperty } from "../hoc/use-property";
import axios from "axios";
import { API_URL } from "../config";
import { toast } from "react-toastify";



export const MainToolBar = memo(() => {

  const currentPage = useProperty(pageProperty);

  const pageNavMap: Record<Page, FC<Page>> = {
    groups: (page) => <Nav.Link key={'groups'} active={page === 'groups'} onClick={() => persistantProp.page('groups')}>Группы</Nav.Link>,
    users: (page) => <Nav.Link key={'users'} active={page === 'users'} onClick={() => persistantProp.page('users')}>Пользователи</Nav.Link>
  }

  const [isCreateFolderOpened, setIsCreateFolderOpened] = useState(false);
  const [folder, setFolder] = useState('');

  const handleCloseCreateFolder = useCallback(() => {
    setFolder('');
    setIsCreateFolderOpened(false);
  }, []);

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
                <NavDropdown.Item>[x] Создать пользователя</NavDropdown.Item>
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
          <Form.Label>Каталог</Form.Label>
          <Form.Control type="text" placeholder="название каталога" value={folder} onChange={e => setFolder(e.target.value)} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateFolder}>Отмена</Button>
          <Button variant="primary" onClick={createFolder}>Создать</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
})