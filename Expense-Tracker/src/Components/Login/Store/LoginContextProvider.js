
import LoginContext from "./login-context"
import React,{useState} from 'react'



const LoginContextProvider=(props)=>{

    
    const initialState= localStorage.getItem('token')
    const [token,setToken]=useState(initialState)
    const [userId,setUserId]=useState('')
    const isLoggedin= !!token

    const LoginHandler=(id,email)=>{
        setToken(id)
        setUserId(email)
        localStorage.setItem('token',id)
        
    }

    const LogoutHandler=()=>{
        setToken(null)
        localStorage.removeItem('token')
        
    }


    const ctx={
        idToken: token,
        isLoggedin: isLoggedin,
        login: LoginHandler,
        logout: LogoutHandler,
        
        
    }

    return(
        <LoginContext.Provider value={ctx}>
            {props.children}
        </LoginContext.Provider>
    )

}

export default LoginContextProvider