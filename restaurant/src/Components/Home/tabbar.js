import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../CSS/navstyle.css';
import logo from '../../background/logo.png';
import { FaShoppingCart } from 'react-icons/fa';
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
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Container>
        <Navbar.Brand style={{ width: "15vw", paddingBottom: "0" }}>
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
            <Link to='/home' className="nav-link">
              Home
            </Link>
            
            <Link to='/menu' className="nav-link" style={{ paddingLeft: "0px" }}>
              Menu
            </Link>
          </Nav>
          <Nav style={{ alignItems: "center" }}>
            <Link to="/aboutus" className="nav-link" style={{ color: "rgb(239,29,41)" }}>
              About Us
            </Link>
            <Link to="/cart" className="nav-link" style={{ position: 'relative', marginLeft: '0px', color: "rgb(31,179,71)" }}>
              <FaShoppingCart size={25} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  backgroundColor: '#e91e63',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '5px 10px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
