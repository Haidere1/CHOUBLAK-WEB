import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../CSS/navstyle.css';
import logo from '../../background/logo.png';
import { FaShoppingCart, FaBars } from 'react-icons/fa';

function CollapsibleExample() {
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cartItems.length);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`beach-navbar ${scrolled ? 'scrolled' : ''}`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/home" style={{ width: '160px', paddingBottom: '0' }}>
          <img
            className="logo"
            src={logo}
            alt="Choublak"
            style={{ width: '100%', objectFit: 'contain' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FaBars style={{ color: scrolled ? '#023047' : 'white', fontSize: '1.3rem' }} />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" style={{ alignItems: 'center', gap: '4px' }}>
            <Link to="/home" className="beach-nav-link">Home</Link>
            <Link to="/menu" className="beach-nav-link">Menu</Link>
            <Link to="/aboutus" className="beach-nav-link">About Us</Link>
            <Link to="/cart" className="beach-nav-link cart-link">
              <FaShoppingCart size={21} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
