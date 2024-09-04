import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/config';
import '../../CSS/navstyle.css';
import logo from '../../background/logo.png';
import { FaBars } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { Button } from 'react-bootstrap'; // Importing Button for the new style

function CollapsibleExample() {
  const navigate=useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/admin/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };
  
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg=""
      variant="light"
      className='glass'
      style={{
        fontSize: "medium",
        padding: "10px 20px",
        borderRadius: "0px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        <Navbar.Brand style={{ width: "180px", paddingBottom: "0" }}>
          <img
            className='logo'
            src={logo}
            alt=''
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FaBars style={{ color: "rgb(31,179,71)", fontSize: "1.5rem" }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{ alignItems: "center" }}>
            <Link to='/update' className="nav-link">
            <Button variant="outline-primary" style={{ marginRight: '10px' }}>
                Manage
              </Button>
            </Link>
            
            <Link to='/addproduct' className="nav-link" style={{ paddingLeft: "0px" }}>
            <Button variant="outline-success" style={{ marginRight: '10px' }}>
                Add Product
              </Button>            </Link>
            <Link to="/orders" className="nav-link">
              <Button variant="outline-danger" style={{ marginRight: '10px' }}>
                Orders
              </Button>
            </Link>
          </Nav>
          <Nav style={{ alignItems: "center" }}>
            <Link to="/home" className="nav-link">
              <Button variant="outline-primary" style={{ marginRight: '10px' }}>
                Home
              </Button>
            </Link>
           
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
