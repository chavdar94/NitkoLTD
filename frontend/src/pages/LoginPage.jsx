import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/Auth/AuthForm';

const LoginPage = () => {
    const { loginUser, errors } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.value.trim(),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(formData);
    };

    return (
        <div>
            <AuthForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                value={formData}
                path='login'
                errors={errors}
            />
        </div>
    );
};

export default LoginPage;
