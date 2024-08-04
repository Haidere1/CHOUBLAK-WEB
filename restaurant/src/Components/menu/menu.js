import React from 'react';
import './menu.css';
// import bgmain from '../../background/menu3.jpg'
// import CollapsibleExample from '../Home/tabbar';
// import Footer from '../Home/footer';
const MenuSection = ({ title, description, items }) => {
    return (
      <div className="menu-section"  >
        
        
        <div className="menu-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="menu-items-container">
          <ul className="menu-items">
            {items.map((item, index) => (
              <li key={index} className="menu-item">
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="item-price">${item.price.toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <button style={{marginTop:"10%",color:"white"}}>MENU</button>
        </div>
        
      </div>
    );
  };
  
  export default MenuSection;