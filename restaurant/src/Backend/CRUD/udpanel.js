  import React, { useState, useEffect } from 'react';
  import styled from 'styled-components';
  import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
  import { db } from '../../Backend/Firebase/config';
  import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
  import { storage } from '../../Backend/Firebase/config'; // Make sure to import your Firebase storage
  import CollapsibleExample from './navbar';

  const AdminPanel = styled.div`
    font-family: 'Jovelyn Blur Demo';
    background-color: #f0f0f0;
    height: 100vh;
    overflow-y: auto;
    padding: 0px;
      background-color: #BDF6FE;
      font-family: 'Jovelyn Blur Demo';
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
  `;

  const ProductCard = styled.div`
    width: 90%;
    max-width: 1000px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 20px;
      border:1px solid rgba(255, 255, 255, 0.801);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      @media (max-width:425px)
      {
      display:flex;
      flex-direction:column
      }
  `;

  const ProductImage = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  `;

  const ProductInfo = styled.div`
    flex: 1;
  `;

  const ProductTitle = styled.h2`
    font-size: 1.5em;
    color: #333;
    @media (max-width:425px)
  {
    font-size:1.2em
  }
  `;

  const ProductDescription = styled.p`
    font-size: 1em;
    color: #666;
    margin: 10px 0;
  `;

  const ProductPrice = styled.p`
    font-size: 1.25em;
    color: #e91e63;
  `;

  const Button = styled.button`
    background-color: #e91e63;
    color: white;
    font-size: 0.9em;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  margin-left:10px;
    &:hover {
      background-color: #d81b60;
    }
  `;

  const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    
  `;

  const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    position: relative;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 20px;
      border:1px solid rgba(255, 255, 255, 0.801);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  `;

  const ModalHeader = styled.h2`
    margin-bottom: 20px;
    color: #333;
  `;

  const FormField = styled.div`
    margin-bottom: 15px;
  `;

  const FormLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  `;

  const FormInput = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  `;

  const FormTextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    resize: vertical;
  `;

  const FormFileInput = styled.input`
    width: 100%;
  `;

  const ModalButton = styled.button`
    background-color: #e91e63;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px;

    &:hover {
      background-color: #d81b60;
    }
  `;

  const AdminPanelPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newImage, setNewImage] = useState(null); // To store the selected image file

    useEffect(() => {
      const fetchProducts = async () => {
        const querySnapshot = await getDocs(collection(db, 'Products'));
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsArray);
      };
      fetchProducts();
    }, []);

    const handleDelete = async (id) => {
      await deleteDoc(doc(db, 'Products', id));
      setProducts(products.filter(product => product.id !== id));
    };

    const handleUpdate = async (id) => {
      if (newImage) {
        // Upload the new image to Firebase Storage
        const storageRef = ref(storage, `product.images/${newImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, newImage);

        uploadTask.on('state_changed', 
          null, 
          (error) => console.error(error), 
          async () => {
            // Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Update the product document with the new image URL
            await updateDoc(doc(db, 'Products', id), {
              ...selectedProduct,
              ProductImg: downloadURL,
            });
            setSelectedProduct(null);
            setNewImage(null); // Clear the image file after updating
          }
        );
      } else {
        // Update product document without changing the image
        await updateDoc(doc(db, 'Products', id), selectedProduct);
        setSelectedProduct(null);
      }
      setProducts(products.map(product =>
        product.id === id ? { ...product, ...selectedProduct } : product
      ));
    };

    const handleOpenModal = (product) => {
      setSelectedProduct(product);
    };

    const handleCloseModal = () => {
      setSelectedProduct(null);
      setNewImage(null); // Clear the image file when closing the modal
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedProduct({
        ...selectedProduct,
        [name]: value
      });
    };

    const handleImageChange = (e) => {
      setNewImage(e.target.files[0]); // Set the selected image file
    };

    return (
      <AdminPanel>
        <CollapsibleExample/>
        <Container>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.ProductImg} alt={product.ProductName} />
              <ProductInfo>
                <ProductTitle>{product.ProductName}</ProductTitle>
                <ProductDescription>{product.ProductDescription}</ProductDescription>
                <ProductPrice>{`$${product.ProductPrice}`}</ProductPrice>
                <Button onClick={() => handleOpenModal(product)}>Update</Button>
                <Button onClick={() => handleDelete(product.id)}>Delete</Button>
              </ProductInfo>
            </ProductCard>
          ))}
        </Container>

        {selectedProduct && (
          <ModalBackdrop>
            <ModalContent>
              <ModalHeader>Update Product</ModalHeader>
              <FormField>
                <FormLabel htmlFor="ProductName">Product Name</FormLabel>
                <FormInput
                  id="ProductName"
                  name="ProductName"
                  value={selectedProduct.ProductName}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <FormLabel htmlFor="ProductDescription">Product Description</FormLabel>
                <FormTextArea
                  id="ProductDescription"
                  name="ProductDescription"
                  value={selectedProduct.ProductDescription}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <FormLabel htmlFor="ProductPrice">Product Price</FormLabel>
                <FormInput
                  id="ProductPrice"
                  name="ProductPrice"
                  type="number"
                  value={selectedProduct.ProductPrice}
                  onChange={handleChange}
                />
              </FormField>
              <FormField>
                <FormLabel htmlFor="ProductImg">Product Image URL</FormLabel>
                <FormInput
                  id="ProductImg"
                  name="ProductImg"
                  value={selectedProduct.ProductImg}
                  onChange={handleChange}
                  readOnly
                />
              </FormField>
              <FormField>
                <FormLabel htmlFor="NewImage">Upload New Image</FormLabel>
                <FormFileInput
                  id="NewImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormField>
              <div>
                <ModalButton onClick={() => handleUpdate(selectedProduct.id)}>Save</ModalButton>
                <ModalButton onClick={handleCloseModal}>Cancel</ModalButton>
              </div>
            </ModalContent>
          </ModalBackdrop>
        )}
      </AdminPanel>
    );
  };

  export default AdminPanelPage;
