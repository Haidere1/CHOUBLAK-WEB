import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../CSS/navstyle.css'
import logo from '../../background/logo.png'

function CollapsibleExample() {
  return (
    
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{fontSize:"medium" ,padding:0}}>
      <Container>
      <Navbar.Brand><img className='logo' src={logo} alt=''></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          
         <Nav.Item style={{paddingTop:"8px"}}>Home</Nav.Item>
          
          
          <Nav.Item style={{paddingLeft:"30px",paddingTop:"8px"}}>+923125395156</Nav.Item>
          <Nav.Item style={{paddingLeft:"30px",paddingTop:"8px"}}>Menu</Nav.Item>
 
            
            
          </Nav>
          <Nav>
            <Nav.Link>About Us</Nav.Link>
          
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default CollapsibleExample;