import { useState } from 'react';
import FormField from '../Auth/FormField';
import styles from '../Fields/FieldsForm/FieldsForm.module.css';
import * as profileServices from '../../services/profileService';

const ProfileEdit = ({ onProfileAdded, userId }) => {
	const [formData, setFormData] = useState({
		email: '',
		firstName: '',
		lastName: '',
	});

	const handleChange = (e) => {
		setFormData((oldState) => ({
			...oldState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(userId);
		const data = {
			email: formData.email,
			first_name: formData.firstName,
			last_name: formData.lastName,
			user: userId,
		};

		const response = await profileServices.createProfile(data);
		console.log(response);
		// if (response.status === 201) {
		// 	onProfileAdded();
		// }
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormField
				label='Email'
				name='email'
				htmlFor='email'
				placeholder='Email...'
				type='email'
				value={formData.email}
				onChange={handleChange}
			/>

			<FormField
				label='Име'
				name='firstName'
				htmlFor='firstName'
				placeholder='Име...'
				type='text'
				value={formData.firstName}
				onChange={handleChange}
			/>

			<FormField
				label='Фамилия'
				name='lastName'
				htmlFor='lastName'
				placeholder='Фамилия...'
				type='text'
				value={formData.lastName}
				onChange={handleChange}
			/>
			<button className={styles['btn-add']}>Добави</button>
		</form>
	);
};

export default ProfileEdit;
