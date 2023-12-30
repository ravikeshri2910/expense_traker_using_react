import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token')

const initialValue = {
    token : initialToken,
    isLoggedIn : initialToken,
    email : localStorage.getItem('email')
}

const auth = createSlice ({

    name : 'auth',
    initialState : initialValue,
    reducers :{
        logOutHandler(state){
            state.token = null;
            state.isLoggedIn = null
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            state.email = null
        },
    
        logInHandler(state, action) {
           state.token = action.payload
           if(action.payload){
            state.isLoggedIn = action.payload
            localStorage.setItem('token', action.payload)
           }
        },

        addEmail(state, action){
            console.log(action.payload)
            state.email = action.payload
            localStorage.setItem('email', action.payload)

        }
    }
})

export const authActions = auth.actions
export default auth.reducer