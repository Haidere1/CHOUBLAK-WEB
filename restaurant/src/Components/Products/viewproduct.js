import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Fade-in animation for the success message
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Fade-out animation for the success message
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

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
  background: linear-gradient(135deg, #BDF6FE, rgba(154, 225, 225, 0.311));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.801);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  padding: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
  position: relative;

  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #BDF6FE;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #BDF6FE transparent;
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

const ModalOptions = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
  font-size: 1em;
`;

const ModalOption = styled.li`
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  margin-bottom: 5px;
  padding: 10px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
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

const SuccessMessage = styled.div`
  background-color: #4caf50;
  color: white;
  position:absolute;
 top:80%;
 right:0%;
  padding: 10px;
  border-radius: 20px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out, ${fadeOut} 0.5s ease-in-out 3s;
  transition: opacity 0.5s ease-in-out;
`;

const ProductModal = ({ item, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error,setError]=useState('');

  if (!item) return null;

  const addToCart = () => {
    if (!selectedOption && item.Options != null) {
      alert('Please select an option');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemExists = cart.some(cartItem => cartItem.name === item.ProductName && cartItem.option === selectedOption);
    if (itemExists) {
      setError('Item already in the cart');
      setTimeout(() => {
        setError('');
      }, 1500);
    } else {
      cart.push({
        name: item.ProductName,
        img: item.ProductImg,
        description: item.ProductDescription,
        price: item.ProductPrice,
        option: selectedOption, // Store the selected option
        quantity: 1,
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      setSuccess(true);
      setError("Item Added!")
      setTimeout(() => {
        setSuccess(false);
      }, 1500); // Success message will disappear after 3.5 seconds
    }
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
          <ModalPrice>${item.ProductPrice}</ModalPrice>
          
          {item.Options && item.Options.length > 0 && (
            <>
              <h3>Options</h3>
              <ModalOptions>
                {item.Options.map((option, index) => (
                  <ModalOption key={index}>
                    <OptionLabel>
                      <input
                        type="radio"
                        name="productOption"
                        value={option}
                        onChange={() => setSelectedOption(option)}
                      />
                      {option}
                    </OptionLabel>
                  </ModalOption>
                ))}
              </ModalOptions>
            </>
          )}
          
          <AddToCartButton onClick={addToCart}>Add to Cart</AddToCartButton>
          { success  && (
            <SuccessMessage>
              {error}
            </SuccessMessage>
          )}
          { error === 'Item already in the cart' && (
            <SuccessMessage>
              {error}
            </SuccessMessage>
          )}
          </ModalBody>
      </ModalContent>
    </ModalBackground>
  );
};

export default ProductModal;
