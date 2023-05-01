import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"

export const MainToolBar = () => {
    return (
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">IPG пользователи</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"  />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#users">Пользователи</Nav.Link>
              <Nav.Link href="#groups">Группы</Nav.Link>
              <NavDropdown title="Действия" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/createUser">Создать пользователя</NavDropdown.Item>
                <NavDropdown.Item href="#action/createGroup">
                    Создать каталог
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/broadcast">
                    Написать сообщение
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/broadcast">
                    Перезапустить 1С
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/broadcast">
                    Перезапустить терминал
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}