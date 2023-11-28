import { useState } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
	const { loginUser, errors, clearErrors } = useAuth();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const handleChange = (e) => {
		setFormData((oldData) => ({
			...oldData,
			[e.target.name]: e.target.value.trim(),
		}));
		clearErrors();
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
