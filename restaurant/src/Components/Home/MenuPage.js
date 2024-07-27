import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import show1 from '../../background/show2.jpg';
import { useState } from 'react';
import '../../CSS/menupage.css'
import CarouselEx from './carousel';
import mbg from '../../background/menubg.jpg'
import CollapsibleExample from './tabbar';
function BasicExample() {

    const [menuItems, setMenuItems] = useState([
        {
          image: show1,
          price: '$10',
          title: 'Item 1',
          description: 'This is the description for item 1.'
        },
        {
          image: show1,
          price: '$15',
          title: 'Item 2',
          description: 'This is the description for item 2.'
        },
        {
          image: show1,
          price: '$20',
          title: 'Item 3',
          description: 'This is the description for item 3.'
        },
        {
            image: show1,
            price: '$20',
            title: 'Item 3',
            description: 'This is the description for item 3.'
          },
          {
            image: show1,
            price: '$20',
            title: 'Item 3',
            description: 'This is the description for item 3.'
          },
          {
            image: show1,
            price: '$20',
            title: 'Item 3',
            description: 'This is the description for item 3.'
          },
          {
            image: show1,
            price: '$20',
            title: 'Item 3',
            description: 'This is the description for item 3.'
          },
      ]);
  return (
    <div className='main_menu' style={{fontFamily: 'Jovelyn Blur Demo'}}>
      <CollapsibleExample/>
<CarouselEx/>

<div className="starter" >
<h1>Starters</h1>

    <div className="menu-container">
    {menuItems.map((item, index) => (
        
        <Card key={index} className="menu-card" style={{ width: '18rem',height:"60vh", borderRadius: '30px', margin: '0px' }}>
        <Card.Img variant="top" src={item.image} style={{objectFit: 'cover',borderRadius: '30px' }} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text >
            <p>{item.description}</p>
            <p style={{borderBottom:"1px solid black"}}>{item.price}</p>
          </Card.Text>
          <Button variant="danger">Go somewhere</Button>
        </Card.Body>
      </Card>
    ))}

    
   
  </div>
  <h1 style={{paddingTop:"20px"}}>Mains</h1>
  <div className="menu-container" style={{marginTop:"5%"}}>
    {menuItems.map((item, index) => (
        
        <Card key={index} className="menu-card" style={{ width: '18rem',height:"60vh", borderRadius: '30px', margin: '0px' }}>
        <Card.Img variant="top" src={item.image} style={{objectFit: 'cover',borderRadius: '30px' }} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text >
            <p>{item.description}</p>
            <p style={{borderBottom:"1px solid black"}}>{item.price}</p>
          </Card.Text>
          <Button variant="danger">Go somewhere</Button>
        </Card.Body>
      </Card>
    ))}

    
   
  </div>


  </div>


  </div>


);

}
  


export default BasicExample;