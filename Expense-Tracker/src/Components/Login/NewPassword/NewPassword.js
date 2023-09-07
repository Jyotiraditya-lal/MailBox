import React, { useState } from "react";
import classes from './NewPassword.module.css'
import { useNavigate } from "react-router-dom";

const NewPassword=()=>{

    const [Email,setEmail]=useState('')
    const navigate=useNavigate()

    const StoreEmailHandler=(event)=>{
        setEmail(event.target.value)
    }

    const PasswordChangeHandler=async (event)=>{
        event.preventDefault()
        navigate('/')
        try{
            const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC3xsAFKErtyTNybpuyKLlB9KUsc837SZY',{
            method: 'POST',
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: Email
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if(res.ok){
            alert('Password reset link has been sent to your e-mail')
        }
        else{
            throw new Error('Something went wrong')
        }
        }catch (err){
            alert('Something went wrong')
        }
    }

    return(
    <form className={classes.form} onSubmit={PasswordChangeHandler}>
      <div className={classes.control}>
        <label htmlFor='Email'>Email</label>
        <input type='Email' id='new-password' value={Email} onChange={StoreEmailHandler} />
      </div>
      <div className={classes.action}>
        <button>Send Link</button>
      </div>
    </form>
  );
    
}

export default NewPassword