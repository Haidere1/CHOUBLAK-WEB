import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../CSS/navstyle.css';
import logo from '../../background/logo.png';
import { FaBars } from 'react-icons/fa';

function CollapsibleExample() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cartItems.length);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

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
            <Link to='/admin/update' className="nav-link">
              Manage
            </Link>
            
            <Link to='/admin/addproduct' className="nav-link" style={{ paddingLeft: "0px" }}>
              Add Product
            </Link>
          </Nav>
          <Nav style={{ alignItems: "center" }}>
            <Link to="/home" className="nav-link" style={{ color: "rgb(239,29,41)" }}>
              Home
            </Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
