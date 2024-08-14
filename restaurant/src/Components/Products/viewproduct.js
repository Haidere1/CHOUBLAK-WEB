
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  color: green;
  font-size: 1.5em;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #e91e63;

  &:hover {
    color: #d81b60;
  }
`;

const ModalBody = styled.div`
  text-align: left;
`;

const ModalImage = styled.img`
  width: 80%;
  margin-left: 10%;
  border-radius: 10px;
`;

const ModalDescription = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
`;

const ModalPrice = styled.p`
  font-size: 1.25em;
  color: #e91e63;
  margin-bottom: 20px;
`;

const AddToCartButton = styled.button`
  background-color: #e91e63;
  color: white;
  font-size: 1em;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #d81b60;
  }
`;

const ProductModal = ({ item, onClose }) => {
  if (!item) return null;

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({
      name: item.ProductName,
      img: item.ProductImg,
      description: item.ProductDescription,
      price: item.ProductPrice,
      quantity: 1,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{item.ProductName}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <ModalImage src={item.ProductImg} alt={item.title} />
          <ModalDescription>{item.ProductDescription}</ModalDescription>
          <ModalPrice>{item.ProductPrice}</ModalPrice>
          <AddToCartButton onClick={addToCart}>Add to Cart</AddToCartButton>
        </ModalBody>
      </ModalContent>
    </ModalBackground>
  );
};

export default ProductModal;
