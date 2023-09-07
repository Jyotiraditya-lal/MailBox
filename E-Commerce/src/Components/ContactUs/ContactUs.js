import React,{useContext} from "react";
import { Navbar,Container, Button} from "react-bootstrap";
import ContactForm from "./ContactForm";
import { NavLink } from "react-router-dom";
import LoginContext from "../Login/Context/login-context";

const ContactUs=()=>{

    const SendHandler= async (info)=>{
        await fetch('https://react-http-333ab-default-rtdb.asia-southeast1.firebasedatabase.app/ContactInfo.json',{
            method: 'POST',
            body: JSON.stringify(info)
        })
    }

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
        </Container>
      </Navbar>
        <ContactForm onSendInfo={SendHandler} />
        </React.Fragment>
    )
}

export default ContactUs
