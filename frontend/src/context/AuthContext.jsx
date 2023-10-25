import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const initiaAuthlValue = localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens'))
        : null;

    const initialUserValue = localStorage.getItem('authTokens')
        ? jwt_decode(localStorage.getItem('authTokens'))
        : null;

    const [authTokens, setAuthTokens] = useState(() => initiaAuthlValue);
    const [user, setUser] = useState(() => initialUserValue);
    const [loading, setLoading] = useState(true);

    const loginUser = async ({ username, password }) => {
        try {
            const response = axiosInstance.post('token/', {
                username: username,
                password: password,
            });
            const { status, data } = await response;

            if (status === 200) {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                setErrors({});
                navigate('/');
            }
        } catch (err) {
            setErrors(err.response.data);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    const registerUser = async ({ username, password, password2 }) => {
        if (password !== password2) {
            setErrors({ password: 'Паролите не съвпадат!' });
            return;
        }
        try {
            const response = await axiosInstance.post('auth/register/', {
                username: username,
                password: password,
            });

            if (response.status === 201) {
                setErrors({});
                navigate('/login');
            }
        } catch (err) {
            setErrors(err.response.data);
        }
    };
    const updateTokens = async () => {
        if (authTokens) {
            try {
                const response = axiosInstance.post('token/refresh/', {
                    refresh: authTokens?.refresh,
                });

                const { status, data } = await response;

                if (status === 200) {
                    setAuthTokens(data);
                    setUser(jwt_decode(data.access));
                    localStorage.setItem('authTokens', JSON.stringify(data));
                } else {
                    logoutUser();
                }
            } catch (err) {
                console.error(err);
            }
        }

        if (loading) {
            setLoading(false);
        }
    };

    let contextData = {
        user: user,
        authTokens: authTokens,
        errors: errors,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
    };

    useEffect(() => {
        if (loading) {
            updateTokens();
        }

        const updateTimer = 1000 * 60 * 4;
        const interval = setInterval(() => {
            if (authTokens) {
                updateTokens();
            }
        }, updateTimer);

        return () => clearInterval(interval);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
