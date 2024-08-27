import React, { useState, useEffect } from 'react';
import { db } from '../../Backend/Firebase/config.js'; // Adjust the path as needed
import { collection, addDoc } from 'firebase/firestore';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CollapsibleExample from '../Home/tabbar.js';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './cart2.css';
import Footer from '../Home/footer.js';

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
    console.log(verifiedOtp);   
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
    <section className="cart-section">
      <CollapsibleExample />
      <div className="container py-5">
        <h2 className="text-center mb-4">Your Cart</h2>
        <div className="row">
          <div className="col-lg-8">
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img src={item.img} className="img-fluid" alt={item.name} />
                  <div className="cart-item-details">
                    <h5><b>Name: {item.name}</b></h5>
                    <small className="text-muted"><b>Description:</b> {item.description}</small>
                    
                    <small className="text-muted"><b>Option:</b> {item.option}</small>
                    <div className="quantity-controls">
                      <button className="btn btn-light" onClick={() => handleQuantityChange(index, item.quantity - 1)}>
                        <FaMinus />
                      </button>
                      <input
                        className="form-control bg-light"
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                      />
                      <button className="btn btn-light" onClick={() => handleQuantityChange(index, item.quantity + 1)}>
                        <FaPlus />
                      </button>
                    </div>
                    <p className="mt-2">Price: ${item.price}</p>
                    <button className="btn btn-danger  " onClick={() => handleRemoveItem(index)}>
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
        {showEmptyCartError && (
          <div className="alert alert-danger text-center" role="alert">
            Your cart is empty!
          </div>
        )}
      </div>
      </div>
      </div>
      </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="haiti-modal">
  <Modal.Header closeButton>
    <Modal.Title>Confirm Order</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        value={userDetails.name}
        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>Address</label>
      <input
        type="text"
        className="form-control"
        value={userDetails.address}
        onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
      />
    </div>
    <div className="form-group">
      <label>Phone</label>
      <div className="phone-input-container">
        <PhoneInput
          international
          country="US"
          value={userDetails.phone}
          onChange={(phone) => setUserDetails({ ...userDetails, phone })}
          className="form-control"
        />
      </div>
    </div>
    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        className="form-control"
        value={userDetails.email}
        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
      />
    </div>
    {otpSent && (
      <div className="form-group">
        <label>OTP</label>
        <input
          type="text"
          className="form-control"
          value={userDetails.otp}
          onChange={(e) => setUserDetails({ ...userDetails, otp: e.target.value })}
        />
      </div>
    )}
    {errorMessage && (
      <div className="alert alert-danger mt-2">{errorMessage}</div>
    )}
  </Modal.Body>
  <Modal.Footer>
    {!otpSent && (
      <Button variant="primary" onClick={sendOtp}>
        Send OTP
      </Button>
    )}
    {otpSent && (
      <Button variant="success" onClick={handleOtpVerification}>
        Verify OTP and Place Order
      </Button>
    )}
  </Modal.Footer>
</Modal>

      <Footer/>
    </section>
  );
}
