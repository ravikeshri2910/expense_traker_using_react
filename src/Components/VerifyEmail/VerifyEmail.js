import React, { useContext, useRef } from "react";
import { Button } from "react-bootstrap";

import classes from './VerifyEmail.module.css'
import AuthContext from "../../Store/AuthContext";

const VerifyEmail = (props) => {

    const authCntx = useContext(AuthContext)
    const enteredEmailRef = useRef()

    const enterEmailHandler = async (event) => {
        try {
            event.preventDefault()

            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBG525dQLh8AKxMmQHyiyUSkRG5YJkahPw', {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'VERIFY_EMAIL',
                    idToken: authCntx.token
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json()
            enteredEmailRef.current.value = ''
            alert('Email verified')
            // console.log('data', data)
        } catch (error) {
            console.log(error)
        }
    }

    console.log('email')
    return <div>
        <form className={classes.VerifyEmailForm}>
            <label><b>Enter Email</b></label>
            <input ref={enteredEmailRef} type="text"></input>

            <Button onClick={enterEmailHandler} variant="info"><b>Submit</b></Button>
        </form>
    </div>
}

export default VerifyEmail