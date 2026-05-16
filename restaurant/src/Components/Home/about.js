import React from 'react';
import '../../CSS/Home/about.css';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <div className="about-section">
      <div className="about-inner">
        <span className="quality-text">Quality is at the heart of everything we do</span>
        <div className="about-rule" />
        <h1 className="main-title">
          Taste the <span className="highlight">Caribbean</span>
        </h1>
        <p className="about-description">
          Choublak Restaurant is dedicated to all who love bold flavors and vibrant culture.
          We invite you on a wholesome culinary adventure through the heart of Haiti.
        </p>
        <p className="about-description">
          Thank you for letting us share our culture — one plate at a time.
        </p>
        <Link to="/aboutus" className="about-button">About Us</Link>
      </div>
    </div>
  );
};

export default AboutSection;
