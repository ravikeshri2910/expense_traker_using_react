import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import ProfileImage from '../../Images/unknown-person-icon.png'
import GlobeImage from '../../Images/world-globe-line-icon.png'

import classes from './ContactForm.module.css'
import AuthContext from "../../Store/AuthContext";

const ContactForm = (props) => {

    const authCntx = useContext(AuthContext)

    const [isLodding, setIsLodding] = useState(false)

    const nameRef = useRef('')
    const imageUrlRef = useRef('')

    const getProfiledataHandler = async () => {

        try {

            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBG525dQLh8AKxMmQHyiyUSkRG5YJkahPw', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCntx.token
                }),
                headers: {
                    'content-type': 'application/json'
                }
            })

            const data = await res.json()

            nameRef.current.value = data.users[0].displayName || ''
            imageUrlRef.current.value = data.users[0].photoUrl || ''
            console.log('data', data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfiledataHandler()
    }, [])

    const UpdateHandler = async (event) => {
        event.preventDefault()

        const name = nameRef.current.value;
        const imageUrl = imageUrlRef.current.value;

        setIsLodding(true)
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBG525dQLh8AKxMmQHyiyUSkRG5YJkahPw', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCntx.token,
                displayName: name,
                photoUrl: imageUrl,
                returnSecureToken: true
            }),
            headers: {
                'content-type': 'application/json'
            }
        })

        const data = await res.json()
        nameRef.current.value = ''
        imageUrlRef.current.value = ''
        setIsLodding(false)
        alert('Updated')
        console.log('data', data)
    }
    const cancelHandler = (event) => {
        event.preventDefault()
        console.log('here')
    }

    return <div className={classes.formContainer}>
        <h3>Enter Details</h3>
        <form className={classes.form}>

            <label><span><img src={ProfileImage} /></span><b>Full Name :</b></label>
            <input ref={nameRef} type="text"></input><br></br>
            <label><span><img src={GlobeImage} /></span><b>Profile Photo Url :</b></label>
            <input ref={imageUrlRef} type="text"></input><br />

            <div className={classes.buttonDiv}>
                {!isLodding && <Button onClick={UpdateHandler} variant="info"><b>Update</b></Button>}
                {isLodding && <p><b>Updating...</b></p>}
                {!isLodding && <Button onClick={cancelHandler} variant="info"><b>Cancel</b></Button>}
            </div>
        </form>

    </div>
}

export default ContactForm