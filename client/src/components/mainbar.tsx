import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { PAGES, Page } from "../abstract";
import { useProperty } from "@frp-ts/react";
import { pageProperty } from "../store";
import { FC } from "react";
import { persistantProp } from "../store/persistant";



export const MainToolBar = () => {

  const currentPage = useProperty(pageProperty);

  const pageNavMap: Record<Page, FC<Page>> = {
    groups: (page) => <Nav.Link key={'groups'} active={page === 'groups'} onClick={() => persistantProp.page('groups')}>Группы</Nav.Link>,
    users: (page) => <Nav.Link key={'users'} active={page === 'users'} onClick={() => persistantProp.page('users')}>Пользователи</Nav.Link>
  }

    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>IPG пользователи</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"  />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                PAGES.map(page => pageNavMap[page](currentPage))
              }
              <NavDropdown title="Действия" id="basic-nav-dropdown">
                <NavDropdown.Item>Создать пользователя</NavDropdown.Item>
                <NavDropdown.Item>
                    Создать каталог
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                    Написать сообщение
                </NavDropdown.Item>
                <NavDropdown.Item>
                    Перезапустить 1С
                </NavDropdown.Item>
                <NavDropdown.Item>
                    Перезапустить терминал
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}