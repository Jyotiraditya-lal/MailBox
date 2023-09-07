import React from "react";
import { NavLink } from "react-router-dom";

import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Home=()=>{

    const isLoggedin=useSelector((state)=>state.Auth.isLoggedin)
    const idToken=useSelector((state)=>state.Auth.idToken)

    const VerifyHandler= async ()=>{

        try{

            const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC3xsAFKErtyTNybpuyKLlB9KUsc837SZY',{
            method: 'POST',
            body: JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken: idToken
            }),
            headers: { 'Content-Type' : 'application/json' }
          })
          if(res.ok){
            alert('Verification Mail Sent')
          }
          else{
            throw new Error('Something Went Wrong')
          }
        } catch (err){
            alert(err.message)
        }
        
    }

    return(
        <React.Fragment>
            <h1 style={{textAlign: 'center'}}>Welcome to expense tracker!!</h1>
            {isLoggedin && <p style={{textAlign: 'end'}}>
                Your profile is incomplete <NavLink to='/Profile'>Complete Now</NavLink>
            </p>}
            {isLoggedin && <p style={{textAlign: 'end'}}>
                <Button onClick={VerifyHandler} variant="Primary"> Verify your E-mail</Button>
            </p>}
            <br />
            <p>This is Expense Tracker</p>
        </React.Fragment>    
    )
}


export default Home