import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../../Backend/Firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CollapsibleExample from './navbar';

const AdminPanelPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'Products'));
      const arr = [];
      querySnapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setProducts(arr);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'Products', id));
    setProducts(products.filter(p => p.id !== id));
  };

  const handleUpdate = async (id) => {
    if (newImage) {
      const storageRef = ref(storage, `product.images/${newImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, newImage);
      uploadTask.on('state_changed', null,
        (err) => console.error(err),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(db, 'Products', id), { ...selectedProduct, ProductImg: url });
          setSelectedProduct(null);
          setNewImage(null);
        }
      );
    } else {
      await updateDoc(doc(db, 'Products', id), selectedProduct);
      setSelectedProduct(null);
    }
    setProducts(products.map(p => p.id === id ? { ...p, ...selectedProduct } : p));
  };

  const handleChange = (e) => {
    setSelectedProduct({ ...selectedProduct, [e.target.name]: e.target.value });
  };

  return (
    <PageWrapper>
      <CollapsibleExample />
      <PageInner>
        <PageTitle>Manage Products</PageTitle>
        <Grid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImg src={product.ProductImg} alt={product.ProductName} />
              <ProductInfo>
                <ProductName>{product.ProductName}</ProductName>
                <ProductDesc>{product.ProductDescription}</ProductDesc>
                <ProductPrice>${product.ProductPrice}</ProductPrice>
                <CategoryTag>{product.Category}</CategoryTag>
              </ProductInfo>
              <CardActions>
                <UpdateBtn onClick={() => setSelectedProduct(product)}>Edit</UpdateBtn>
                <DeleteBtn onClick={() => handleDelete(product.id)}>Delete</DeleteBtn>
              </CardActions>
            </ProductCard>
          ))}
        </Grid>
      </PageInner>

      {selectedProduct && (
        <ModalBackdrop onClick={handleChange}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Edit Product</ModalTitle>

            <FieldGroup>
              <FieldLabel>Product Name</FieldLabel>
              <FieldInput name="ProductName" value={selectedProduct.ProductName} onChange={handleChange} />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Description</FieldLabel>
              <FieldTextArea name="ProductDescription" value={selectedProduct.ProductDescription} onChange={handleChange} />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Price ($)</FieldLabel>
              <FieldInput name="ProductPrice" type="number" value={selectedProduct.ProductPrice} onChange={handleChange} />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Current Image URL</FieldLabel>
              <FieldInput name="ProductImg" value={selectedProduct.ProductImg} readOnly style={{ opacity: 0.5, cursor: 'not-allowed' }} />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Upload New Image</FieldLabel>
              <FieldInput type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
            </FieldGroup>

            <ModalActions>
              <SaveBtn onClick={() => handleUpdate(selectedProduct.id)}>Save Changes</SaveBtn>
              <CancelBtn onClick={() => { setSelectedProduct(null); setNewImage(null); }}>Cancel</CancelBtn>
            </ModalActions>
          </ModalBox>
        </ModalBackdrop>
      )}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f0f8ff;
  padding-bottom: 60px;
`;

const PageInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const PageTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 900;
  font-style: italic;
  color: #023047;
  margin-bottom: 28px;
  letter-spacing: -0.5px;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProductCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid rgba(72, 202, 228, 0.16);
  box-shadow: 0 4px 20px rgba(0, 150, 199, 0.07);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: box-shadow 0.25s ease;
  &:hover { box-shadow: 0 8px 28px rgba(0, 150, 199, 0.13); }
  @media (max-width: 600px) { flex-direction: column; align-items: flex-start; }
`;

const ProductImg = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.h3`
  font-size: 1.05rem;
  font-weight: 800;
  color: #023047;
  margin-bottom: 4px;
`;

const ProductDesc = styled.p`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 6px;
  line-height: 1.5;
`;

const ProductPrice = styled.span`
  font-size: 1rem;
  font-weight: 800;
  color: #f4845f;
  display: inline-block;
  margin-right: 10px;
`;

const CategoryTag = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #0096c7;
  background: rgba(0, 150, 199, 0.1);
  padding: 3px 10px;
  border-radius: 50px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;

const UpdateBtn = styled.button`
  background: #0096c7;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { background: #007bb5; box-shadow: 0 4px 14px rgba(0, 150, 199, 0.35); }
`;

const DeleteBtn = styled.button`
  background: transparent;
  color: #e74c3c;
  border: 1.5px solid #e74c3c;
  border-radius: 50px;
  padding: 8px 20px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { background: #e74c3c; color: white; }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(2, 48, 71, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 24px;
`;

const ModalBox = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 40px 36px;
  width: 100%;
  max-width: 540px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 900;
  font-style: italic;
  color: #023047;
  margin-bottom: 28px;
`;

const FieldGroup = styled.div`
  margin-bottom: 18px;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #023047;
  margin-bottom: 7px;
`;

const FieldInput = styled.input`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid rgba(0, 150, 199, 0.22);
  border-radius: 10px;
  font-size: 0.93rem;
  color: #023047;
  background: #f8fdff;
  outline: none;
  transition: border-color 0.2s ease;
  &:focus { border-color: #48cae4; background: #ffffff; }
`;

const FieldTextArea = styled.textarea`
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid rgba(0, 150, 199, 0.22);
  border-radius: 10px;
  font-size: 0.93rem;
  color: #023047;
  background: #f8fdff;
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;
  &:focus { border-color: #48cae4; background: #ffffff; }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const SaveBtn = styled.button`
  flex: 1;
  padding: 13px;
  background: #f4845f;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover { background: #e76f51; box-shadow: 0 6px 18px rgba(244, 132, 95, 0.4); }
`;

const CancelBtn = styled.button`
  flex: 1;
  padding: 13px;
  background: transparent;
  color: #023047;
  border: 1.5px solid rgba(0, 150, 199, 0.3);
  border-radius: 50px;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover { background: #f0f8ff; border-color: #48cae4; }
`;

export default AdminPanelPage;
