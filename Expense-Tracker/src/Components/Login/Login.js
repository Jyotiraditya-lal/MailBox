import { useState, useRef } from 'react';
import classes from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { AuthActions } from '../Store/Redux';

const Login = () => {
  
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false)
  const EmailRef=useRef()
  const PasswordRef=useRef()
  const ConfPasswordRef=useRef()

  const switchLoginHandler=()=>{
    setIsLogin((prevState) => !prevState);
  }

  const SubmitHandler= (event)=>{

    event.preventDefault()

    let errorMessage='Authentication Failed!'
    setIsLoading(true)
    const enteredEmail=EmailRef.current.value;
    const enteredPass= PasswordRef.current.value;
    let enteredConf
    let url;
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3xsAFKErtyTNybpuyKLlB9KUsc837SZY'
      
     }else{
       url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3xsAFKErtyTNybpuyKLlB9KUsc837SZY'
       enteredConf=ConfPasswordRef.current.value
       
     }
      
     if(isLogin || enteredConf===enteredPass){
      
      fetch(url,{
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then(async (response)=>{
        if(response.ok){
          return response.json()
        }else{
           const data = await response.json();
           if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
            throw new Error(errorMessage);
          }
        }})
      .then((data)=>{
        if(isLogin){
          console.log(data.localId)
          
          dispatch(AuthActions.login({idToken: data.idToken, UID: data.localId}))
          navigate('/Home');
        }else{
          alert('Your account has been created!')
          setIsLogin(false)
          navigate('/')
        }
      }).catch((err)=>{alert(err.message)})
      
      
    setIsLoading(false)
    
   }  
    
  }

  const ForgotPasswordHandler=()=>{
    navigate('/NewPassword')
  }

  let content=<button type='submit'>{isLogin ? 'Login' : 'Create account'}</button>

  if(isLoading){
    content=<p>Sending Request...</p>
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
        {!isLogin && <div className={classes.control}>
          <label htmlFor='password'>Confirm Your Password</label>
          <input
            type='password'
            id='Confpassword'
            required
            ref={ConfPasswordRef}
          />
        </div>}
        <div className={classes.actions}>
          {content}
          <button
            type='button'
            className={classes.toggle}
            onClick={ForgotPasswordHandler}
          >
            Forgot Password
          </button>
          <button
            type='button'
            className={classes.toggle}
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
