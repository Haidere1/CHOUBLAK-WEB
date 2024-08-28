import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from '../Firebase/config.js';
import '../CSS/addproduct.css';
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
      setError("Please select a valid Image format (png/jpeg)");
    }
  }

  const addProduct = (e) => {
    e.preventDefault();

    if (!productImg) {
      setError('No image selected.');
      return;
    }
    if(productPrice <= 0) {
      setError("The price should hold a positive non-zero Value!");
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
          const productData = {
            ProductName: productName,
            ProductDescription: productDescription,
            ProductPrice: productPrice,
            ProductImg: url,
            Category: category,
          };
          if (category === 'Mains') {
            productData.Options = options.map(opt => opt.value);
          }
          addDoc(collection(db, 'Products'), productData)
          .then(() => {
            setProductName('');
            setProductDescription('');
            setProductPrice(0);
            setProductImg(null);
            setCategory('Mains');
            setOptions([{ value: '' }]);
            setOptionsCount(1);
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
    <div className="main_container">
      <CollapsibleExample/>
      <Container className="glass addproduct">
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
        {category === 'Mains' && (

          <div>
          <Label>Number of Options</Label>
          <StyledSelect
            value={optionsCount}
            onChange={handleOptionsCountChange}
          >
            {[...Array(5)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))};

          </StyledSelect>
          
          {options.map((option, index) => (
            <div key={index}>
              <Label>Option {index + 1}</Label>
              <StyledInput
                type="text"
                value={option.value}
                onChange={(e) => handleOptionsChange(index, e)}
              />
            </div>
          ))}

          </div>
        )
      }       


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
    </div>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  overflow-y:scroll;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.801);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: green;
  margin-bottom: 20px;
  font-family: 'Jovelyn Blur Demo';
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
  background-color: #e91e63;
  color: white;
  font-size: 0.9em;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #d81b60;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

export default AddProduct;
