import React from "react";
import {Navbar, Container , Nav } from 'react-bootstrap'
import { Link } from "react-router-dom"
import classes from './Navbar.module.css'


const MainNavbar = (props) => {

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/home">Expense Traker</Navbar.Brand>
                <div className={classes.navItemContainer}>
                    <Link className = {classes.navItem} href="#home">Home</Link>
                    <Link className = {classes.navItem} href="#features">Features</Link>
                    <Link className = {classes.navItem} to = '/sinup' >Sin Out</Link>
                </div>
            </Container>
        </Navbar>
    )
}

export default MainNavbar