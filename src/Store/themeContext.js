import { createSlice } from "@reduxjs/toolkit";


const initiaValue = {
    totalExpense : 0,
    theme : 'light'
}

const themeSlice = createSlice({
    name : 'theme',
    initialState : initiaValue,
    reducers :{
        updateTotalExpense(state , action){
            state.totalExpense = action.payload;
        },
        updateTheme(state){
            console.log('state.theme' ,state.theme)
            state.theme = state.theme ===  'light' ? 'dark' : 'light';
        }
    }
})

export const themeAction = themeSlice.actions
export default themeSlice.reducer