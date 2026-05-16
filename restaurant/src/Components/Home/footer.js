import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import logo from '../../background/logo.png';
import '../../CSS/footer.css';

const Footer = () => {
  return (
    <footer className="beach-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="Choublak Restaurant" width="130px" />
          <p>Bringing the vibrant flavors of Haiti to your table since day one.</p>
        </div>
        <div className="footer-links">
          <Link to="/home">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="footer-social">
          <a href="/" aria-label="Facebook"><FaFacebookF /></a>
          <a href="/" aria-label="Twitter"><FaTwitter /></a>
          <a href="/" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <small>&copy; Choublak Restaurant, 2024. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
