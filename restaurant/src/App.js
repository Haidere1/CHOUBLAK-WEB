
import AboutUs from './Components/AboutUs/aboutus.js';
import BasicExample from './Components/Home/MenuPage.js';
 import Home from './Components/Home/home.js'
// import ContactUs from './Components/menu.js';
//import CollapsibleExample from './Components/Home/tabbar.js';
import { Route,Routes } from 'react-router-dom';
//import ViewProduct from './Components/Products/viewproduct.js';
import Cart from './Components/Cart/cart.js';

function App() {
  
  return (
<Routes>
  
  <Route path='/' element={<Home/>}></Route>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/menu' element={<BasicExample/>}></Route>
  <Route path='/aboutus' element={<AboutUs/>}></Route>
  <Route path='/cart' element={<Cart/>}></Route>
</Routes>
 
  );
}

export default App;
