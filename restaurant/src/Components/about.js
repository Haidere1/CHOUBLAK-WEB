import React from 'react';
import '../CSS/Home/about.css';

const AboutSection = () => {
  return (
    <div className="about-section">
      <p className="quality-text">QUALITY IS AT HEART OF EVERYTHING WE DO</p>
      <h1 className="main-title">Taste the <span className="highlight">Difference</span></h1>
      <p className="about-description">
        SOUL KITCHEN, founded in 2022, is dedicated to all those who love to wander far and wide. We invite you on a wholesome culinary adventure, where you’ll explore undiscovered gourmet experiences.
      </p>
      <p className="about-description">
        Thank you for creating lasting memories with us.
      </p>
      <button className="about-button">ABOUT US</button>
    </div>
  );
}

export default AboutSection;
