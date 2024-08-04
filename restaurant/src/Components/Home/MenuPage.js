import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import show1 from '../../background/haitishow1.jpeg';
import show2 from '../../background/haitishow2.jpeg';
import show3 from '../../background/haitishow3.jpeg';
import show4 from '../../background/haitishow4.jpeg';
import show5 from '../../background/haitishow5.jpeg';
import CarouselEx from './carousel';
import mbg from '../../background/haiti.jpg';
import CollapsibleExample from './tabbar';
import Footer from './footer.js';
import ProductModal from "../Products/viewproduct.js"
import '../../CSS/menupage.css';

const MainMenu = styled.div`
  font-family: 'Jovelyn Blur Demo';
  background-color:#FFCB04;
  background-image: url(${props => props.bgImage});
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
  color:green;
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [menuItems] = useState([
    {
      image: show2,
      price: '$22.99',
      title: 'Griyo Konplè (Fried pork)',
      description: 'Fried pork. (Served with option 1, 2 or 3)'
    },
    {
      image: show1,
      price: '$15',
      title: 'Makaroni O Graten',
      description: '#3 most liked, Delicate Master Piece'
    },
    {
      image: show3,
      price: '$20',
      title: 'Pwason gwo sel (stew fish) ',
      description: 'Stew fish (Served with option 1, 2 or 3)'
    },
    {
      image: show4,
      price: '$20',
      title: 'Pwason fri (fried fish) ',
      description: 'Fried fish (Served with option 1, 2 or 3)'
    },
    {
      image: show5,
      price: '$20',
      title: 'Diri Blan/sòs pwa (White rice & bean sauce )',
      description: ''
    },
    {
      image: show1,
      price: '$20',
      title: 'Item 3',
      description: 'This is the description for item 3.'
    },
    {
      image: show1,
      price: '$20',
      title: 'Item 3',
      description: 'This is the description for item 3.'
    },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleExploreClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <MainMenu >
      <CollapsibleExample />
      <CarouselEx />
      <MenuSection>
        <SectionTitle>Starters</SectionTitle>
        <MenuContainer>
          {menuItems.map((item, index) => (
            <ProductCard key={index}>
              <ProductImage src={item.image} alt={item.title} />
              <ProductInfo>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductDescription>{item.description}</ProductDescription>
                <ProductPrice>{item.price}</ProductPrice>
                <ExploreButton onClick={() => handleExploreClick(item)}>Explore</ExploreButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </MenuContainer>
        <SectionTitle style={{paddingTop: '20px'}}>Mains</SectionTitle>
        <MenuContainer>
          {menuItems.map((item, index) => (
            <ProductCard key={index}>
              <ProductImage src={item.image} alt={item.title} />
              <ProductInfo>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductDescription>{item.description}</ProductDescription>
                <ProductPrice>{item.price}</ProductPrice>
                <ExploreButton onClick={() => handleExploreClick(item)}>Explore</ExploreButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </MenuContainer>
      </MenuSection>
      <Footer />
      <ProductModal item={selectedItem} onClose={handleCloseModal} />
    </MainMenu>
  );
}

export default BasicExample;
