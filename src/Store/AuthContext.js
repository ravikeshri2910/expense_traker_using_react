import React, { useState } from "react";


const AuthContext = React.createContext({

    token : [],
    isLoggedIn : false,
    logIn : ()=>{},
    logOut : () =>{}
})

export const AuthContextProvider = (props)=>{

    const initialToken = localStorage.getItem('token')
    const [token,setToken] = useState(initialToken)

    let isLoggedIn;

    if(token){
        // console.log('true')
        isLoggedIn = true
    }else{
        // console.log('false')
        isLoggedIn = false
    }

    const logOutHandler = () =>{
        setToken('')
        localStorage.removeItem('token')
    }

    const logInHandler = (token) =>{
        setToken(token)
        localStorage.setItem('token',token)
    }

    const authCntx = { 

        token : token,
        isLoggedIn : isLoggedIn,
        logIn : logInHandler,
        logOut : logOutHandler
    }

    return <AuthContext.Provider value={authCntx} >
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext