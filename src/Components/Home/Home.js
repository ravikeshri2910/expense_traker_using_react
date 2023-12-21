import React from "react";
import { Link } from "react-router-dom";

import classes from './Home.module.css'

const Home = (props) =>{

    return (
        <>
        <div className={classes.homeContainer}>
            <p>Welcome to expense traker!!!</p>
            <p>Your profile is incomplete, <Link to = '/contact-form' ><span>Complete Now</span> </Link></p>
        </div><hr/>
        </>
    )
}

export default Home