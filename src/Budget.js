import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Budget.css';

const Budget = () => {
    const [expenses, setExpenses] = useState([]);  // Track the expenses
    const [budget, setBudget] = useState(0);  // Initialize as a number (0)
    const [remainingBudget, setRemainingBudget] = useState(0);  // Track remaining budget

    useEffect(() => {
        // Fetch expenses from API or local data
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/expenses/');
                setExpenses(response.data);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };
        fetchExpenses();
    }, []);  // Fetch expenses once when the component mounts

    const calculateRemainingBudget = () => {

        const numericBudget = isNaN(budget) ? 0 : budget;

        // Calculate the total of all expenses (convert amount to number)
        const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);

        const validTotalExpenses = isNaN(totalExpenses) ? 0 : totalExpenses;
        setRemainingBudget(numericBudget - validTotalExpenses);
    };

    useEffect(() => {
        calculateRemainingBudget();
    }, [expenses, budget]);  

    return (
        <div className="budget-container">
            <h2>Budget</h2>
            <label>
                Set Budget: 
                <input
                    type="number"
                    value={budget === 0 ? "" : budget} // Display an empty string if budget is 0
                    onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                    onFocus={(e) => e.target.value === "0" && setBudget("")} // Clear 0 on focus
                    placeholder="Enter your budget"
                />

            </label>
            <p>Initial Budget: INR {budget}</p>
            <p>Remaining Budget: INR {remainingBudget.toFixed(2)}</p> {/* Format remaining budget to 2 decimal places */}
            <button onClick={calculateRemainingBudget}>Update Remaining Budget</button>
        </div>
    );
};

export default Budget;
