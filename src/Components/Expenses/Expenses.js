import React, { useContext, useEffect, useState } from "react";

import classes from './Expenses.module.css'
import ExpensesDetails from "./ExpensesDetails";
// import AuthContext from "../../Store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseState } from '../../Store/expenseContext'
import { themeAction } from '../../Store/themeContext'
import { Button } from "react-bootstrap";
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the jspdf-autotable plugin


const Expenses = (props) => {

    // Redux state management hooks
    const dispatch = useDispatch()
    const addExpense = useSelector(state => state.expenseReducer.addExpense)
    const addedTotalExpense = useSelector(state => state.themeReducer.totalExpense)

    // Local state for expenses
    const [expenses, setExpenses] = useState([])

    // Effect to recalculate total price when expenses change
    useEffect(() => {
        // Calculate total price when expense change
        const totalPrice = expenses.reduce((total, expense) => {
            const price = parseFloat(expense.amount);
            return total + price
        }, 0);
        dispatch(themeAction.updateTotalExpense(totalPrice))
        // setTotalExpense(totalPrice);
    }, [expenses]);

    // Function to fetch expense data from API
    const getExpenseData = async () => {

        try {

            const res = await fetch('https://react-http-8fcff-default-rtdb.firebaseio.com/expenseTraker.json', {
                method: 'Get',
                headers: {
                    'content-type': 'application/json'
                }
            })

            const data = await res.json()
            console.log(data)

            const loadedData = [];

            for (const key in data) {
                loadedData.push({
                    id: key,
                    amount: data[key].amount,
                    description: data[key].description,
                    category: data[key].category
                })
            }

            setExpenses(loadedData)
            // authCntx.addExpenseHandlerFalse()
            dispatch(ExpenseState.addExpenseHandlerFalse())

            // console.log('auth', authCntx)

        } catch (error) {
            console.log(error)
        }
    }

    // Fetch data when addExpense state changes or on component mount
    useEffect(() => {
        if (addExpense === true) {
            getExpenseData()
        }
    }, [addExpense])

    useEffect(() => {
        getExpenseData()
    }, [])


    // Function to render individual expense items
    const expenseItem = expenses.map((item) => {
        return (<>
            <ExpensesDetails
                key={item.id}
                id={item.id}
                amount={item.amount}
                description={item.description}
                category={item.category}
            />
        </>
        )
    })

    // Function to download expense data as a text file
    const downloadExpenseData = () => {
        const expenseData = expenses.map(item => {
            return `ID: ${item.id}, Amount: ${item.amount}, Description: ${item.description}, Category: ${item.category}`;
        }).join('\n');

        const blob = new Blob([expenseData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'expenses.txt');
        link.style.display = 'none'; // Hide the link
        document.body.appendChild(link);

        // Simulate click on the link to start download
        link.click();

        // Clean up: remove the link and revoke the URL object
        link.parentNode.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Function to download expense data as a PDF file
    const downloadExpenseDataAsPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Serial no.", "ID", "Amount", "Description", "Category"];
        const tableRows = [];

        expenses.forEach((item, index) => {
            const rowData = [
                index + 1, // Serial number (index + 1)
                item.id,
                item.amount,
                item.description,
                item.category
            ];
            tableRows.push(rowData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows
        });

        // Save the PDF with a specific name
        doc.save('expenses.pdf');
    };


    return <div className={classes.expenseDiv}>
        
        {/* Render buttons based on conditions */}
        {(addedTotalExpense > 10000) && <Button variant="success">Lead board</Button>}
        {(addedTotalExpense > 10000) && <Button variant="success" onClick={downloadExpenseData}>DownLoad</Button>}
        {(addedTotalExpense > 10000) && <Button variant="success" onClick={downloadExpenseDataAsPDF}>DownLoad as PDF</Button>}

        {/* Render individual expense items */}
        {expenseItem}
    </div>
}

export default Expenses
