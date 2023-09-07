import React,{useContext} from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Products.css"
import Context from "../Context/context";


const Products=()=>{

    const Cartctx=useContext(Context)

    const AddHandler=(item)=>{
        Cartctx.AddItems({...item,amount: 1})
    }

    const productsArr = [
        { id: 1,title: 'Album 1', price: 100,imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png'},
        { id: 2,title: 'Album 2', price: 50, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png'},
        { id: 3,title: 'Album 3',price: 70, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png'},
        { id: 4,title: 'Album 4', price: 100, imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png'}
    ]

   
    const products=<ul>{productsArr.map((product)=> 
        <Container key={product.id}>
                <Row className="gx-3">
                    <Col xs={2} className="me-5">
                        <Card className="mb-4" style={{borderColor: 'white'}}>
                        <Card.Title style={{alignSelf: "center"}}><Link style={{color:'black'}} to={`/Store/${product.id}`}>{product.title}</Link></Card.Title>
                        <Card.Img variant="middle" src={product.imageUrl} />
                        </Card>  
                    </Col>
                    <Col>
                       <Container>
                         <h2 style={{fontFamily: 'fantasy'}}>${product.price}</h2>
                         <br />
                         <p>Details about {product.title}</p>
                       </Container>
                       <h2>
                            <Button className="ms-3" onClick={AddHandler.bind(null,product)}> Add To Cart</Button>    
                        </h2> 
                    </Col>
                </Row>
            </Container>
     )}</ul>
    
    return(
        <div className="container">
            {products}
        </div>
    )
}

export default Products