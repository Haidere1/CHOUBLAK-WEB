import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Backend/Firebase/config';
import CollapsibleExample from './navbar';

const STATUS_COLORS = {
  OrderPlaced:     { bg: 'rgba(0,150,199,0.1)',    color: '#0096c7' },
  InProgress:      { bg: 'rgba(244,132,95,0.12)',  color: '#f4845f' },
  OutForDelivery:  { bg: 'rgba(72,202,228,0.12)',  color: '#0077a8' },
  Delivered:       { bg: 'rgba(39,174,96,0.1)',    color: '#27ae60' },
};

const AdminPanelPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const arr = [];
      querySnapshot.forEach((d) => arr.push({ id: d.id, ...d.data() }));
      arr.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
      setOrders(arr);
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const orderDoc = doc(db, 'orders', orderId);
    await updateDoc(orderDoc, { status: newStatus });
    if (newStatus === 'Delivered') {
      setOrders(orders.filter(o => o.id !== orderId));
    } else {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  return (
    <PageWrapper>
      <CollapsibleExample />
      <PageInner>
        <PageHeader>
          <PageTitle>Orders</PageTitle>
          <OrderCount>{orders.length} active</OrderCount>
        </PageHeader>

        {orders.length === 0 && (
          <EmptyState>No active orders at the moment.</EmptyState>
        )}

        <OrderList>
          {orders.map((order) => {
            const u = order.userDetails || {};
            const items = order.items || [];
            const sc = STATUS_COLORS[order.status] || STATUS_COLORS.OrderPlaced;

            return (
              <OrderCard key={order.id}>
                <CardTop>
                  <OrderMeta>
                    <OrderId>#{order.id.slice(-8).toUpperCase()}</OrderId>
                    <Timestamp>{order.timestamp.toDate().toLocaleString()}</Timestamp>
                  </OrderMeta>
                  <StatusBadge style={{ background: sc.bg, color: sc.color }}>
                    {order.status.replace(/([A-Z])/g, ' $1').trim()}
                  </StatusBadge>
                </CardTop>

                <CardBody>
                  <Section>
                    <SectionLabel>Customer</SectionLabel>
                    <InfoGrid>
                      <InfoRow><InfoKey>Name</InfoKey><InfoVal>{u.name || '—'}</InfoVal></InfoRow>
                      <InfoRow><InfoKey>Phone</InfoKey><InfoVal>{u.phone || '—'}</InfoVal></InfoRow>
                      <InfoRow><InfoKey>Email</InfoKey><InfoVal>{u.email || '—'}</InfoVal></InfoRow>
                      <InfoRow><InfoKey>Address</InfoKey><InfoVal>{u.address || '—'}</InfoVal></InfoRow>
                    </InfoGrid>
                  </Section>

                  <Section>
                    <SectionLabel>Items</SectionLabel>
                    <ItemsTable>
                      {items.map((item, i) => (
                        <ItemRow key={i}>
                          <ItemName>{item.name}</ItemName>
                          {item.option && <ItemOption>{item.option}</ItemOption>}
                          <ItemQty>×{item.quantity}</ItemQty>
                          <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
                        </ItemRow>
                      ))}
                    </ItemsTable>
                    <TotalRow>
                      <span>Total</span>
                      <TotalAmt>${order.total}</TotalAmt>
                    </TotalRow>
                  </Section>
                </CardBody>

                <CardFooter>
                  <StatusLabel>Update Status</StatusLabel>
                  <StatusSelect value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)}>
                    <option value="OrderPlaced">Order Placed</option>
                    <option value="InProgress">In Progress</option>
                    <option value="OutForDelivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </StatusSelect>
                </CardFooter>
              </OrderCard>
            );
          })}
        </OrderList>
      </PageInner>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f0f8ff;
  padding-bottom: 60px;
`;

const PageInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 28px;
`;

const PageTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 900;
  font-style: italic;
  color: #023047;
  letter-spacing: -0.5px;
  margin: 0;
`;

const OrderCount = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #0096c7;
`;

const EmptyState = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 0.95rem;
  padding: 60px 0;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const OrderCard = styled.div`
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(72, 202, 228, 0.16);
  box-shadow: 0 4px 20px rgba(0, 150, 199, 0.07);
  overflow: hidden;
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px 14px;
  border-bottom: 1px solid rgba(0, 150, 199, 0.08);
`;

const OrderMeta = styled.div``;

const OrderId = styled.div`
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #023047;
`;

const Timestamp = styled.div`
  font-size: 0.75rem;
  color: #bbb;
  margin-top: 2px;
`;

const StatusBadge = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 50px;
`;

const CardBody = styled.div`
  padding: 20px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Section = styled.div``;

const SectionLabel = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #0096c7;
  margin-bottom: 12px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InfoRow = styled.div`
  display: flex;
  gap: 8px;
  font-size: 0.85rem;
`;

const InfoKey = styled.span`
  color: #aaa;
  min-width: 58px;
  flex-shrink: 0;
`;

const InfoVal = styled.span`
  color: #023047;
  font-weight: 600;
`;

const ItemsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
`;

const ItemName = styled.span`
  flex: 1;
  color: #023047;
  font-weight: 600;
`;

const ItemOption = styled.span`
  font-size: 0.75rem;
  color: #888;
  background: #f0f8ff;
  padding: 2px 8px;
  border-radius: 50px;
`;

const ItemQty = styled.span`
  color: #888;
  font-size: 0.82rem;
`;

const ItemPrice = styled.span`
  color: #f4845f;
  font-weight: 700;
  min-width: 48px;
  text-align: right;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 150, 199, 0.1);
  font-size: 0.82rem;
  color: #aaa;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const TotalAmt = styled.span`
  font-size: 1rem;
  font-weight: 900;
  color: #023047;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 24px 18px;
  background: #f8fdff;
  border-top: 1px solid rgba(0, 150, 199, 0.08);
`;

const StatusLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #aaa;
  white-space: nowrap;
`;

const StatusSelect = styled.select`
  padding: 8px 14px;
  border: 1.5px solid rgba(0, 150, 199, 0.22);
  border-radius: 50px;
  font-size: 0.84rem;
  font-weight: 600;
  color: #023047;
  background: #ffffff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
  &:focus { border-color: #48cae4; }
`;

export default AdminPanelPage;
