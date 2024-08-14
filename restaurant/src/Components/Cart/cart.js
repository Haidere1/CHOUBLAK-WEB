import React, { useState, useEffect } from 'react';
import { db } from '../../Backend/Firebase/config.js'; // Adjust the path as needed
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CollapsibleExample from '../Home/tabbar.js';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
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
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    calculateTotalPrice(storedCartItems);
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (index, quantity) => {
    if(quantity>=0)
    {   
      const updatedCart = [...cartItems];
      updatedCart[index].quantity = quantity;
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    else{
      alert("Quantity cannot be negative");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = () => {
    setShowModal(true);
  };

  const handleOtpVerification = () => {
    // Add OTP verification logic here
    if (userDetails.otp === "1234") { // Replace with actual OTP verification logic
      setVerifiedOtp(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleOrderConfirmation = async () => {
    if (!verifiedOtp) {
      alert("Please verify OTP before placing the order.");
      return;
    }

    const orderData = {
      items: cartItems,
      total: totalPrice,
      userDetails,
      timestamp: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      setOrderID(docRef.id);
      setIsOrderPlaced(true);
      setOrderDetails(orderData);
      setCartItems([]);
      localStorage.removeItem('cart');
      setShowModal(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchOrderDetails = async () => {
    if (orderID) {
      const querySnapshot = await getDocs(collection(db, "orders"));
      querySnapshot.forEach((doc) => {
        if (doc.id === orderID) {
          setOrderDetails(doc.data());
        }
      });
    }
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#BDF6FE",minHeight:"100vh" }}>
      <CollapsibleExample/>
      <div className="container h-100 py-5" >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card shopping-cart glass" style={{ borderRadius: "15px", backgroundColor:"yellow" }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 px-5 py-4">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase" style={{color:"red"}}>Your products</h3>

                    {cartItems.map((item, index) => (
                      <div className="d-flex align-items-center mb-5" key={index}>
                        <div className="flex-shrink-0">
                          <img src={item.img} className="img-fluid" style={{ width: "150px" }} alt={item.name} />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <a href="#!" className="float-end" onClick={() => handleRemoveItem(index)}>
                            <i className="fas fa-times"></i>
                          </a>
                          <h5 className="text-primary">{item.name}</h5>
                          <h6 style={{ color: "#9e9e9e" }}>{item.description}</h6>
                          <div className="d-flex align-items-center">
                            <p className="fw-bold mb-0 me-5 pe-3">${item.price}</p>
                            <div className="def-number-input number-input safari_only">
                              <button
                                onClick={() => handleQuantityChange(index, item.quantity - 1)}
                                style={{marginRight:"10px"}}
                              ><FaMinus/></button>
                              <input
                                className="quantity fw-bold bg-body-tertiary text-body"
                                min="0"
                                name="quantity"
                                value={item.quantity}
                                type="number"
                                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                              />
                              <button
                                style={{marginLeft:"10px"}}
                                onClick={() => handleQuantityChange(index, item.quantity + 1)}
                              > <FaPlus/></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <hr className="mb-4" style={{ height: "2px", backgroundColor: "#1266f1", opacity: 1 }} />

                    <div className="d-flex justify-content-between p-2 mb-2 bg-danger">
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

                    {isOrderPlaced && (
                      <div className="mt-4">
                        <h5 className="fw-bold text-center">Order placed successfully!</h5>
                        <Button onClick={fetchOrderDetails}>View Order Details</Button>
                        {orderDetails && (
                          <div className="mt-3">
                            <h6>Order ID: {orderID}</h6>
                            <h6>Name: {orderDetails.userDetails.name}</h6>
                            <h6>Phone: {orderDetails.userDetails.phone}</h6>
                            <h6>Email: {orderDetails.userDetails.email}</h6>
                            <h6>Address: {orderDetails.userDetails.address}</h6>
                            <h6>Total Payment: ${orderDetails.total}</h6>
                            <ul>
                              {orderDetails.items.map((item, index) => (
                                <li key={index}>{item.name} - {item.quantity} x ${item.price}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

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
                        <input
                          type="text"
                          placeholder="Phone number"
                          value={userDetails.phone}
                          onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
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
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                          Close
                        </Button>
                        {!otpSent ? (
                          <Button variant="primary" onClick={() => setOtpSent(true)}>
                            Send OTP
                          </Button>
                        ) : (
                          <Button variant="primary" onClick={handleOtpVerification}>
                            Verify OTP
                          </Button>
                        )}
                        {verifiedOtp && (
                          <Button variant="success" onClick={handleOrderConfirmation}>
                            Confirm Order
                          </Button>
                        )}
                      </Modal.Footer>
                    </Modal>

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
