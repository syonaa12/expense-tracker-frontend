import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './expenses.css';
import PieChart from './PieChart'; // Import the PieChart component
import { useNavigate } from 'react-router-dom';


const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState(null); // For error handling
    const navigate = useNavigate();

    useEffect(() => {
        const storedExpenses = localStorage.getItem('expenses');
        if (storedExpenses) {
            setExpenses(JSON.parse(storedExpenses));
        } else {
            // Fetch expenses from the API if not available in localStorage
            const fetchExpenses = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:8000/api/expenses/');
                    setExpenses(response.data);
                    localStorage.setItem('expenses', JSON.stringify(response.data));
                } catch (error) {
                    console.error("Error fetching expenses:", error);
                }
            };
            fetchExpenses();
        }
    }, []);
    // Empty dependency array means it runs once after component mounts

    const handleAddExpense = async (e) => {
        e.preventDefault();
    
        // Check for empty fields
        if (!category || !description || !amount) {
            setError("All fields are required!");
            return;
        }
    
        const newExpense = { category, description, amount: parseFloat(amount) };
    
        try {
            // Send POST request to add expense
            const response = await axios.post('http://127.0.0.1:8000/api/expenses/', newExpense);
    
            // Update state with the server's response data
            setExpenses((prevExpenses) => [...prevExpenses, response.data]);
    
            // Clear input fields and reset error state
            setCategory('');
            setDescription('');
            setAmount('');
            setError(null);
        } catch (error) {
            console.error("Error adding expense:", error);
            setError("Failed to add expense. Please try again.");
        }
    };
    

    return (
        <div>
            <h2>Add New Expense</h2>
            <form onSubmit={handleAddExpense}>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Expense Category"
                    required
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Expense Description"
                    required
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    required
                />
                <button type="submit">Add Expense</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error message */}

            <h2>Past Expenses</h2>
            {expenses.length > 0 ? (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            {expense.category} - {expense.description} : Amount - INR {expense.amount} 
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No expenses recorded yet.</p>
            )}

            <h1>PieChart</h1>

            <PieChart expenses={expenses} /> {/* Render the PieChart here */}

            <h1>Budget</h1>

            <button onClick={() => navigate('/budget')}>Go to Budget</button>

        </div>
    );
};

export default Expenses;
