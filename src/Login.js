import React, { useState } from 'react';
import { useAuth } from './context/AuthContext'; // Import the useAuth hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = () => {
    const { loginUser } = useAuth(); // Get loginUser function from context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { email, password };
        try {
            // Call loginUser with the entered credentials
            await loginUser(credentials);
            // Navigate to the 'expenses' page on successful login
            navigate('/expenses');
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
