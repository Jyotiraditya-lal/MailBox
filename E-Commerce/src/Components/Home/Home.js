import React,{useContext} from "react";
import { Container, Navbar, Card, Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginContext from "../Login/Context/login-context";


const Home=()=>{

    const ctx=useContext(LoginContext)

    let bttn;
    
    if(ctx.isLoggedin){
       bttn=<Button onClick={ctx.logout} variant="primary">Logout</Button>
    }else{
       bttn=<NavLink style={{color: 'white'}} to="/login">Login</NavLink>
    }

    return(
     <React.Fragment>
       <Navbar bg="dark" expand="sm" variant="dark">
        <Container>
            <NavLink style={{color: 'white'}} to="/">Home</NavLink>
            {ctx.isLoggedin && <NavLink style={{color: 'white'}} to="/Store">Shop</NavLink>}
            <NavLink style={{color: 'white'}} to="/About">About Us</NavLink>
            <NavLink style={{color: 'white'}} to="/ContactUs">Contact Us</NavLink>
            {bttn}
        </Container>
      </Navbar>
      <Navbar bg="secondary" variant="dark" className="mb-3" >
        <Container style={{height: "15rem"}}>
          <h2 className="center-navbar">The Generics</h2>
          <Button variant="dark">Go to Albums</Button>
        </Container>
      </Navbar>
      <Card style={{width: "60rem"}}>
        <Card.Title style={{alignSelf: "center", fontFamily: "cursive"}}>Tours</Card.Title>
        <Card.Body>
            <Row>
                <Col>
                    <p>July 16</p>
                </Col>
                <Col>
                    <p>DETROIT, MI</p>
                </Col>
                <Col> 
                    <p>DTE ENERGY MUSIC THEATRE</p>
                </Col>
                <Col>
                    <Button>Buy Tickets</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>July 19</p>
                </Col>
                <Col>
                    <p>TORONTO,ON</p>
                </Col>
                <Col> 
                    <p>BUDWEISER STAGE</p>
                </Col>
                <Col>
                    <Button>Buy Tickets</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>July 22</p>
                </Col>
                <Col>
                    <p>BRISTOW, VA</p>
                </Col>
                <Col> 
                    <p>JIGGY LUBE LIVE</p>
                </Col>
                <Col>
                    <Button>Buy Tickets</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>July 29</p>
                </Col>
                <Col>
                    <p>PHOENIX, AZ</p>
                </Col>
                <Col> 
                    <p>AK-CHIN PAVILION</p>
                </Col>
                <Col>
                    <Button>Buy Tickets</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Aug 2</p>
                </Col>
                <Col>
                    <p>LAS VEGAS, NV</p>
                </Col>
                <Col> 
                    <p>T-MOBILE ARENA</p>
                </Col>
                <Col>
                    <Button>Buy Tickets</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Aug 7</p>
                </Col>
                <Col>
                    <p>CONCORD, CA</p>
                </Col>
                <Col> 
                    <p>CONCORD PAVILION</p>
                </Col>
                <Col>
                    <Button>Buy Tickets</Button>
                </Col>
            </Row>
        </Card.Body>
      </Card>
    </React.Fragment>
    )
}

export default Home