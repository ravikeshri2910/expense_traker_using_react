import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './logInContext'
import ExpeseReducer from './expenseContext'
import themeReducer from './themeContext'

// const store = configureStore({
//     reducer :{auth : authReducer}
// })

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        expenseReducer: ExpeseReducer,
        themeReducer: themeReducer
    }
});

export default store