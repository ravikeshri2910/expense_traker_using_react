import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'

import classes from './AddExpenseForm.module.css'
import AmountImage from '../../Images/amount.png'
import DesImage from '../../Images/description.png'
import CategoryImage from '../../Images/category.png'

const AddExpenseForm = (props) => {

    const [isLodding, setIsLodding] = useState(false)

    const addExpenseHandler = (event) => {
        event.preventDefault()
    }
    return (
        <div className={classes.formContainer}>
            <h3>Enter Expense</h3>
            <form className={classes.form}>

                <label><span><img src={AmountImage} /></span><b>Enter amount :</b></label>
                <input type="text"></input><br></br>
                <label><span><img src={DesImage}/></span><b>Description :</b></label>
                <textarea type="text"></textarea><br></br>
                <label><span><img src={CategoryImage} /></span><b>Category :</b></label>
                <select id="cars" name="cars">
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="gloceries">Gloceries</option>
                </select>
                {/* <input type="text"></input><br /> */}

                <div className={classes.buttonDiv}>
                    {!isLodding && <Button onClick={addExpenseHandler} variant="info"><b>Submit</b></Button>}
                    {isLodding && <p><b>Updating...</b></p>}
                </div>
            </form>

        </div>
    )


}

export default AddExpenseForm