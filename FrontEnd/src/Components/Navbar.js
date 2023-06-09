//import Button from 'react-bootstrap/Button';
import { Button } from 'primereact/button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate} from 'react-router-dom';

function NavScrollExample() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.getItem("token") ? navigate("/home") : navigate("/login");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/home">MARKS MANAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div style={{marginLeft:230}} />
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/home/filieres">Filieres</Nav.Link>
            <Nav.Link href="/home/profs">Professeurs</Nav.Link>
            <Nav.Link href="/home/comptes">Comptes</Nav.Link>
            <NavDropdown title="Modules/Elements" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/home/modules">Modules</NavDropdown.Item>
              <NavDropdown.Item href="/home/elements">
                Elements
              </NavDropdown.Item>             
            </NavDropdown>
          </Nav>
          <div style={{marginLeft:290}}/>
          <Button className='p-button-outlined p-button-danger' onClick={handleLogout} label="LOGOUT" icon="pi pi-sign-out" iconPos="left"/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;