import React, { useState, useRef, useEffect, useContext } from "react";
import { Form, Button } from 'react-bootstrap'

import classes from './AddExpenseForm.module.css'
import AmountImage from '../../Images/amount.png'
import DesImage from '../../Images/description.png'
import CategoryImage from '../../Images/category.png'
import AuthContext from "../../Store/AuthContext";
// import {useDispach , useSelector} from 'react-redux'
import { useSelector, useDispatch } from 'react-redux';
import {ExpenseState} from '../../Store/expenseContext'
import {authActions} from '../../Store/logInContext'

const AddExpenseForm = (props) => {
    
    const dispatch = useDispatch()

    const addExpense = useSelector(state => state.expenseReducer.addExpense)
    const editExpense = useSelector(state => state.expenseReducer.editExpense)
    const userEmail = useSelector(state => state.auth.email)


    console.log('editExpense' , editExpense)

    const enteredAmountRef = useRef()
    const enteredDescriptionRef = useRef()
    const enteredCategoryRef = useRef()

    const authCntx = useContext(AuthContext)

    const [isLodding, setIsLodding] = useState(false)
    const [isEditing, setIsEditing] = useState(false)


    const addExpenseHandler = async (event) => {
        event.preventDefault()
        console.log('userEmail' , userEmail)
        setIsLodding(true)
        const res = await fetch('https://react-http-8fcff-default-rtdb.firebaseio.com/expenseTraker.json', {
            method: 'POST',
            body: JSON.stringify({
                amount: enteredAmountRef.current.value,
                description: enteredDescriptionRef.current.value,
                category: enteredCategoryRef.current.value,
                email : userEmail
            }),
            headers: {
                'content-type': 'application/json'
            }
        })

        setIsLodding(false)
        enteredAmountRef.current.value = '';
        enteredDescriptionRef.current.value = '';
        enteredCategoryRef.current.value = '';

        // console.log('authCntx', authCntx)
        // authCntx.addExpenseHandler()
        dispatch(ExpenseState.addExpenseHandler())
        const data = await res.json()
        console.log(data)

        // console.log(obj)
    }


    const getEditingData = async () => {
        const id = localStorage.getItem('id')
        const res = await fetch(`https://react-http-8fcff-default-rtdb.firebaseio.com/expenseTraker/${id}.json`, {
            method: 'Get',
            headers: {
                'content-type': 'application/json'
            }
        })

        const data = await res.json()
        console.log('here')
        // authCntx.editingExpenseHandler()
        dispatch(ExpenseState.editingExpenseHandler())

        enteredAmountRef.current.value = data.amount;
        enteredDescriptionRef.current.value = data.description;
        enteredCategoryRef.current.value = data.category;
        setIsEditing(true)
        console.log(data)
    }

    useEffect(() => {
        if (editExpense === true) {
            getEditingData()
        }
    }, [editExpense])

    const editExpenseHandler = async () => {
        setIsLodding(true)
        const id = localStorage.getItem('id')
        const res = await fetch(`https://react-http-8fcff-default-rtdb.firebaseio.com/expenseTraker/${id}.json`,{
            method : 'PUT',
            body : JSON.stringify({
                amount: enteredAmountRef.current.value,
                description: enteredDescriptionRef.current.value,
                category: enteredCategoryRef.current.value,
                email : userEmail
            }),
            headers: {
                'content-type': 'application/json'
            }
        
        })
        localStorage.removeItem('id')
        setIsEditing(false)
        setIsLodding(false)
        enteredAmountRef.current.value = '';
        enteredDescriptionRef.current.value = '';
        enteredCategoryRef.current.value = '';

        // authCntx.addExpenseHandler()
        dispatch(ExpenseState.addExpenseHandler())
        const data = await res.json()
        // console.log('data' , data)
    }


    return (
        <div className={classes.formContainer}>
            <h3>Enter Expense</h3>
            <form className={classes.form}>

                <label><span><img src={AmountImage} /></span><b>Enter amount :</b></label>
                <input type="text" ref={enteredAmountRef}></input><br></br>
                <label><span><img src={DesImage} /></span><b>Description :</b></label>
                <textarea type="text" ref={enteredDescriptionRef}></textarea><br></br>
                <label><span><img src={CategoryImage} /></span><b>Category :</b></label>
                <select ref={enteredCategoryRef} id="cars" name="cars">
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="gloceries">Gloceries</option>
                </select>
                {/* <input type="text"></input><br /> */}

                <div className={classes.buttonDiv}>
                    {!isLodding && !isEditing && <Button onClick={addExpenseHandler} variant="info"><b>Submit</b></Button>}
                    {!isLodding && isEditing && <Button onClick={editExpenseHandler} variant="info"><b>Update</b></Button>}
                    {isLodding && <p><b>Updating...</b></p>}
                </div>
            </form>

        </div>
    )


}

export default AddExpenseForm