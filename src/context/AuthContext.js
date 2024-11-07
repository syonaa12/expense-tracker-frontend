import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// AuthProvider component to wrap your app and provide auth state and functions
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Login function
    const login = (userData) => {
        setUser(userData); // Set user data after successful login
        localStorage.setItem('user', JSON.stringify(userData)); // Optional: Store user info in localStorage for persistence
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user info from localStorage
    };

    // Function to handle login
    const loginUser = async (credentials) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', credentials);
            if (response.data && response.data.user) {
                login(response.data.user); // Set the user data in the context
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext in components
export const useAuth = () => {
    return useContext(AuthContext);
};
