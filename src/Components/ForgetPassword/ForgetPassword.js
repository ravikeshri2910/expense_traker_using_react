import React, { useRef } from "react";
import { Button } from "react-bootstrap";

import classes from './ForgetPassword.module.css'

const ForgetPassword = (props) => {

    const enteredEmailRef = useRef()

    const enterEmailHandler = async(event) =>{
        event.preventDefault()
        try{

            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBG525dQLh8AKxMmQHyiyUSkRG5YJkahPw',{
                method : 'POST',
                body : JSON.stringify({
                    requestType:"PASSWORD_RESET",
                    email:enteredEmailRef.current.value
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json()
            console.log('data', data)

        }catch(error){
            console.log(error)
        }
    }
    return <div>
        <h3>Forget Password</h3>
        <form className={classes.VerifyEmailForm}>
            <label><b>Enter your Email</b></label>
            <input ref={enteredEmailRef} type="text"></input>

            <Button onClick={enterEmailHandler} variant="info"><b>Submit</b></Button>
        </form>
    </div>
}

export default ForgetPassword