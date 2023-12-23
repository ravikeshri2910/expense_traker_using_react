import React, { useContext, useEffect, useState } from "react";

import classes from './Expenses.module.css'
import ExpensesDetails from "./ExpensesDetails";
import AuthContext from "../../Store/AuthContext";

const Expenses = (props) => {

    const [expenses, setExpenses] = useState([])
    const authCntx = useContext(AuthContext)


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
            authCntx.addExpenseHandlerFalse()
        
            // console.log('auth', authCntx)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (authCntx.expenseAdding === true) {
            getExpenseData()
        }
    }, [authCntx.expenseAdding])

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
        {expenseItem}
    </>
}

export default Expenses
