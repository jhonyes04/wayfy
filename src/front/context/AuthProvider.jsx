import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    );

    const [token, setToken] = useState(user ? user.token : null);

    const login = (userData) => {
        sessionStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setToken(userData.token);
    };

    const logout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        setToken(null);
        navigate('/')
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
