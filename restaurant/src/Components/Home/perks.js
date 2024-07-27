import React from 'react';
import '../../CSS/Home/perks.css';

const Perks = () => {
  return (
    <div className="about-us">
      <div className="about-info">
        <h1>AALIYA AUTHENTIC HALAL KITCHEN</h1>
        <p>500 Terry Francine Street</p>
        <p>San Francisco, CA 94158</p>
        <p>Tel: 123-456-7890</p>
        <div className="decorative-line"></div>
        <div className="logo-placeholder">
          <img src="path-to-your-logo-image.png" alt="Halal Logo" />
        </div>
      </div>
      <div className="carousel-placeholder">
        {/* Replace this div with your actual carousel component */}
        <div className="carousel">
          <img src="path-to-your-image.jpg" alt="Delicious Food" />
        </div>
      </div>
    </div>
  );
}

export default Perks;
