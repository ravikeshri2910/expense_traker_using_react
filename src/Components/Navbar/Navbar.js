import React, { useContext } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link,NavLink } from "react-router-dom"
import classes from './Navbar.module.css'
import AuthContext from "../../Store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/logInContext";


const MainNavbar = (props) => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    // console.log('isLoggedIn' , isLoggedIn)
    // const authCntx = useContext(AuthContext) // using useContext hook

    const sinOutHandler = () =>{
        // console.log('sinOut')
        dispatch(authActions.logOutHandler())
        // authCntx.logOut()
    }

    return (
        <Navbar className={classes.navBar} bg="dark" data-bs-theme="dark">
            <Container>
                <Link className={classes.navItem} to="/"><Navbar.Brand >Expense Traker</Navbar.Brand></Link>
                <Nav className={classes.navItemContainer}>
                
                    <Link className={classes.navItem} to="/">Home</Link>

                    {isLoggedIn && <Link className={classes.navItem} to='/verify-email'>Verify Email</Link>}

                    {isLoggedIn && <Link onClick = {sinOutHandler} className={classes.navItem} to='/sinup' >Sin Out</Link>}

                    {!isLoggedIn && <Link className={classes.navItem} to='/sinup' >Sin In</Link>}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default MainNavbar

// const MainNavbar = (props) => {
//     return (
//         <Navbar className={classes.navBar} bg="dark" data-bs-theme="dark">
//             <Container>
//                 <Link className={classes.navItem} to="/">
//                     <Navbar.Brand>Expense Tracker</Navbar.Brand>
//                 </Link>
//                 <Nav className={classes.navItemContainer}>
//                     <NavLink className={classes.navItem} to="/sinup" exact activeClassName={classes.active}>
//                         Home
//                     </NavLink>
//                     <NavLink className={classes.navItem} to="/" activeClassName={classes.active}>
//                         Features
//                     </NavLink>
//                     <Link className={classes.navItem} to='/sinup'>
//                         Sign Out
//                     </Link>
//                 </Nav>
//             </Container>
//         </Navbar>
//     )
// }

// export default MainNavbar;