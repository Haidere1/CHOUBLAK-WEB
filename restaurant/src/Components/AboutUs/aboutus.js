import React from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/AboutUs/aboutus.css';
import heroImage from './choublakabout.jpg';  // Replace with the actual image path
import editorImage from './haitittttii.jpg';  // Replace with the actual image path
import Footer from '../Home/footer.js';
import CollapsibleExample from '../Home/tabbar.js';

const AboutUs = () => {
    return (
        <div className="about-us" style={{backgroundColor: "#BDF6FE"}}>
          <CollapsibleExample/>
            {/* Hero Section */}
            <section  className="hero" style={{ backgroundImage: `url(${heroImage})`,marginTop:"10px" }}>
                <div className="overlay" data-aos="zoom-in-up">
                    <h1>About Us</h1>
                </div>
            </section>

            {/* About Us Description */}
            <section className="about-description">
                <div className="container">
                    <div className="content" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                        <h2>We Always Make The Best</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id odio placerat, convallis neque eget, interdum leo. Nunc hendrerit urna nibh, eget egestas risus ornare vitae. Duis ut varius augue. Donec lobortis lacus ligula, et malesuada mi tincidunt eu.</p>
                        <Link to="/contact" className="contact-button">Contact Us</Link>
                    </div>
                    <div className="image" >
                        <img src={editorImage} alt="Editing" />
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills-section">
                <div className="container">
                    <h2>Our Skills</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eleifend, tellus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                    <div className="skills">
                        <div className="skill">
                            <h4>Video Editing</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                        <div className="skill">
                            <h4>Videography</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                        <div className="skill">
                            <h4>Branding</h4>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '77%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="achievements-section">
                <div className="container">
                    <div className="achievement" data-aos="flip-up">
                        <h3>20+</h3>
                        <p>Years of Experience</p>
                    </div>
                    <div className="achievement" data-aos="flip-up">
                        <h3>1,000+</h3>
                        <p>Projects Done</p>
                    </div>
                    <div className="achievement" data-aos="flip-up">
                        <h3>300+</h3>
                        <p>Satisfied Clients</p>
                    </div>
                    <div className="achievement" data-aos="flip-up">
                        <h3>64</h3>
                        <p>Certified Awards</p>
                    </div>
                </div>
            </section>

            {/* Hire Us Section */}
            <section className="hire-us-section" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="overlay">
                    <h2>We Are Always Ready To Give The Haiti!</h2>
                    <Link to="/get-started" className="get-started-button">EXPLORE</Link>
                </div>
            </section>

            {/* MAP SECTION*/}

            <section className="map-section">
            <div className="container">
                <h2>Find Us on Google Maps</h2>
                <div className="map-container">
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.140580761341!2d-80.26170695555393!3d26.15955071824894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9079afc50c2b3%3A0x8c1e128cdcb968c9!2sChoublak%20Restaurant!5e0!3m2!1sen!2s!4v1723917819387!5m2!1sen!2s" width="600" height="450" style={{border:0}}
                     allowfullscreen="" loading="lazy" 
                     referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </section>

            {/* Footer Section */}
            <Footer />
        </div>
    );
}

export default AboutUs;
