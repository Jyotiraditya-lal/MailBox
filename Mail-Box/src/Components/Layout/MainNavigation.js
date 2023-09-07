import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import './MainNavigation.css'
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../../Store/Mail-redux";


const MainNavigation=()=>{

  const isLoggedin=useSelector(state=>state.Auth.isLoggedin)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  

  

  const logoutHandler=()=>{
    dispatch(AuthActions.logout());
    navigate('/')
  }

    return(
     <header className='header'>
      <Link to='/'>
        <div className='logo'>Mail Box</div>
      </Link>
      <nav>
        <ul>
          <li>
            {isLoggedin && <Link to='/Home'>Home</Link>}
          </li>
          <li>
          {!isLoggedin && <Link to='/'>Login</Link>}
          </li>
          <li>
          {isLoggedin && <Link to='/Compose'>Compose Mail</Link>}
          </li>
          <li>
          {isLoggedin && <Link to='/Inbox'>Inbox </Link>}
          </li>
          <li>
          {isLoggedin && <Link to='/Sent'>Sent</Link>}
          </li>
          <li>
            <Link to='/AboutUs'>About Us</Link>
          </li>
          <li>{isLoggedin && <button onClick={logoutHandler}>Logout</button>}</li>
        </ul>
      </nav>
      </header>
    )
}

export default MainNavigation