import React, { memo } from 'react';

import '../../CSS/home.css';
import firstfood from '../../background/choublakmain.jpg';
import secfood from '../../background/no1haiti.jpeg';
import midfood from '../../background/midfood.jpg';
import show1 from '../../background/haitifood1.jpeg';
import CarouselEx from "./carousel.js";
import Footer from './footer.js';
import AboutSection from '../about.js';
import MenuSection from '../menu/menu.js';
import { Link } from 'react-router-dom';
import CollapsibleExample from './tabbar.js';
import { useEffect } from 'react';


// Lazy load images for better performance


const Home = () => {
    const LazyImage = memo(({ src, alt }) => (
        <img loading="lazy" src={src} alt={alt} />
    ));
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    const menuItems = [
        {
          name: 'House Antipasti',
          description: 'This is an item on your menu. Give your item a brief description',
          price: 9.00,
        },
        {
          name: 'Fresh Arugula',
          description: 'This is an item on your menu. Give your item a brief description',
          price: 9.00,
        },
        {
          name: 'Caprese',
          description: 'This is an item on your menu. Give your item a brief description',
          price: 9.00,
        },
        
        
      ];
    return (
        <div className="maindiv" >
            
        <CollapsibleExample/>
            <div className="firstsection">
                <div className="section" data-aos='fade-right'>
                    <LazyImage src={firstfood} alt="First Food" />
                </div>
                <div className="section" data-aos="fade-left">
                    <h1>Choublak Restaurant</h1>
                    <h2>Choublak Restaurant is about fun, colorful, exciting foods derived from Haiti. Come have your tastebuds travel</h2>
                </div>
            </div>

            <div className="midsection">
                <div className="ms1" style={{ backgroundImage: `url(${midfood})` }}>
                    <h2>MYRIAM BEAULIEU</h2>
                    <p>
                        I'm a paragraph. Click here to add your own text and edit me. It’s easy.
                        Just click “Edit Text” or double click me to add your own content and make changes to the font.
                        I’m a great place for you to tell a story and let your users know  you.
                    </p>
                    <button><Link to='/menu' style={{color:"white"}}>Menu</Link></button>
                </div>
                <div className="ms" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
                    <LazyImage src={secfood} alt="Second Food" />
                </div>
            </div>

            <div className="mainnews" style={{ backgroundImage: `url(${show1})` }}>
                <div>
                    <h1>50% Off On All New Winter Products</h1>
                    <h2>Check Out New Stuff</h2>
                    <button>Go Now</button>
                </div>
            </div>
            <AboutSection/>
            <div className='am_container'>
                <div className='am_c_1'  >
                 <MenuSection
                 title="Menu"
                 description="This will hold the menu"
                 items={menuItems}/>
                 
                </div>
            <div className='carouseldiv'>
            <CarouselEx/>
            </div>
            </div>
            <div className="end_section">
            
            </div>
            <Footer/>
        </div>
    );
};

// Use React.memo to prevent unnecessary re-renders
export default Home;
