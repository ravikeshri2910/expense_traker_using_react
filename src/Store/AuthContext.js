import React, { useState } from "react";


const AuthContext = React.createContext({

    token: [],
    isLoggedIn: false,
    expenseAdding: false,
    logIn: () => { },
    logOut: () => { },
    addExpenseHandler: () =>{},
    addExpenseHandlerFalse: ()=>{}
})

export const AuthContextProvider = (props) => {

    // const initialToken = localStorage.getItem('token')
    // const [token, setToken] = useState(initialToken)

    const [addExpense, setAddexpense] = useState(false)
    const [editExpense, setEditExpense] = useState(false)
    // const [id , setId] = useState('')

    // let isLoggedIn;

    // if (token) {
    //     // console.log('true')
    //     isLoggedIn = true
    // } else {
    //     // console.log('false')
    //     isLoggedIn = false
    // }

    // const logOutHandler = () => {
    //     setToken('')
    //     localStorage.removeItem('token')
    // }

    // const logInHandler = (token) => {
    //     setToken(token)
    //     localStorage.setItem('token', token)
    // }

    const addExpenseHandler = () => {
        console.log('true')
        setAddexpense(true);
    }
    const addExpenseHandlerFalse = () => {
        console.log('false')
        setAddexpense(false);
    }

    const editingExpenseHandler =(id)=>{
        setEditExpense((prevState) => !prevState)
        // setEditExpense(id)

    }

    const authCntx = {

        // token: token,
        // isLoggedIn: isLoggedIn,
        expenseAdding: addExpense,
        editingExpense : editExpense,
        // logIn: logInHandler,
        // logOut: logOutHandler,
        addExpenseHandler: addExpenseHandler,
        addExpenseHandlerFalse: addExpenseHandlerFalse,
        editingExpenseHandler : editingExpenseHandler
    }

    return <AuthContext.Provider value={authCntx} >
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext