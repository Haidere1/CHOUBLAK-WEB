import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { storage, db } from '../Firebase/config.js';
import styled from 'styled-components';
import CollapsibleExample from "./navbar.js";

export const AddProduct = () => {
  const types = ['image/png', 'image/jpeg'];
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [optionsCount, setOptionsCount] = useState(1);
  const [options, setOptions] = useState([{ value: '' }]);
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [category, setCategory] = useState('Mains');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleOptionsChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index].value = event.target.value;
    setOptions(newOptions);
  };

  const handleOptionsCountChange = (event) => {
    const count = parseInt(event.target.value);
    setOptionsCount(count);
    const newOptions = Array.from({ length: count }, (_, i) => options[i] || { value: '' });
    setOptions(newOptions);
  };

  const productImgeHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError('');
    } else {
      setProductImg(null);
      setError("Please select a valid image format (png/jpeg)");
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (productPrice <= 0) {
      setError("Price must be a positive non-zero value.");
      return;
    }
    try {
      const productQuery = query(collection(db, 'Products'), where("ProductName", "==", productName));
      const querySnapshot = await getDocs(productQuery);
      if (!querySnapshot.empty) {
        setError("A product with this name already exists.");
        return;
      }
      if (productImg) {
        const storageRef = ref(storage, `product.images/${productImg.name}`);
        const uploadTask = uploadBytesResumable(storageRef, productImg);
        uploadTask.on('state_changed', null,
          (err) => setError(err.message),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              const data = { ProductName: productName, ProductDescription: productDescription, ProductPrice: productPrice, ProductImg: url, Category: category };
              if (category === 'Mains') data.Options = options.map(o => o.value);
              addProductToFirestore(data);
            });
          }
        );
      } else {
        const data = { ProductName: productName, ProductDescription: productDescription, ProductPrice: productPrice, Category: category };
        if (category === 'Mains') data.Options = options.map(o => o.value);
        addProductToFirestore(data);
      }
    } catch (err) {
      setError("Failed to check product: " + err.message);
    }
  };

  const addProductToFirestore = (data) => {
    addDoc(collection(db, 'Products'), data)
      .then(() => {
        resetForm();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3500);
      })
      .catch((err) => setError(err.message));
  };

  const resetForm = () => {
    setProductName('');
    setProductDescription('');
    setProductPrice(0);
    setProductImg(null);
    setCategory('Mains');
    setOptions([{ value: '' }]);
    setOptionsCount(1);
    setError('');
    document.getElementById("file").value = '';
  };

  return (
    <PageWrapper>
      <CollapsibleExample />
      <FormCard>
        <FormTitle>Add New Product</FormTitle>
        <StyledForm onSubmit={addProduct}>

          <Label>Product Name</Label>
          <StyledInput type="text" required value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g. Griot" />

          <Label>Product Description</Label>
          <StyledInput type="text" required value={productDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder="Short description" />

          <Label>Product Price ($)</Label>
          <StyledInput type="number" required value={productPrice} onChange={(e) => setProductPrice(e.target.value)} placeholder="0.00" min="0" step="0.01" />

          <Label>Category</Label>
          <StyledSelect value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Mains">Mains</option>
            <option value="Sides">Sides</option>
          </StyledSelect>

          {category === 'Mains' && (
            <div>
              <Label>Number of Options</Label>
              <StyledSelect value={optionsCount} onChange={handleOptionsCountChange}>
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </StyledSelect>
              {options.map((option, index) => (
                <div key={index}>
                  <Label>Option {index + 1}</Label>
                  <StyledInput type="text" value={option.value} onChange={(e) => handleOptionsChange(index, e)} placeholder={`Option ${index + 1}`} />
                </div>
              ))}
            </div>
          )}

          <Label>Product Image</Label>
          <StyledInput type="file" onChange={productImgeHandler} id="file" />

          {error   && <ErrorMsg>{error}</ErrorMsg>}
          {success && <SuccessMsg>Product added successfully!</SuccessMsg>}

          <SubmitBtn type="submit">Add Product</SubmitBtn>
        </StyledForm>
      </FormCard>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f0f8ff;
  padding-bottom: 60px;
`;

const FormCard = styled.div`
  max-width: 580px;
  margin: 40px auto;
  padding: 40px 44px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0, 150, 199, 0.1);
  border: 1px solid rgba(72, 202, 228, 0.18);
`;

const FormTitle = styled.h2`
  font-size: 1.55rem;
  font-weight: 900;
  font-style: italic;
  color: #023047;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: -0.5px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #023047;
  margin-bottom: 7px;
  margin-top: 4px;
`;

const StyledInput = styled.input`
  margin-bottom: 18px;
  padding: 11px 14px;
  border: 1.5px solid rgba(0, 150, 199, 0.22);
  border-radius: 10px;
  font-size: 0.93rem;
  color: #023047;
  background: #f8fdff;
  transition: border-color 0.2s ease;
  outline: none;
  &:focus {
    border-color: #48cae4;
    background: #ffffff;
  }
  &[type="file"] {
    padding: 8px 12px;
    background: #f0f8ff;
    cursor: pointer;
  }
`;

const StyledSelect = styled.select`
  margin-bottom: 18px;
  padding: 11px 14px;
  border: 1.5px solid rgba(0, 150, 199, 0.22);
  border-radius: 10px;
  font-size: 0.93rem;
  color: #023047;
  background: #f8fdff;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s ease;
  &:focus { border-color: #48cae4; }
`;

const SubmitBtn = styled.button`
  margin-top: 10px;
  padding: 14px;
  background: #f4845f;
  color: white;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    background: #e76f51;
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(244, 132, 95, 0.4);
  }
`;

const ErrorMsg = styled.p`
  font-size: 0.83rem;
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.08);
  border: 1px solid rgba(231, 76, 60, 0.25);
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 10px;
  text-align: center;
`;

const SuccessMsg = styled.p`
  font-size: 0.83rem;
  color: #0096c7;
  background: rgba(0, 150, 199, 0.08);
  border: 1px solid rgba(0, 150, 199, 0.25);
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: 10px;
  text-align: center;
`;

export default AddProduct;
