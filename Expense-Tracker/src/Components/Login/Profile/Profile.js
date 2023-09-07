import React,{useContext, useState} from "react";
import {Card} from 'react-bootstrap'

import classes from './Profile.module.css'
import { useSelector } from "react-redux";


const Profile=()=>{

    const [enteredName,setEnteredName]=useState('')
    const [enteredURL,setEnteredURL]=useState('')
    
    const idToken=useSelector((state)=>state.Auth.idToken)
    

    let empty=true;

    if(enteredName!=='' && enteredURL!=''){
        empty=false
    }

    const NameChangeHandler=(event)=>{
        setEnteredName(event.target.value)
    }

    const URLChangeHandler=(event)=>{
        setEnteredURL(event.target.value)
    }

    const SubmitHandler= async (event)=>{

        event.preventDefault()
        

        try{
           const response= await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC3xsAFKErtyTNybpuyKLlB9KUsc837SZY',{
            method: 'POST',
            body: JSON.stringify({
                idToken: idToken,
                displayName: enteredName,
                photoUrl: enteredURL,
                returnSecureToken: true
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if(response.ok){
            alert('Your details have been updated')
        }
        else{
            throw new Error('Something went wrong here!');
        }

         const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC3xsAFKErtyTNybpuyKLlB9KUsc837SZY',{
            method: 'POST',
            body: JSON.stringify({idToken: idToken}),
            headers: {'Content-Type': 'application/json'}
         })
         if(!res.ok){
            throw new Error('Something went wrong!');
         }

         const data = await res.json()
         setEnteredName(data.users[0].displayName)
         setEnteredURL(data.users[0].photoUrl)
         
         
        
        }catch(err) {
            alert(err.message)
        }
        
    }

    const EditDetailsHandler=()=>{
        setEnteredName('')
        setEnteredURL('')
    }

    return(
        <Card className={classes.input}>
            <Card.Title style={{textAlign: 'center', fontFamily: 'monospace', fontSize: '25px'}}>Contact Details</Card.Title>
            <Card.Body>
            <form>
            <main>
                <label>Full Name:</label>
                {empty && <input type="text" value={enteredName} onChange={NameChangeHandler} />}
                {!empty && <p>{enteredName}</p>}
                <br />
                <label>Profile Photo URL:</label>
                {empty && <input type="url" value={enteredURL} onChange={URLChangeHandler} />}
                {!empty && <p>{enteredURL}</p>}
            </main>
            <Card.Footer>
                <button type="submit" onClick={SubmitHandler}>Update</button>
                <div style={{textAlign: 'end'}}>
                    <button onClick={EditDetailsHandler}>Edit details</button>
                </div>
            </Card.Footer>
            </form>
            </Card.Body>
        </Card>
    )
}

export default Profile