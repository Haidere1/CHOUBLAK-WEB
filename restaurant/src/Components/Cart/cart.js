import React, { useState, useEffect } from 'react';
import { db } from '../../Backend/Firebase/config.js'; // Adjust the path as needed
import { collection, addDoc } from 'firebase/firestore';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CollapsibleExample from '../Home/tabbar.js';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { FaPlus, FaMinus } from 'react-icons/fa';
import './cart.css'
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
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    calculateTotalPrice(storedCartItems);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cartItems.length);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const TotalCost = total.toFixed(2);
    setTotalPrice(TotalCost);
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
    window.dispatchEvent(new Event('cartUpdated'));
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
    // Add logic to send OTP here
    setOtpSent(true);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
    return nameRegex.test(name);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Exactly 10 digits
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email format validation
    return emailRegex.test(email);
  };

  const validateAddress = (address) => {
    return address.trim() !== ''; // Ensure address is not empty
  };

  const handleOtpVerification = async () => {
    const { name, address, phone, email, otp } = userDetails;

    if (!validateName(name)) {
      setErrorMessage("Please enter a valid name (letters and spaces only).");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
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

    if (otp !== "1234") { // Replace with actual OTP verification logic
      setErrorMessage("Invalid OTP.");
      return;
    }

    setVerifiedOtp(true);
    setErrorMessage('');

    // Automatically place the order after OTP verification
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
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#BDF6FE", minHeight: "100vh" }}>
      <CollapsibleExample />
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card shopping-cart glass">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 px-5 py-4">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">Your products</h3>

                    {cartItems.map((item, index) => (
                      <div className="cart-item" key={index}>
                        <div className="flex-shrink-0">
                          <img src={item.img} className="img-fluid" alt={item.name} />
                        </div>
                        <div className="cart-item-details">
                          <a href="#!" className="remove-btn" onClick={() => handleRemoveItem(index)}>
                            <i className="fas fa-times"></i>
                          </a>
                          <h5 className="text-primary">{item.name}</h5>
                          <h6>{item.description}</h6>
                          <div className="d-flex align-items-center">
                            <p className="fw-bold mb-0 me-5 pe-3">${item.price}</p>
                            <div className="quantity-controls">
                              <button
                                onClick={() => handleQuantityChange(index, item.quantity - 1)}
                              >
                                <FaMinus />
                              </button>
                              <input
                                className="quantity"
                                min="0"
                                name="quantity"
                                value={item.quantity}
                                type="number"
                                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                              />
                              <button
                                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <hr className="mb-4" />

                    <div className="total-section">
                      <h5 className="fw-bold mb-0">Total:</h5>
                      <h5 className="fw-bold mb-0">${totalPrice}</h5>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary btn-block btn-lg"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </button>

                    <Modal show={showModal} onHide={() => setShowModal(false)} className="modal-content">
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
                          type="text"
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
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                          Close
                        </Button>
                        {!otpSent ? (
                          <Button variant="primary" onClick={sendOtp}>
                            Send OTP
                          </Button>
                        ) : (
                          <Button variant="primary" onClick={handleOtpVerification}>
                            Verify OTP and Place Order
                          </Button>
                        )}
                      </Modal.Footer>
                    </Modal>

                    {showEmptyCartError && (
                      <div className="alert alert-danger">
                        Your cart is empty. Please add items before placing an order.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
