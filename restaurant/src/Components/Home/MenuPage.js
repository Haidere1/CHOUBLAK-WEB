import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Backend/Firebase/config';
import CarouselEx from './carousel';
import CollapsibleExample from './tabbar';
import Footer from './footer.js'
import ProductModal from "../Products/viewproduct.js";
import '../../CSS/menupage.css';
import beverages from './icons/drinks.png'
import main from './icons/main.png'
import side from './icons/sides.png'


const IconStrip = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background-color: #BDF6FE;
`;

const IconWrapper = styled.div`
  position: relative;
  margin: 0 20px;
  cursor: pointer;

  &:hover span {
    opacity: 1;
  }
`;

const IconImage = styled.img`
  width: 50px;
  height: 50px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const IconText = styled.span`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9em;
  opacity: 0;
  transition: opacity 0.3s ease;
`;
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
  color: #333;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const MenuCard = styled.div`
  position: relative;
  width: 280px;
  height: 380px;
  border-radius: 30px;
  overflow: hidden;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 20px;
    border:1px solid rgba(255, 255, 255, 0.801);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 280px;
  }

  @media (max-width: 480px) {
    width: 280px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
    height:150px;
  }
`;

const ProductImage = styled.img`
  width:90%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1.4em;
  color: #333;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 1em;
  margin-bottom: 20px;
  height: 50px;
  overflow: hidden;
`;

const AddButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: red;
  border: none;
  color: white;
  font-size: 1.5em;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: green;
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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainMenu>
      <CollapsibleExample />
      <CarouselEx />
      
      <IconStrip>
        <IconWrapper onClick={() => scrollToSection('mains-section')} data-aos="flip-up">
          <IconImage src={main} alt="Mains Icon" />
          <IconText>Mains</IconText>
        </IconWrapper>
        <IconWrapper onClick={() => scrollToSection('sides-section')} data-aos="flip-up">
          <IconImage src={side} alt="Sides Icon" />
          <IconText>Sides</IconText>
        </IconWrapper>
        <IconWrapper onClick={() => scrollToSection('beverages-section')} data-aos="flip-up">
          <IconImage src={beverages} alt="Beverages Icon"/>
          <IconText>Beverages</IconText>
        </IconWrapper>
      </IconStrip>

      <MenuSection id="mains-section">
        <SectionTitle>Mains</SectionTitle>
        <MenuContainer>
          {mains.map((item, index) => (
            <MenuCard key={index}>
              <ImageContainer>
                <ProductImage src={item.ProductImg} alt={item.ProductName} />
              </ImageContainer>
              <ProductTitle>{item.ProductName}</ProductTitle>
              <ProductDescription>{item.ProductDescription}</ProductDescription>
              <AddButton onClick={() => handleExploreClick(item)}>+</AddButton>
            </MenuCard>
          ))}
        </MenuContainer>

        <SectionTitle style={{ paddingTop: '20px' }}>Sides</SectionTitle>
        <MenuContainer id="sides-section">
          {sides.map((item, index) => (
            <MenuCard key={index}>
              <ImageContainer>
                <ProductImage src={item.ProductImg} alt={item.ProductName} />
              </ImageContainer>
              <ProductTitle>{item.ProductName}</ProductTitle>
              <ProductDescription>{item.ProductDescription}</ProductDescription>
              <AddButton onClick={() => handleExploreClick(item)}>+</AddButton>
            </MenuCard>
          ))}
        </MenuContainer>
      </MenuSection>

      <ProductModal item={selectedItem} onClose={handleCloseModal} />
      <Footer />
    </MainMenu>
  );
}

export default BasicExample;
