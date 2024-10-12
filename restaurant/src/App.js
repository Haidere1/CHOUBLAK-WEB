
import AboutUs from './Components/AboutUs/aboutus.js';
import BasicExample from './Components/Home/MenuPage.js';
 import Home from './Components/Home/home.js'
// import ContactUs from './Components/menu.js';
//import CollapsibleExample from './Components/Home/tabbar.js';
import { Route,Routes } from 'react-router-dom';
//import ViewProduct from './Components/Products/viewproduct.js';
import {AddProduct} from './Backend/CRUD/addproduct.js'
import  AdminPanelPage from './Backend/CRUD/udpanel.js'
import Cart from './Components/Cart/cart2.js';
import './CSS/App.css'
import Login from './Components/Admin/login.js';
import OrderPage from './Backend/CRUD/order.js';
import Protected from './Components/Admin/protected.js';


function App() {
  
  return (
<Routes>
  
  {/* <Route path='/' element={<Home/>}></Route> */}
  <Route path='/' element={<Home/>}></Route>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/menu' element={<BasicExample/>}></Route>
  <Route path='/aboutus' element={<AboutUs/>}></Route>
  <Route path='/cart' element={<Cart/>}></Route>
  <Route path='/admin/login' element={<Login/>}></Route>
  <Route path='/orders' element={<Protected Component={OrderPage}/>}></Route>
  <Route path='/addproduct' element={<Protected Component={AddProduct}/>}></Route>
</Routes>
 
  );
}

export default App;
