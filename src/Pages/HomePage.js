import React from "react";

import classes  from './HomePage.module.css'
import Home from "../Components/Home/Home";
import AddExpenseForm from "../Components/AddExpenseForm/AddExpenseForm";
import Expenses from "../Components/Expenses/Expenses";

const HomePage = () => {
   return <>
      <Home />
      <main className={classes.main}>
         <AddExpenseForm />
         <div>

         <Expenses />
         </div>
      </main>
   </>
}

export default HomePage