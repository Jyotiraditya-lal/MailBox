import React from 'react';
import { useState, useRef } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../Store/Mail-redux';
import useLogin from './useLogin';

const Login = () => {
  
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [isLogin, setIsLogin] = useState(true);
  
  const EmailRef=useRef()
  const PasswordRef=useRef()
  const ConfPasswordRef=useRef()

  const switchLoginHandler=()=>{
    setIsLogin((prevState) => !prevState);
  }
  

  const SubmitHandler= async (event)=>{

    event.preventDefault()

   
   
    const enteredEmail=EmailRef.current.value;
    const enteredPass= PasswordRef.current.value;
    let enteredConf
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlIJ8VZpFohe1gwTkl7yaVKWApwjJ7nBY'
      
    }else{
       url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBlIJ8VZpFohe1gwTkl7yaVKWApwjJ7nBY'
       enteredConf=ConfPasswordRef.current.value
       
    }
      
    if(isLogin || enteredConf===enteredPass){

      try{
        const {idToken,localId,email}= await useLogin(url,enteredEmail,enteredPass)
      
        if(isLogin){
            dispatch(
              AuthActions.login({
                idToken: idToken,
                UID: localId,
                mail: email,
              })
            );
          navigate('/Home');
        }else{
          alert('Your account has been created!')
          setIsLogin(false)
          navigate('/')
        }
      } catch (error) {
        alert(error.message);
      } 
    }    
  }


  const ForgotPasswordHandler=()=>{
    navigate('/NewPassword')
  }

  let content=<button type='submit'>{isLogin ? 'Login' : 'Create account'}</button>

  

  return (
    
    <section className='auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form  onSubmit={SubmitHandler}>
        <div className='control'>
          <label htmlFor='email' style={{color: 'white'}}>Your Email</label>
          <input type='email' id='email' required ref={EmailRef} />
        </div>
        <div className='control'>
          <label htmlFor='password' style={{color: 'white'}}>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={PasswordRef}
          />
        </div>
        {!isLogin && <div className='control'>
          <label htmlFor='password' style={{color: 'white'}}>Confirm Your Password</label>
          <input
            type='password'
            id='Confpassword'
            required
            ref={ConfPasswordRef}
          />
        </div>}
        <div className='actions'>
          {content}
          {isLogin && <button
            type='button'
            className='toggle'
            onClick={ForgotPasswordHandler}
          >
            Forgot Password
          </button>}
          <button
            type='button'
            className='toggle'
            onClick={switchLoginHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
