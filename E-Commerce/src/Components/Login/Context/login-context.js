import React from 'react'

const LoginContext=React.createContext({
    idToken: '',
    isLoggedin: false,
    login: (id)=>{},
    logout: ()=>{},
    UID: ''
})

export default LoginContext