import {configureStore} from '@reduxjs/toolkit'
import AuthReducer  from './logInContext'
import ExpeseReducer from './expenseContext'

// const store = configureStore({
//     reducer :{auth : authReducer}
// })

const store = configureStore({
    reducer:  { auth : AuthReducer , expenseReducer : ExpeseReducer}
});

export default store