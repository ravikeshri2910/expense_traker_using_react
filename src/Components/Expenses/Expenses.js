import React, { useContext, useEffect, useState } from "react";

// import classes from './Expenses.module.css'
import ExpensesDetails from "./ExpensesDetails";
// import AuthContext from "../../Store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {ExpenseState} from '../../Store/expenseContext'
import {themeAction} from '../../Store/themeContext'
import { Button } from "react-bootstrap";

const Expenses = (props) => {

    const dispatch = useDispatch()
    const addExpense = useSelector(state => state.expenseReducer.addExpense)
    const addedTotalExpense = useSelector(state => state.themeReducer.totalExpense)
    // console.log('addExpense' ,addExpense)
    const [expenses, setExpenses] = useState([])
    // const [totalExpense , setTotalExpense] = useState()
    // const authCntx = useContext(AuthContext)
    // console.log('totalExpense' ,totalExpense)

    useEffect(() => {
        // Calculate total price when cart items change
        const totalPrice = expenses.reduce((total, expense) => {
            const price = parseFloat(expense.amount);
            return total + price 
        }, 0);
        dispatch(themeAction.updateTotalExpense(totalPrice))
        // setTotalExpense(totalPrice);
    }, [expenses]);


    const getExpenseData = async () => {

        try {

            const res = await fetch('https://react-http-8fcff-default-rtdb.firebaseio.com/expenseTraker.json', {
                method: 'Get',
                headers: {
                    'content-type': 'application/json'
                }
            })

            const data = await res.json()
            console.log(data)

            const loadedData = [];

            for (const key in data) {
                loadedData.push({
                    id: key,
                    amount: data[key].amount,
                    description: data[key].description,
                    category: data[key].category
                })
            }

            setExpenses(loadedData)
            // authCntx.addExpenseHandlerFalse()
            dispatch(ExpenseState.addExpenseHandlerFalse())
        
            // console.log('auth', authCntx)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (addExpense === true) {
            getExpenseData()
        }
    }, [addExpense])

    useEffect(() => {
            getExpenseData()
    }, [])

    // const expenses = 

    const expenseItem = expenses.map((item) => {
        return (<>
            <ExpensesDetails
                key={item.id}
                id={item.id}
                amount={item.amount}
                description={item.description}
                category={item.category}
            />
        </>
        )
    })


    return <>
    { (addedTotalExpense > 10000) &&    <Button variant="success">Lead board</Button>}
        {expenseItem}
    </>
}

export default Expenses
