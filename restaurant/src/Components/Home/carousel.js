import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../CSS/home.css'; // Make sure this file has your custom styles
import midfood from '../../background/midfood.jpg';
import bestseller from '../../background/bestseller.jpg';

const CarouselEx = () => {
  return (
    <Carousel
      fade
      style={{ height: "100%" }}
      nextIcon={<FaChevronRight style={{ color: 'white', fontSize: '2rem' }} />}
      prevIcon={<FaChevronLeft style={{ color: 'white', fontSize: '2rem' }} />}
    >
      <Carousel.Item>
        <img
          style={{ objectFit: "cover", maxHeight: "80vh" }}
          className="d-block w-100 h-50"
          src={midfood}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Premium Food!</h3>
          <p>Quality Is Our Passion.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ objectFit: "cover", maxHeight: "80vh" }}
          className="d-block w-100"
          src={bestseller}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>The Best In Town</h3>
          <p>With over 35 years Of Experience</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ objectFit: "cover", maxHeight: "80vh" }}
          className="d-block w-100"
          src={bestseller}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Skilled</h3>
          <p>Example Text.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselEx;
