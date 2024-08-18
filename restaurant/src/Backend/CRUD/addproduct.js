import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from '../Firebase/config.js';
import styled from 'styled-components';

export const AddProduct = () => {
  const types = ['image/png', 'image/jpeg'];
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [category, setCategory] = useState('Mains');
  const [error, setError] = useState('');

  const productImgeHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError('');
    } else {
      setProductImg(null);
      setError("Please select a valid Image format (png/jpeg)");
    }
  }

  const addProduct = (e) => {
    e.preventDefault();

    if (!productImg) {
      setError('No image selected.');
      return;
    }

    const storageRef = ref(storage, `product.images/${productImg.name}`);
    const uploadTask = uploadBytesResumable(storageRef, productImg);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        setError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addDoc(collection(db, 'Products'), {
            ProductName: productName,
            ProductDescription: productDescription,
            ProductPrice: productPrice,
            ProductImg: url,
            Category: category
          })
          .then(() => {
            setProductName('');
            setProductDescription('');
            setProductPrice(0);
            setProductImg(null);
            setCategory('Mains');
            setError('');
            document.getElementById("file").value = '';
            alert("UPLOAD COMPLETE")
          })
          .catch((error) => setError(error.message));
        });
      }
    );
  };

  return (
    <Container>
      <FormTitle>Add New Product</FormTitle>
      <StyledForm onSubmit={addProduct}>
        <Label>Product Name</Label>
        <StyledInput
          type="text"
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />

        <Label>Product Description</Label>
        <StyledInput
          type="text"
          required
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
        />

        <Label>Product Price</Label>
        <StyledInput
          type="number"
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />

        <Label>Category</Label>
        <StyledSelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Mains">Mains</option>
          <option value="Sides">Sides</option>
        </StyledSelect>

        <Label>Product Image</Label>
        <StyledInput
          type="file"
          onChange={productImgeHandler}
          id="file"
        />

        <StyledButton type="submit">Add Product</StyledButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledForm>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const StyledInput = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const StyledSelect = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #007BFF;
    outline: none;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;
