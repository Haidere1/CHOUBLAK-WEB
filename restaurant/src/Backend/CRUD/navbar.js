import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/config';
import logo from '../../background/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import './admin-navbar.css';

function AdminNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate('/admin/login'))
      .catch((err) => console.error('Sign out error:', err));
  };

  return (
    <nav className="admin-nav">
      <div className="admin-nav-inner">
        <Link to="/addproduct" className="admin-brand">
          <img src={logo} alt="Choublak" />
        </Link>

        <div className={`admin-links${open ? ' open' : ''}`}>
          <Link to="/addproduct" className="admin-link" onClick={() => setOpen(false)}>Add Product</Link>
          <Link to="/update"     className="admin-link" onClick={() => setOpen(false)}>Manage</Link>
          <Link to="/orders"     className="admin-link" onClick={() => setOpen(false)}>Orders</Link>
          <div className="admin-divider" />
          <Link to="/home" className="admin-link dim" onClick={() => setOpen(false)}>← Site</Link>
          <button onClick={handleLogout} className="admin-logout">Logout</button>
        </div>

        <button className="admin-toggle" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
