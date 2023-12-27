import {createSlice} from '@reduxjs/toolkit'

const initialValue ={
    addExpense : false,
    editExpense : false
}

const expeseSlicer = createSlice({
    name : 'expense',
    initialState : initialValue,
    reducers :{
        addExpenseHandler (state) {
          state.addExpense = true;
        },
        addExpenseHandlerFalse(state)  {
           state.addExpense=false;
        },
    
        editingExpenseHandler (state){
            state.editExpense = !state.editExpense
        }
    }
})

export const ExpenseState = expeseSlicer.actions
export default expeseSlicer.reducer