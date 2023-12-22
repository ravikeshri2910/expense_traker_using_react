import React, { useContext } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link,NavLink } from "react-router-dom"
import classes from './Navbar.module.css'
import AuthContext from "../../Store/AuthContext";


const MainNavbar = (props) => {

    const authCntx = useContext(AuthContext)

    const sinOutHandler = () =>{
        console.log('sinOut')
        authCntx.logOut()
    }

    return (
        <Navbar className={classes.navBar} bg="dark" data-bs-theme="dark">
            <Container>
                <Link className={classes.navItem} to="/"><Navbar.Brand >Expense Traker</Navbar.Brand></Link>
                <Nav className={classes.navItemContainer}>
                
                    <Link className={classes.navItem} to="/">Home</Link>

                    <Link className={classes.navItem} to='/verify-email'>Verify Email</Link>

                    {authCntx.isLoggedIn && <Link onClick = {sinOutHandler} className={classes.navItem} to='/sinup' >Sin Out</Link>}

                    {!authCntx.isLoggedIn && <Link className={classes.navItem} to='/sinup' >Sin In</Link>}
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