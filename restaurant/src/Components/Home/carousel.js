

import '../../CSS/home.css'
import midfood from '../../background/midfood.jpg'
import Carousel from 'react-bootstrap/Carousel';
import bestseller from '../../background/bestseller.jpg'




const CarouselEx=()=>

    {
      
        return(
          
          <Carousel fade style={{height:"100%"}}>
          <Carousel.Item>
            <img style={{objectFit:"cover", maxHeight:"80vh",  }}
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
            <img style={{objectFit:"cover", maxHeight:"80vh", }}
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
            <img style={{objectFit:"cover", maxHeight:"80vh", }}
              className="d-block w-100"
              src={bestseller}
              alt="Third slide"
            />
    
            <Carousel.Caption>
              <h3>Skilled</h3>
              <p>
               Example Text.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      
        );
    }

export default CarouselEx;
