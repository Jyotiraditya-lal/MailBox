import React,{useContext} from "react";
import LoginContext from "../Login/Context/login-context";
import { Container,Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";



const About=()=>{

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
      <div >
      <Navbar bg="secondary" variant="dark" className="mb-3" >
        <Container style={{height: "15rem"}}>
          <h2 className="center-navbar">The Generics</h2>
        </Container>
      </Navbar>
      </div>
        <Container>
          <h1 style={{textAlign:"center", fontFamily: "fantasy"}}>
            About Us
          </h1>
            <p>
                Lorem ipsum carrots enhanced rebates. Excellent sayings of a man of sorrows, hates no prosecutors will unfold in the enduring of which were born in it? Often leads smallest mistake some pain main responsibilities are to stand for the right builder of pleasure, accepted explain up to now. , The things we are accusing of these in the explication of the truth receives from the flattery of her will never be the trouble and they are refused to the pleasures and the pleasures of the pain, explain the treatment of excepturi of the blessed sufferings. I never said will unfold in him receives at another time he may please the one that those works, we are less than they, this refused to the pleasures of deleniti? Those are! Will unfold in times of pleasure, this pain will be a right enjoyed by corrupt, are accusing him of all pleasures, and seek his own, or, to the needs of the agony of the choice. We hate the fellow.
                Lorem ipsum dolor, sit amet consectetur rebates. The distinction, that arise from or to. The greater, therefore, an obstacle to the duties of the debts receives the very great importance to us that these are consequent to that question is answered, which was selected for the fault, it is often one of us, however, have any! Moreover, this is often not at once take the hardships of the life of harsh condemn, we are accusing him? Him whom something large cisterns.
            </p>
        </Container>
    </React.Fragment>
    )
}

export default About