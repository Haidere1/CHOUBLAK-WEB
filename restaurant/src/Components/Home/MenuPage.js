import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Backend/Firebase/config';
import CollapsibleExample from './tabbar';
import Footer from './footer.js';
import ProductModal from '../Products/viewproduct.js';
import haitibg from '../../background/haitibg.webp';
import '../../CSS/menupage.css';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageShell = styled.div`
  background: #f0f8ff;
  min-height: 100vh;
`;

/* ─── Hero ─── */
const HeroBanner = styled.div`
  position: relative;
  height: 48vh;
  min-height: 320px;
  background-image: url(${haitibg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(2, 48, 71, 0.45) 0%,
      rgba(2, 48, 71, 0.82) 100%
    );
  }

  @media (max-width: 768px) {
    background-attachment: scroll;
    height: 38vh;
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const HeroLabel = styled.p`
  font-size: 0.72rem;
  letter-spacing: 7px;
  text-transform: uppercase;
  color: #48cae4;
  margin-bottom: 10px;
  font-weight: 700;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 14px;
  letter-spacing: -0.5px;
`;

const HeroWave = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 2;

  svg { display: block; width: 100%; height: 70px; }
`;

/* ─── Category pills ─── */
const CategoryBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 32px 20px 24px;
  background: #f0f8ff;
`;

const Pill = styled.button`
  background: ${p => p.$active ? '#0096c7' : '#ffffff'};
  color: ${p => p.$active ? '#ffffff' : '#023047'};
  border: 2px solid ${p => p.$active ? '#0096c7' : 'rgba(0,150,199,0.25)'};
  border-radius: 50px;
  padding: 10px 28px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${p => p.$active ? '0 4px 16px rgba(0,150,199,0.3)' : 'none'};

  &:hover {
    background: ${p => p.$active ? '#0096c7' : '#e8f7fd'};
    border-color: #0096c7;
    color: ${p => p.$active ? '#ffffff' : '#0096c7'};
  }
`;

/* ─── Section ─── */
const MenuSection = styled.section`
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px 40px 60px;

  @media (max-width: 768px) { padding: 16px 18px 50px; }
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;

  h2 {
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: #48cae4;
    margin: 0;
    white-space: nowrap;
  }

  span {
    flex: 1;
    height: 1px;
    background: rgba(72,202,228,0.25);
    display: block;
  }
`;

/* ─── Cards ─── */
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  border: 1.5px solid rgba(72,202,228,0.15);
  box-shadow: 0 4px 18px rgba(0,150,199,0.07);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  animation: ${fadeUp} 0.45s ease both;
  animation-delay: ${p => p.$delay || 0}ms;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 14px 36px rgba(0,150,199,0.16);
    border-color: rgba(72,202,228,0.55);
  }
`;

const CardImg = styled.div`
  height: 200px;
  overflow: hidden;
  background: #e0f2fa;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.55s ease;
  }

  ${Card}:hover img { transform: scale(1.06); }
`;

const CardBody = styled.div`
  padding: 18px 18px 16px;
`;

const CardName = styled.h3`
  font-size: 1.05rem;
  font-weight: 800;
  color: #023047;
  margin: 0 0 6px;
  line-height: 1.3;
`;

const CardDesc = styled.p`
  font-size: 0.82rem;
  color: #aaa;
  margin: 0 0 14px;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f0f8ff;
  padding-top: 12px;
`;

const Price = styled.span`
  font-size: 1.15rem;
  font-weight: 800;
  color: #f4845f;
`;

const AddBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f4845f;
  border: none;
  color: #ffffff;
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  flex-shrink: 0;

  &:hover {
    background: #e76f51;
    transform: scale(1.12);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(0,150,199,0.4);
  font-size: 0.88rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(72,202,228,0.12);
  max-width: 1200px;
  margin: 0 auto;
`;

function BasicExample() {
  const [mains, setMains] = useState([]);
  const [sides, setSides] = useState([]);
  const [activeTab, setActiveTab] = useState('mains');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'Products'));
      const mainsArr = [];
      const sidesArr = [];
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        if (product.Category === 'Mains') mainsArr.push({ id: doc.id, ...product });
        else if (product.Category === 'Sides') sidesArr.push({ id: doc.id, ...product });
      });
      setMains(mainsArr);
      setSides(sidesArr);
    };
    fetchProducts();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTab = (tab) => {
    setActiveTab(tab);
    scrollTo(`${tab}-section`);
  };

  const renderCards = (items) =>
    items.length === 0 ? (
      <EmptyState>No items yet — check back soon 🌊</EmptyState>
    ) : (
      <CardsGrid>
        {items.map((item, i) => (
          <Card key={item.id} $delay={i * 50} onClick={() => setSelectedItem(item)}>
            <CardImg>
              <img src={item.ProductImg} alt={item.ProductName} />
            </CardImg>
            <CardBody>
              <CardName>{item.ProductName}</CardName>
              <CardDesc>{item.ProductDescription}</CardDesc>
              <CardFooter>
                <Price>${Number(item.ProductPrice).toFixed(2)}</Price>
                <AddBtn
                  onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                  aria-label={`Add ${item.ProductName}`}
                >
                  +
                </AddBtn>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
      </CardsGrid>
    );

  return (
    <PageShell>
      <CollapsibleExample />

      <HeroBanner>
        <HeroInner>
          <HeroLabel>Choublak Restaurant</HeroLabel>
          <HeroTitle>Our Menu</HeroTitle>
        </HeroInner>
        <HeroWave>
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,35 C360,70 720,0 1080,35 C1260,52 1380,22 1440,35 L1440,70 L0,70 Z" fill="#f0f8ff" />
          </svg>
        </HeroWave>
      </HeroBanner>

      <CategoryBar>
        <Pill $active={activeTab === 'mains'} onClick={() => handleTab('mains')}>🍽 Mains</Pill>
        <Pill $active={activeTab === 'sides'} onClick={() => handleTab('sides')}>🥗 Sides</Pill>
      </CategoryBar>

      <MenuSection id="mains-section">
        <SectionTitle><h2>Mains</h2><span /></SectionTitle>
        {renderCards(mains)}
      </MenuSection>

      <Divider />

      <MenuSection id="sides-section">
        <SectionTitle><h2>Sides</h2><span /></SectionTitle>
        {renderCards(sides)}
      </MenuSection>

      <ProductModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      <Footer />
    </PageShell>
  );
}

export default BasicExample;
