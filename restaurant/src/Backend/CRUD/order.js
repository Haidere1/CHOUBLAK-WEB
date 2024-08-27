import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, doc, updateDoc,  } from 'firebase/firestore';
import { db } from '../../Backend/Firebase/config';
import CollapsibleExample from './navbar';

const AdminPanel = styled.div`
  font-family: 'Jovelyn Blur Demo';
  background-color: #BDF6FE;
  height: 100vh;
  overflow-y: auto;
  padding: 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderCard = styled.div`
  width: 90%;
  max-width: 1000px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.801);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  margin: 10px 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderTitle = styled.h2`
  font-size: 1.5em;
  color: #333;
  @media (max-width: 425px) {
    font-size: 1.2em;
  }
`;

const OrderDescription = styled.p`
  font-size: 1em;
  color: #666;
  margin: 10px 0;
`;

const OrderTimestamp = styled.p`
  font-size: 0.9em;
  color: #999;
  margin: 5px 0;
`;

const StatusSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
`;

// const Button = styled.button`
//   background-color: #e91e63;
//   color: white;
//   font-size: 0.9em;
//   padding: 8px 16px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;
//   margin-top: 10px;

//   &:hover {
//     background-color: #d81b60;
//   }
// `;

const AdminPanelPage = () => {
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const ordersArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        ordersArray.push({ id: doc.id, ...data });
        // Update separate states with data
        setUserDetails(prev => ({ ...prev, [doc.id]: data.userDetails }));
        setItems(prev => ({ ...prev, [doc.id]: data.items }));
      });
      ordersArray.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
      setOrders(ordersArray);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const orderDoc = doc(db, 'orders', orderId);
    if(newStatus === "Delivered")
    {
    //    await deleteDoc(orderDoc);
       alert("Order Removed");
       await updateDoc(orderDoc, { status: newStatus });
      setOrders(orders.filter(order => order.id !== orderId));
    }
    else{
        await updateDoc(orderDoc, { status: newStatus });
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
    }
  };

  return (
    <AdminPanel>
      <CollapsibleExample />
      <Container>
        {orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderInfo>
              <OrderTitle>{`Order #${order.id}`}</OrderTitle>
              <OrderDescription>{`Customer: ${userDetails[order.id]?.name || 'N/A'}`}</OrderDescription>
              <OrderDescription>{`Address: ${userDetails[order.id]?.address || 'N/A'}`}</OrderDescription>
              <OrderDescription>{`Phone: ${userDetails[order.id]?.phone || 'N/A'}`}</OrderDescription>
              <OrderDescription>{`Email: ${userDetails[order.id]?.email || 'N/A'}`}</OrderDescription>
              <OrderDescription>
                {`Items: ${items[order.id]?.map(item => item.name).join('   |  ') || 'No items available'}`}
              </OrderDescription>
              <OrderDescription>
                {`Quantity: ${items[order.id]?.map(item => item.quantity).join('    |   ') || 'No items available'}`}
              </OrderDescription>
              <OrderDescription>
                {`Option: ${items[order.id]?.map(item => item.option).join('    |   ') || 'No items available'}`}
              </OrderDescription>
              <OrderDescription>{`Total: $${order.total}`}</OrderDescription>
              <OrderTimestamp>{`Placed at: ${order.timestamp.toDate().toLocaleString()}`}</OrderTimestamp>
              <StatusSelect
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option value="OrderPlaced">Order Placed</option>
                <option value="InProgress">In Progress</option>
                <option value="OutForDelivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </StatusSelect>
            </OrderInfo>
          </OrderCard>
        ))}
      </Container>
    </AdminPanel>
  );
};

export default AdminPanelPage;
