import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    );

    const [token, setToken] = useState(user ? user.token : null);

    const login = (userData) => {
        sessionStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);          // ← FALTABA ESTO
        setToken(userData.token);
    };

    const logout = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        setToken(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
