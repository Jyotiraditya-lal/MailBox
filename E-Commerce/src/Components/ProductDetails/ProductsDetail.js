import React,{useContext} from "react";
import { useParams,NavLink } from "react-router-dom";
import { Button, Card, Container, Navbar } from "react-bootstrap";
import LoginContext from "../Login/Context/login-context";


const ProductDetails=()=>{

    const params=useParams()
    const ctx=useContext(LoginContext)

    const productsArr = [
        { id: '1',title: 'Album 1', price: 100,imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png'},
        { id: '2',title: 'Album 2', price: 50, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png'},
        { id: '3',title: 'Album 3',price: 70, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png'},
        { id: '4',title: 'Album 4', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png'}
    ]

    const product= productsArr.find((prod) => prod.id === params.productId)
    
    if(!product){
        return <p>Something went Wrong while loading {params.productId}</p>
    }

    let bttn;
    
    if(ctx.isLoggedin){
       bttn=<Button onClick={ctx.logout} variant="primary">Logout</Button>
    }else{
       bttn=<NavLink style={{color: 'white'}} to="/login">Login</NavLink>
    }

    return(
        <div>
         <Navbar bg="dark" expand="sm" variant="dark">
         <Container>
            <NavLink style={{color: 'white'}} to="/">Home</NavLink>
            <NavLink style={{color: 'white'}} to="/Store">Shop</NavLink>
            <NavLink style={{color: 'white'}} to="/About">About Us</NavLink>
            <NavLink style={{color: 'white'}} to="/ContactUs">Contact Us</NavLink>
            {bttn}
        </Container>
      </Navbar>
      <div >
      <Navbar bg="secondary" variant="dark" className="mb-3" >
        <Container style={{height: "15rem"}}>
          <h2 className="center-navbar">The Generics</h2>
        </Container>
      </Navbar>
      </div>
      <h1 style={{textAlign: 'center'}}>Product Details</h1>
        <Card className="mb-4" style={{width: '20rem', }}>
             <Card.Title style={{alignSelf: "center"}}>{product.title}</Card.Title>
             <Card.Img variant="middle" src={product.imageUrl} />
                 <Card.Body>
                    <Card.Text>${product.price}</Card.Text>  
                </Card.Body>
         </Card>  
         <h2 style={{textAlign: 'center'}}>Reviews</h2>
         <Container>
         <ul >
          <li style={{fontFamily: "monospace"}}>Review 1</li>
          <br />
          <li style={{fontFamily: "monospace"}}>Review 2</li>
          <br />
          <li style={{fontFamily: "monospace"}}>Review 3</li>
         </ul>
         </Container>
        </div>
    )
}

export default ProductDetails