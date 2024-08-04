
import AboutUs from './Components/AboutUs/aboutus.js';
import BasicExample from './Components/Home/MenuPage.js';
 import Home from './Components/Home/home.js'
// import ContactUs from './Components/menu.js';
import CollapsibleExample from './Components/Home/tabbar.js';
import { Route,Routes } from 'react-router-dom';
import ViewProduct from './Components/Products/viewproduct.js';
function App() {
  
  return (
<Routes>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/menu' element={<BasicExample/>}></Route>
  <Route path='/aboutus' element={<AboutUs/>}></Route>
</Routes>
 
  );
}

export default App;
