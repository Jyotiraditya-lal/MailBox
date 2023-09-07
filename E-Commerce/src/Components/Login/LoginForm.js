import { useState, useRef,useContext } from 'react';
import classes from './Login.module.css';
import { useNavigate } from 'react-router-dom'
import LoginContext from './Context/login-context';

const LoginForm = () => {
  
  const navigate=useNavigate()
  
  const authCtx=useContext(LoginContext)
  const [isLogin,setIsLogin]=useState(false)
  const EmailRef=useRef()
  const PasswordRef=useRef()

  const switchAuthModeHandler = () => {
    setIsLogin(!isLogin);
    
  };

  let content= <button type='submit'> {isLogin? 'Login' : 'Create an account'} </button>

  const SubmitHandler= (event)=>{

    event.preventDefault()

    let errorMessage='Authentication Failed!'
    
    const enteredEmail=EmailRef.current.value;
    const enteredPass= PasswordRef.current.value;
    
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3xsAFKErtyTNybpuyKLlB9KUsc837SZY'
    }else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3xsAFKErtyTNybpuyKLlB9KUsc837SZY'
     
    }
   
    fetch(url,{
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then((response)=>{
        if(response.ok){
          return response.json()
        }else{
           return response.json().then(data=>{
            if(data && data.error && data.error.message){
              errorMessage=data.error.message
              throw new Error(errorMessage)
            }
          })
        }})
      .then((data)=>{
        if(isLogin){
          authCtx.login(data.idToken,data.localId);
          
          navigate('/Store');
        }else{
          alert('Your account has been created!')
          setIsLogin(false)
        }
      }).catch((err)=>{alert(err.message)})
      
      EmailRef.current.value=''
      PasswordRef.current.value='' 
    
  }


  return (
    
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form  onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={EmailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={PasswordRef}
          />
        </div>
        <div className={classes.actions}>
          {content}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
