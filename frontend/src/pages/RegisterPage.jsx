import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/Auth/AuthForm';

const Register = () => {
    const initialData = Object.freeze({
        username: '',
        password: '',
        password2: '',
    });

    const { registerUser, errors } = useContext(AuthContext);
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        setFormData((oldData) => ({
            ...oldData,
            [e.target.name]: e.target.value.trim(),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        registerUser(formData);
    };

    return (
        <div>
            <AuthForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                value={formData}
                path='register'
                errors={errors}
            />
        </div>
    );
};

export default Register;
