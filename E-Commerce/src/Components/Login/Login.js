import React,{useContext} from "react";
import { Container,Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginContext from "./Context/login-context";




const Login=()=>{

    const ctx=useContext(LoginContext)

    return(
    <React.Fragment>
      <Navbar bg="dark" expand="sm" variant="dark">
        <Container>
            <NavLink style={{color: 'white'}} to="/">Home</NavLink>
            {ctx.isLoggedin && <NavLink style={{color: 'white'}} to="/Store">Shop</NavLink>}
            <NavLink style={{color: 'white'}} to="/About">About Us</NavLink>
            <NavLink style={{color: 'white'}} to="/ContactUs">Contact Us</NavLink>
            <NavLink style={{color: 'white'}} to="/login">{ctx.isLoggedin ? 'Logout' : 'login'}</NavLink>
        </Container>
      </Navbar>
      <Navbar bg="secondary" variant="dark" className="mb-3" >
        <Container style={{height: "15rem"}}>
          <h2 className="center-navbar">The Generics</h2>
        </Container>
      </Navbar>
      <LoginForm />
    </React.Fragment>
    )
}

export default Login