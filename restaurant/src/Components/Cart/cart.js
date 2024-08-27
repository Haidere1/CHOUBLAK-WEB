import React, { useState, useEffect } from 'react';
import { db } from '../../Backend/Firebase/config.js'; // Adjust the path as needed
import { collection, addDoc } from 'firebase/firestore';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CollapsibleExample from '../Home/tabbar.js';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './cart.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    otp: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [showEmptyCartError, setShowEmptyCartError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    calculateTotalPrice(storedCartItems);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(2));
  };

  const handleQuantityChange = (index, quantity) => {
    if (quantity >= 1) {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity = quantity;
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      alert("Quantity cannot be negative");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'))
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      setShowEmptyCartError(true);
      return;
    }
    setShowEmptyCartError(false);
    setShowModal(true);
  };

  const sendOtp = () => {
    setOtpSent(true);
  };

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);

  const validatePhoneNumber = (phone) => /^\+?[1-9]\d{1,14}$/.test(phone);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateAddress = (address) => address.trim() !== '';

  const handleOtpVerification = async () => {
    const { name, address, phone, email, otp } = userDetails;

    if (!validateName(name)) {
      setErrorMessage("Please enter a valid name (letters and spaces only).");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!validateAddress(address)) {
      setErrorMessage("Please enter a valid address.");
      return;
    }

    if (otp !== "1234") {
      setErrorMessage("Invalid OTP.");
      return;
    }

    setVerifiedOtp(true);
    setErrorMessage('');

    const orderData = {
      items: cartItems,
      total: totalPrice,
      userDetails,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      setCartItems([]);
      localStorage.removeItem('cart');
      setShowModal(false);
      alert("Order placed successfully!");
      window.dispatchEvent(new Event('cartUpdated'));
      setTotalPrice(null);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
<section className="cart-section" style={{ backgroundColor: "#BDF6FE", minHeight: "100vh" ,fontFamily: 'Jovelyn Blur Demo',}}>
      <CollapsibleExample />
      <div className="container py-5">
        <h2 className="text-center mb-4">Your Cart</h2>
        <div className="row">
          <div className="col-lg-8">
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div className="cart-item d-flex justify-content-between align-items-center mb-3" key={index}>
                  <div className="d-flex align-items-center">
                    <img src={item.img} className="img-fluid" alt={item.name} style={{ width: '80px' }} />
                    <div className="ms-3">
                      <h5 className="text-dark mb-1">{item.name}</h5>
                      <small className="text-muted">{item.description}</small>
                      <small className="text-muted">{item.description}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="text-muted">${item.price}</span>
                    <div className="quantity-controls ms-3 d-flex align-items-center">
                      <button className="btn btn-light" onClick={() => handleQuantityChange(index, item.quantity - 1)}>
                        <FaMinus />
                      </button>
                      <input
                        className="form-control text-center"
                        style={{ width: '50px', margin: '0 10px' }}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                      />
                      <button className="btn btn-light" onClick={() => handleQuantityChange(index, item.quantity + 1)}>
                        <FaPlus />
                      </button>
                    </div>
                    <span className="text-muted ms-3">${(item.price * item.quantity).toFixed(2)}</span>
                    <button className="btn btn-danger ms-3" onClick={() => handleRemoveItem(index)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>${totalPrice}</strong>
                </div>
                <button className="btn btn-primary w-100 mt-3" onClick={handlePlaceOrder}>
                  Checkout
                </button>
                {showEmptyCartError &&(
        <div className="alert alert-danger mt-2" role="alert">
          Your cart is empty!
        </div>
      )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Name"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            className="form-control mb-3"
          />
          <PhoneInput
            placeholder="Phone number"
            value={userDetails.phone}
            onChange={(value) => setUserDetails({ ...userDetails, phone: value })}
            className="form-control mb-3"
          />
          <input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="Address"
            value={userDetails.address}
            onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
            className="form-control mb-3"
          />
          {otpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={userDetails.otp}
              onChange={(e) => setUserDetails({ ...userDetails, otp: e.target.value })}
              className="form-control mb-3"
            />
          )}
          {!otpSent && (
            <button className="btn btn-secondary w-100" onClick={sendOtp}>
              Send OTP
            </button>
          )}
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOtpVerification} disabled={!otpSent}>
            {verifiedOtp ? 'Place Order' : 'Verify OTP'}
          </Button>
        </Modal.Footer>
      </Modal>
     
    </section>
  );
}
