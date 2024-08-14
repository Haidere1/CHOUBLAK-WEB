import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Backend/Firebase/config';
import CarouselEx from './carousel';
import CollapsibleExample from './tabbar';
import Footer from './footer.js';
import ProductModal from "../Products/viewproduct.js";
import '../../CSS/menupage.css';

const MainMenu = styled.div`
  font-family: 'Jovelyn Blur Demo';
  background-color:#BDF6FE;
`;

const MenuSection = styled.div`
  text-align: center;
  padding: 20px;
`;

const SectionTitle = styled.h1`
  margin-bottom: 20px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const ProductCard = styled.div`
  width: 18rem;
  height: 60vh;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    width: 18rem;
    height: 60%;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    width: 18rem;
    height: 50%;
    border-radius: 15px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  border-radius: 30px 30px 0 0;
`;

const ProductInfo = styled.div`
  padding: 10px;
  text-align: center;
`;

const ProductTitle = styled.h2`
  font-size: 1.2em;
  margin: 10px 0;
  color: green;
`;

const ProductDescription = styled.p`
  font-size: 0.9em;
  color: #777;
  height: 40%;
  overflow: hidden;
`;

const ProductPrice = styled.p`
  font-size: 1.25em;
  color: #e91e63;
`;

const ExploreButton = styled.button`
  background-color: #e91e63;
  color: white;
  font-size: 1em;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d81b60;
  }
`;

function BasicExample() {
  const [mains, setMains] = useState([]);
  const [sides, setSides] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'Products'));
      const mainsArray = [];
      const sidesArray = [];

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        if (product.Category === 'Mains') {
          mainsArray.push({ id: doc.id, ...product });
        } else if (product.Category === 'Sides') {
          sidesArray.push({ id: doc.id, ...product });
        }
      });

      setMains(mainsArray);
      setSides(sidesArray);
    };

    fetchProducts();
  }, []);

  const handleExploreClick = (item) => {
   setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <MainMenu>
      <CollapsibleExample />
      <CarouselEx />

      <MenuSection>
        <SectionTitle>Mains</SectionTitle>
        <MenuContainer>
          {mains.map((item, index) => (
            <ProductCard key={index}>
              <ProductImage src={item.ProductImg} alt={item.ProductName} />
              <ProductInfo>
                <ProductTitle>{item.ProductName}</ProductTitle>
                <ProductDescription>{item.ProductDescription}</ProductDescription>
                <ProductPrice>{`$${item.ProductPrice}`}</ProductPrice>
                <ExploreButton onClick={() => handleExploreClick(item)}>Explore</ExploreButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </MenuContainer>

        <SectionTitle style={{ paddingTop: '20px' }}>Sides</SectionTitle>
        <MenuContainer>
          {sides.map((item, index) => (
            <ProductCard key={index}>
              <ProductImage src={item.ProductImg} alt={item.ProductName} />
              <ProductInfo>
                <ProductTitle>{item.ProductName}</ProductTitle>
                <ProductDescription>{item.ProductDescription}</ProductDescription>
                <ProductPrice>{`$${item.ProductPrice}`}</ProductPrice>
                <ExploreButton onClick={() => handleExploreClick(item)}>Explore</ExploreButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </MenuContainer>
      </MenuSection>

      <ProductModal item={selectedItem} onClose={handleCloseModal} />
      <Footer />
    </MainMenu>
  );
}

export default BasicExample;
