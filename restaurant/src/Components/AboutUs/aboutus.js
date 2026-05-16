import React from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/AboutUs/aboutus.css';
import heroImage from './choublakabout.jpg';
import editorImage from './haitittttii.jpg';
import Footer from '../Home/footer.js';
import CollapsibleExample from '../Home/tabbar.js';

const AboutUs = () => {
    return (
        <div className="about-us">
            <CollapsibleExample />

            {/* Hero */}
            <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="overlay" data-aos="fade-up">
                    <h1>About Us</h1>
                </div>
                <div className="hero-wave">
                    <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,35 C360,70 720,0 1080,35 C1260,52 1380,22 1440,35 L1440,70 L0,70 Z" fill="#f0f8ff" />
                    </svg>
                </div>
            </section>

            {/* Description */}
            <section className="au-story">
                <div className="container">
                    <div className="content" data-aos="fade-right" data-aos-offset="200">
                        <span className="au-eyebrow">Our Story</span>
                        <div className="au-rule" />
                        <h2>We Always Make<br />the Best</h2>
                        <p>
                            Choublak Restaurant was born from a deep love for Haitian culture and cuisine.
                            Every dish we serve carries the warmth of the Caribbean — vibrant, bold, and
                            made with heart. From the moment you walk in, you're family.
                        </p>
                        <Link to="/menu" className="contact-button">Explore Our Menu</Link>
                    </div>
                    <div className="image" data-aos="fade-left" data-aos-offset="200">
                        <img src={editorImage} alt="Haitian Food" />
                    </div>
                </div>
                <div className="au-wave">
                    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,45 C180,90 420,0 660,50 C900,90 1180,10 1440,50 L1440,90 L0,90 Z" fill="rgba(2,48,71,0.25)" />
                        <path d="M0,60 C240,20 500,90 720,55 C960,20 1220,80 1440,60 L1440,90 L0,90 Z" fill="rgba(2,48,71,0.55)" />
                        <path d="M0,72 C300,40 600,90 900,65 C1100,50 1320,82 1440,72 L1440,90 L0,90 Z" fill="#023047" />
                    </svg>
                </div>
            </section>

            {/* Stats */}
            <section className="achievements-section">
                <div className="container">
                    <div className="achievement" data-aos="fade-up" data-aos-delay="0">
                        <h3>15+</h3>
                        <p>Years of Cooking</p>
                    </div>
                    <div className="achievement" data-aos="fade-up" data-aos-delay="100">
                        <h3>5K+</h3>
                        <p>Happy Diners</p>
                    </div>
                    <div className="achievement" data-aos="fade-up" data-aos-delay="200">
                        <h3>50+</h3>
                        <p>Menu Items</p>
                    </div>
                    <div className="achievement" data-aos="fade-up" data-aos-delay="300">
                        <h3>10+</h3>
                        <p>Awards Won</p>
                    </div>
                </div>
                <div className="au-wave">
                    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,45 C180,0 420,90 660,45 C900,0 1180,80 1440,45 L1440,90 L0,90 Z" fill="rgba(240,248,255,0.3)" />
                        <path d="M0,60 C240,90 500,10 720,55 C960,90 1220,20 1440,55 L1440,90 L0,90 Z" fill="rgba(240,248,255,0.65)" />
                        <path d="M0,72 C280,45 580,90 860,68 C1080,50 1300,86 1440,72 L1440,90 L0,90 Z" fill="#f0f8ff" />
                    </svg>
                </div>
            </section>

            {/* Skills */}
            <section className="skills-section">
                <div className="container">
                    <h2>What We Do Best</h2>
                    <p>From market-fresh ingredients to family recipes passed down through generations.</p>
                    <div className="skills">
                        <div className="skill">
                            <h4>Fresh Ingredients <span>95%</span></h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '95%' }} />
                            </div>
                        </div>
                        <div className="skill">
                            <h4>Authentic Recipes <span>90%</span></h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '90%' }} />
                            </div>
                        </div>
                        <div className="skill">
                            <h4>Customer Experience <span>88%</span></h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '88%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA banner */}
            <section className="hire-us-section" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="overlay">
                    <h2>We Are Always Ready to Serve You<br />the Best of Haiti</h2>
                    <Link to="/menu" className="get-started-button">Explore Our Menu</Link>
                </div>
            </section>

            {/* Map */}
            <section className="map-section">
                <div className="container">
                    <h2>Find Us</h2>
                    <div className="map-container">
                        <iframe
                            title="Map Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.140580761341!2d-80.26170695555393!3d26.15955071824894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9079afc50c2b3%3A0x8c1e128cdcb968c9!2sChoublak%20Restaurant!5e0!3m2!1sen!2s!4v1723917819387!5m2!1sen!2s"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
