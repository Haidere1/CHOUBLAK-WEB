import '../../CSS/AboutUs/aboutus.css'
import about1 from './about1.jpg'
import about2 from './choublak1.jpg'
import about3 from './choublak2.jpg'
import about4 from './choublak3.jpg'
import about5 from './choublak4.jpg'
// import GoogleMapReact from 'google-map-react';
import bgmain from '../../background/haiti.jpg'
import {Link} from 'react-router-dom';
import Footer from '../Home/footer.js';
import { useEffect } from 'react';
import CollapsibleExample from '../Home/tabbar';
const AboutUs=()=>{

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);


    return(
            <div className="about_main"style={{backgroundColor:"#FFCB04"}}>
               <CollapsibleExample/>
                <div className="about_1" style={{backgroundImage:`url(${about1})`}}>

                <h1>Our Flavors</h1>
                <h3>Where Taste Meets Adventure - Prepare Your Palate for a Culinary Rollercoaster!</h3>
                <Link to='/menu'><button> Try Out!</button></Link>
                </div>
                <div className="Info_section" style={{backgroundImage:`url()`}}>
{/* first portion */}
                    <div className='is_1'>

                    <div className='is_1_1 glass' data-aos="fade-right">
                       <h3>Customer Reviews:</h3>
                       <blockquote style={{ margin: '10px 0' }}>
        1- "I love the ambiance at Choublak. It's my go-to place for family dinners. The service is exceptional every time." – Michael K.
      </blockquote>
      <blockquote style={{ margin: '10px 0' }}>
        2- "I love the ambiance at Choublak. It's my go-to place for family dinners. The service is exceptional every time." – Michael K.
      </blockquote>
      <blockquote style={{ margin: '10px 0' }}>
        3- "I love the ambiance at Choublak. It's my go-to place for family dinners. The service is exceptional every time." – Michael K.
      </blockquote>
      <blockquote style={{ margin: '10px 0' }}>
        4- "I love the ambiance at Choublak. It's my go-to place for family dinners. The service is exceptional every time." – Michael K.
      </blockquote>
      
                    </div>
        
                    <div className='is_1_2'>
                    <img src={about2} alt='' data-aos="flip-left"/>
                    <img src={about3} alt='' data-aos="flip-left"/>
                    <img src={about4} alt='' data-aos="flip-left"/>
                    <img src={about5} alt='' data-aos="flip-left"/>
                    </div>
            
            </div>

{/* second portion */}
                    <div className='is_2'>
                    <div className='is_2_1'>
                    <h3>Curious Minds Want to Know </h3>
                    <div className='ad_info'data-aos="zoom-in-up">
                      <h4>Whats on the menu?</h4>
                      <p>Our menu is a culinary masterpiece crafted by Chef Gustavo, featuring a fusion of flavors from around the world.</p> 
                    </div>
                    <div className='ad_info'data-aos="zoom-in-up">
                      <h4>Do You Take Reservations?</h4>
                      <p>Reservations? Who needs those when you can walk in and be greeted like royalty!</p> 
                    </div>
                    <div className='ad_info'data-aos="zoom-in-up">
                      <h4>Any Vegan Options?</h4>
                      <p>We've got vegan delights that will make even the most dedicated carnivore drool with envy.</p> 
                    </div>
                    </div>
                   
                    </div>
                    
                    <div className='res_map'>
                      <div className='feedback'>
                        <h3>Leave a Review</h3>
                        <h4>email</h4>
                        <input type='email'></input>
                        <h4>message</h4>
                        <textarea
                        required
                        rows="4">
                        </textarea>
                        <button> Submit</button>
                      </div>
                    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d895.2849749433972!2d-80.2570061!3d26.1595729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9079afc50c2b3%3A0x8c1e128cdcb968c9!2sChoublak%20Restaurant!5e0!3m2!1sen!2s!4v1718978993604!5m2!1sen!2s" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    
                
                </div>
      <Footer/>
            </div>
        );
    }
export default AboutUs;