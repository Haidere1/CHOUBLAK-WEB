import '../../CSS/AboutUs/aboutus.css'
import about1 from './about1.jpg'
import about2 from './aboutbg.jpg'
import GoogleMapReact from 'google-map-react';
import {Link} from 'react-router-dom'
const AboutUs=()=>{




    return(
            <div className="about_main">
                <div className="about_1" style={{backgroundImage:`url(${about1})`}}>

                <h1>Our Flavors</h1>
                <h3>Where Taste Meets Adventure - Prepare Your Palate for a Culinary Rollercoaster!</h3>
                <Link to='/menu'><button> Try Out!</button></Link>
                </div>
                <div className="Info_section" style={{backgroundImage:`url(${about2})`}}>
{/* first portion */}
                    <div className='is_1'>

                    <div className='is_1_1'>
                       <h3>I will be the content</h3>
                        <p>I am dummy text you can generate text like you want</p>
                    </div>
        
                    <div className='is_1_2'>
                    <img src={about1} alt=''/>
                    <img src={about1} alt=''/>
                    <img src={about1} alt=''/>
                    <img src={about1} alt=''/>
                    </div>
            
            </div>

{/* second portion */}
                    <div className='is_2'>
                    <div className='is_2_1'>
                    <h3>Curious Minds Want to Know </h3>
                    <div className='ad_info'>
                      <h4>Whats on the menu?</h4>
                      <p>Our menu is a culinary masterpiece crafted by Chef Gustavo, featuring a fusion of flavors from around the world.</p> 
                    </div>
                    <div className='ad_info'>
                      <h4>Do You Take Reservations?</h4>
                      <p>Reservations? Who needs those when you can walk in and be greeted like royalty!</p> 
                    </div>
                    <div className='ad_info'>
                      <h4>Any Vegan Options?</h4>
                      <p>We've got vegan delights that will make even the most dedicated carnivore drool with envy.</p> 
                    </div>
                    </div>
                   
                    </div>
                    <div className='res_map'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d895.2849749433972!2d-80.2570061!3d26.1595729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9079afc50c2b3%3A0x8c1e128cdcb968c9!2sChoublak%20Restaurant!5e0!3m2!1sen!2s!4v1718978993604!5m2!1sen!2s" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                
                </div>

            </div>
        );
    }
export default AboutUs;