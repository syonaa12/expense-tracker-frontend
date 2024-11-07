import './GetStarted.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Save the username and password to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        // Redirect to login page after signup
        navigate('/login');
    };

    return (
        <form onSubmit={handleSignup}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />

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
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default Signup;

