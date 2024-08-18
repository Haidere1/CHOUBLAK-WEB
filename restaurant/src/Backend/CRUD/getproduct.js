import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/config.js'; 
import React, { useEffect, useState } from 'react';

export default function GetProduct() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items: ", error);
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <div>
      <h1>Menu Items</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h2>{item.PrductName}</h2>
            <p>{item.ProductDescription}</p>
            <p>{item.ProductPrice}</p>
            {item.ProductImg && <img src={item.ProductImg} alt={item.PrductName} style={{ width: '100px', height: '100px' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
