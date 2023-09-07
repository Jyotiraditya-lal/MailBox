import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const CartItems=(props)=>{
    
    return(
        <Card style={{width: "30rem"}}>
            <Card.Body>
                <Card.Img src={props.url} style={{width: "5rem"}}/>
                <Row xs={3}>
                   <Col>{props.title}</Col>
                   <Col>${props.price}</Col>
                   <Col>{props.amount}
                   <Button className="ms-3" variant="danger" onClick={props.onRemove}>Remove</Button>
                   </Col> 
                </Row>
            </Card.Body>
        </Card>
    )
}

export default CartItems