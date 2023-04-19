//import Button from 'react-bootstrap/Button';
import { Button } from 'primereact/button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
        <Navbar.Brand href="/homeprof">MARKS MANAGER</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <div style={{marginLeft:370}} />
            <Nav.Link href="/homeprof">Home</Nav.Link>
            <Nav.Link href="/homeprof/elementsprof">Mes Elements</Nav.Link>
          </Nav>
          <div style={{marginLeft:470}}/>
          <Button className='p-button-outlined p-button-danger' onClick={handleLogout} label="LOGOUT" icon="pi pi-sign-out" iconPos="right"/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;