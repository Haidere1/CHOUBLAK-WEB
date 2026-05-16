import React, { memo, useEffect } from 'react';
import '../../CSS/home.css';
import firstfood from '../../background/haitibg.webp';
import secfood from '../../background/no1haiti.jpeg';
import show1 from '../../background/haitifood1.jpeg';
import Footer from './footer.js';
import AboutSection from './about.js';
import { Link } from 'react-router-dom';
import CollapsibleExample from './tabbar.js';

const Home = () => {
    const LazyImage = memo(({ src, alt }) => (
        <img loading="lazy" src={src} alt={alt} />
    ));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const menuItems = [
        {
            name: 'Griot',
            description: 'Crispy fried pork shoulder marinated in citrus and Haitian spices',
            price: 14.00,
        },
        {
            name: 'Diri ak Djon Djon',
            description: 'Black mushroom rice — a true Haitian delicacy',
            price: 9.00,
        },
        {
            name: 'Pikliz',
            description: 'Spicy pickled vegetables, the soul of every Haitian table',
            price: 5.00,
        },
    ];

    return (
        <div className="maindiv">
            <CollapsibleExample />

            {/* HERO */}
            <section className="hero-section" style={{ backgroundImage: `url(${firstfood})` }}>
                <div className="hero-overlay">
                    <div className="hero-content" data-aos="fade-up" data-aos-duration="900">
                        <p className="hero-eyebrow">Haitian Cuisine</p>
                        <h1 className="hero-title">
                            Choublak<br /><span>Restaurant</span>
                        </h1>
                        <p className="hero-sub">
                            Fun, colorful, exciting foods from the shores of Haiti.<br />
                            Let your tastebuds travel the Caribbean.
                        </p>
                        <div className="hero-btns">
                            <Link to="/menu" className="btn-primary-beach">Explore Menu</Link>
                            <Link to="/aboutus" className="btn-outline-beach">Our Story</Link>
                        </div>
                    </div>
                </div>
                <div className="wave-bottom">
                    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,40 C240,90 480,0 720,45 C960,90 1200,20 1440,50 L1440,90 L0,90 Z" fill="#f0f8ff" />
                    </svg>
                </div>
            </section>

            {/* FEATURES */}
            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-card" data-aos="fade-up" data-aos-delay="0">
                        <span className="feature-icon">🌿</span>
                        <h3>Fresh Ingredients</h3>
                        <p>Sourced daily for the most vibrant Caribbean flavors on every plate.</p>
                    </div>
                    <div className="feature-card" data-aos="fade-up" data-aos-delay="120">
                        <span className="feature-icon">🍽️</span>
                        <h3>Authentic Recipes</h3>
                        <p>Traditional Haitian dishes passed down through generations of family.</p>
                    </div>
                    <div className="feature-card" data-aos="fade-up" data-aos-delay="240">
                        <span className="feature-icon">🌊</span>
                        <h3>Caribbean Soul</h3>
                        <p>Every dish tells a story straight from the shores of Haiti.</p>
                    </div>
                </div>
            </section>

            {/* WHO WE ARE — pours into promo via wave */}
            <section className="story-section">
                <div className="story-image">
                    <LazyImage src={secfood} alt="Haitian Food" />
                </div>
                <div className="story-text" data-aos="fade-left" data-aos-duration="900">
                    <div className="story-rule" />
                    <p className="story-eyebrow">Who We Are</p>
                    <h2>A Taste of <span>Haiti</span><br />on Every Plate</h2>
                    <p>
                        Myriam Beaulieu opened Choublak to bring the warmth, color,
                        and bold flavor of Haitian culture to your table. From the beaches
                        of Port-au-Prince to your neighborhood — every bite is a journey.
                    </p>
                    <Link to="/aboutus" className="btn-coral-outline">Discover Our Story</Link>
                </div>

                {/* Wave pours story into promo */}
                <div className="flow-wave flow-wave--promo">
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,50 C180,100 420,0 660,55 C900,100 1180,15 1440,55 L1440,100 L0,100 Z"
                            fill="rgba(0,150,199,0.18)" />
                        <path d="M0,65 C220,20 500,90 720,50 C940,10 1200,80 1440,65 L1440,100 L0,100 Z"
                            fill="rgba(2,48,71,0.35)" />
                        <path d="M0,80 C300,40 600,100 900,70 C1100,50 1300,85 1440,80 L1440,100 L0,100 Z"
                            fill="#0096c7" opacity="0.6" />
                    </svg>
                </div>
            </section>

            {/* PROMO BANNER — flows into featured via wave */}
            <section className="promo-section" style={{ backgroundImage: `url(${show1})` }}>
                <div className="promo-overlay">
                    <div className="promo-content" data-aos="zoom-in" data-aos-duration="700">
                        <p className="promo-eyebrow">Limited Time Offer</p>
                        <h2>50% Off Winter Specials</h2>
                        <p>Discover our newest seasonal dishes — bold, fresh, Caribbean.</p>
                        <Link to="/menu" className="btn-primary-beach">Order Now</Link>
                    </div>
                </div>

                {/* Multi-layer wave washes into the white featured section */}
                <div className="flow-wave flow-wave--white">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,30 1440,60 L1440,120 L0,120 Z"
                            fill="rgba(255,255,255,0.25)" />
                        <path d="M0,40 C200,90 500,10 720,50 C940,90 1200,20 1440,55 L1440,120 L0,120 Z"
                            fill="rgba(255,255,255,0.5)" />
                        <path d="M0,70 C300,110 600,30 900,65 C1100,95 1300,50 1440,70 L1440,120 L0,120 Z"
                            fill="#ffffff" />
                    </svg>
                </div>
            </section>

            {/* OUR FAVORITES — wave at bottom flows into Taste the Caribbean */}
            <section className="featured-section">
                <div className="featured-inner">
                    <span className="featured-label">Signature Dishes</span>
                    <h2 className="featured-title">Our Favorites</h2>
                    <p className="featured-subtitle">A taste of what awaits you</p>

                    <div className="featured-ornament">
                        <div className="featured-ornament-line" />
                        <div className="featured-ornament-diamond" />
                        <div className="featured-ornament-line" />
                    </div>

                    {menuItems.map((item, i) => (
                        <div className="dish-row" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
                            <div className="dish-info">
                                <span className="dish-name">{item.name}</span>
                                <span className="dish-desc">{item.description}</span>
                            </div>
                            <div className="dish-dots" />
                            <span className="dish-price">${item.price.toFixed(2)}</span>
                        </div>
                    ))}

                    <div className="featured-cta">
                        <span className="featured-cta-note">More awaits you</span>
                        <Link to="/menu" className="btn-ocean-outline">View Full Menu</Link>
                    </div>
                </div>

                {/* wave pours featured into Taste the Caribbean */}
                <div className="flow-wave flow-wave--ocean-deep">
                    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,50 C180,100 420,0 660,55 C900,100 1180,15 1440,55 L1440,100 L0,100 Z"
                            fill="rgba(2,48,71,0.18)" />
                        <path d="M0,65 C240,20 520,90 760,50 C1000,10 1240,75 1440,65 L1440,100 L0,100 Z"
                            fill="rgba(2,48,71,0.45)" />
                        <path d="M0,78 C280,40 580,100 860,70 C1080,50 1300,88 1440,78 L1440,100 L0,100 Z"
                            fill="#023047" />
                    </svg>
                </div>
            </section>

            <AboutSection />
            <Footer />
        </div>
    );
};

export default Home;
