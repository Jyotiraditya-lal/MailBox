import LoginContext from "./login-context"
import React,{useState} from 'react'



const LoginContextProvider=(props)=>{

    const [token,setToken]=useState(null)
    const [userId,setUserId]=useState('')
    const isLoggedin= !!token

    const LoginHandler=(id,Uid)=>{
        setToken(id)
        setUserId(Uid)
    }

    const LogoutHandler=()=>{
        setToken(null)
    }


    const ctx={
        idToken: token,
        isLoggedin: isLoggedin,
        login: LoginHandler,
        logout: LogoutHandler,
        UID: userId,
        
    }

    return(
        <LoginContext.Provider value={ctx}>
            {props.children}
        </LoginContext.Provider>
    )

}

export default LoginContextProvider