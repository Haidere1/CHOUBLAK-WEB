
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


function App() {
  
  return (
<Routes>
  
  <Route path='/' element={<Home/>}></Route>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/menu' element={<BasicExample/>}></Route>
  <Route path='/aboutus' element={<AboutUs/>}></Route>
  <Route path='/cart' element={<Cart/>}></Route>
  <Route path='/admin/addproduct' element={<AddProduct/>}></Route>
  <Route path='/admin/update' element={<AdminPanelPage/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/order' element={<OrderPage/>}></Route>

</Routes>
 
  );
}

export default App;
