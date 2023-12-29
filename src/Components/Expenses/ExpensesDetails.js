import React, { useContext } from "react";
import { Card ,Button } from 'react-bootstrap';

import classes from './ExpensesDetails.module.css'
// import AuthContext from "../../Store/AuthContext";
import { useDispatch } from "react-redux";
import {ExpenseState} from '../../Store/expenseContext'

const ExpensesDetails = (props) => {

    const dispatch = useDispatch()

    const deleteHandler = async() =>{
        console.log(props.id,props.amount)

        const res = await fetch(`https://react-http-8fcff-default-rtdb.firebaseio.com/expenseTraker/${props.id}.json`,{
            method : 'DELETE'
    
        })

        const data = await res.json()

        // authCntx.addExpenseHandler()
        dispatch(ExpenseState.addExpenseHandler())
        console.log(data)
        
    }

    const editHandler = () =>{
        const id = props.id
        localStorage.setItem('id', id)
        // authCntx.editingExpenseHandler()
        dispatch(ExpenseState.editingExpenseHandler())

        // const res = await fetch(`https://react-http-8fcff-default-rtdb.firebaseio.com/expenseTraker/${props.id}.json`, {
        //     method: 'Get',
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // })

        // const data = await res.json()
        // console.log(data)
    }
    return (
        <div className={classes.mainContainer}>
            <div>
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Rs : {props.amount}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.category}</Card.Subtitle>
                        <Card.Text>
                            {props.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className={classes.btnContainer}>
                <Button onClick={editHandler} variant="info">Edit</Button>{' '}
                <Button onClick={deleteHandler} variant="danger">Delete</Button>{' '}
            </div>
        </div>
    );
}

export default ExpensesDetails