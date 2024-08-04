import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../CSS/navstyle.css'
import logo from '../../background/logo.png'
import {Link} from 'react-router-dom';  

function CollapsibleExample() {
  return (
    
    <Navbar collapseOnSelect expand="lg" bg="" variant="light" className='glass' style={{fontSize:"medium" ,padding:0,borderRadius:"0px"}}>
      <Container>
      <Navbar.Brand style={{width:"15vw",paddingBottom:"10px"}}><img className='logo' src={logo} alt='' style={{width:"100%",objectFit:"cover",}}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          
         <Link to='/home'><Nav.Item style={{paddingTop:"8px",color:"rgb(31,179,71)"}}>Home</Nav.Item></Link>
          
          
          <Nav.Item style={{paddingLeft:"30px",paddingTop:"8px",color:"rgb(31,179,71)"}}>+923125395156</Nav.Item>
          <Link to='/menu'><Nav.Item style={{paddingLeft:"30px",paddingTop:"8px",color:"rgb(31,179,71)"}}>Menu</Nav.Item></Link>
 
            
            
          </Nav>
          <Nav>
            <Link to="/aboutus" style={{color:"rgb(239,29,41)"}}>About Us</Link>
            
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default CollapsibleExample;