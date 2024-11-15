import React, {useState, createContext, useContext, useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(() => {
        const savedSignInStatus = localStorage.getItem('isSignedIn');
        return savedSignInStatus === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isSignedIn', isSignedIn);
    }, [isSignedIn]);

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ isSignedIn, setIsSignedIn , user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
