import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import AuthForm from '../components/Auth/AuthForm';

const Register = () => {
    const initialData = Object.freeze({
        username: '',
        password: '',
        password2: '',
    });

    const { registerUser, errors } = useAuth();
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
        <AuthForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            value={formData}
            path='register'
            errors={errors}
        />
    );
};

export default Register;
