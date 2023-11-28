import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import AuthForm from '../components/Auth/AuthForm';

const Register = () => {
	const initialData = {
		username: '',
		password: '',
		password2: '',
	};

	const { registerUser, errors, clearErrors } = useAuth();
	const [formData, setFormData] = useState(initialData);

	const handleChange = (e) => {
		setFormData((oldData) => ({
			...oldData,
			[e.target.name]: e.target.value.trim(),
		}));
		clearErrors();
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
