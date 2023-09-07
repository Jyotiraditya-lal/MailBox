import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import classes from './MainNavigation.module.css'
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../Store/Redux";


const MainNavigation=()=>{

  const isLoggedin=useSelector(state=>state.Auth.isLoggedin)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  let content;
  if(isLoggedin){
    content=<Link to='/Home'>Home</Link>       
  }
  else{
    content=<Link to='/'>Login</Link> 
  }

  const logoutHandler=()=>{
    dispatch(AuthActions.logout());
    navigate('/')
  }

    return(
     <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>MyWebLink</div>
      </Link>
      <nav>
        <ul>
          <li>
          {isLoggedin && <Link to='/AddExpense'>Add Expenses</Link>}
          </li>
          <li>
            <Link to='/AboutUs'>About Us</Link>
          </li>
          <li>
            {content}
          </li>
          <li>{isLoggedin && <button onClick={logoutHandler}>Logout</button>}</li>
        </ul>
      </nav>
      </header>
    )
}

export default MainNavigation