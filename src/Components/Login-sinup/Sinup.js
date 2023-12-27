import React, { useRef, useState ,useContext} from 'react'
import { Link } from 'react-router-dom'

import classes from './Sinup.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../Store/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from '../../Store/logInContext'

const Sinup = (props) => {
    const dispatch  = useDispatch()
    const token = useSelector(state => state.auth.token)

    const [isLogin, setIsLogin] = useState(true);
    const [isLodding, setIsLodding] = useState(false);
    const history = useHistory()

    const authCntx = useContext(AuthContext)

    const enteredEmailRef = useRef()
    const enteredPasswordRef = useRef()
    const enteredConfirmPasswordRef = useRef()



    const submiLogIntHandler = async (event) => {

        try {
            event.preventDefault()
            // console.log('here')
            setIsLodding(true)
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBG525dQLh8AKxMmQHyiyUSkRG5YJkahPw', {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmailRef.current.value,
                    password: enteredPasswordRef.current.value,
                    returnSecureToken: true
                }),
                headers: {
                    'content-type': 'application/json'
                }
            })
            setIsLodding(false)
            const data = await res.json()
            console.log('data', data)

            if(data.idToken){
                history.replace('/')

                dispatch(authActions.logInHandler(data.idToken))

                // authCntx.logIn(data.idToken)
                // console.log('authCon', authCntx.isLoggedIn)
                // console.log(data.idToken)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const submiSinuptHandler = async (event) => {
        event.preventDefault()


        let enteredPassword;

        if (enteredPasswordRef.current.value === enteredConfirmPasswordRef.current.value) {

            enteredPassword = enteredPasswordRef.current.value
        } else {
            alert('Password not matched')
            return
        }

        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBG525dQLh8AKxMmQHyiyUSkRG5YJkahPw`, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmailRef.current.value,
                password: enteredPassword,
                returnSecureToken: true
            }),
            headers: {
                'content-type': 'application/json'
            }
        })

        const data = await res.json()

        if (data.idToken) {
            alert('Successfully Registered')
            switchAuthModeHandler()
        }
        if (data.error) {
            alert(data.error.message)
        }
        console.log('data', JSON.stringify(data))

    }

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    }


    return <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={isLogin ? submiLogIntHandler : submiSinuptHandler}>
            <div className={classes.control}>
                <label htmlFor='email'>Your Email</label>
                <input type='email' id='email' ref={enteredEmailRef} required />
            </div>
            <div className={classes.control}>
                <label htmlFor='password'>Your Password</label>
                <input
                    type='password'
                    id='password'
                    ref={enteredPasswordRef}
                    required
                />
                {!isLogin && <div className={classes.control}>
                    <label htmlFor='password'>Confirm Your Password</label>
                    <input
                        type='password'
                        id='confirmpassword'
                        ref={enteredConfirmPasswordRef}
                        required
                    />
                </div>}
            </div>

            {!isLodding && <button type='submit'>Submit</button>}
            {isLodding && <p>Loading...</p>}

            <div className={classes.actions}>
                <Link to = '/forget-password'><p>Forget Password</p></Link>
            </div>

            <div className={classes.actions}>
                <button
                    type='button'
                    className={classes.toggle}
                    onClick={switchAuthModeHandler}
                >
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
            </div>

        </form>
    </section>

}

export default Sinup