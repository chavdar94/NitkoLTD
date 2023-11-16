import { useState } from 'react';
import FormField from '../Auth/FormField';
import axiosInstance from '../../utils/axios';

import styles from './CreateWorker.module.css';

const CreateWorker = ({ onWorkerAdded }) => {
	const initialValues = {
		first_name: '',
		last_name: '',
		wage: '',
	};

	const [formData, setFormData] = useState(initialValues);

	const handleChange = (e) => {
		setFormData((oldState) => ({
			...oldState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axiosInstance.post('workers/', formData);

		if (response.status === 201) {
			onWorkerAdded();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Добави работник</h2>
			<FormField
				label='Име'
				name='first_name'
				htmlFor='first_name'
				placeholder='Име...'
				type='text'
				value={formData.first_name}
				onChange={handleChange}
			/>
			<FormField
				label='Фамилия'
				name='last_name'
				htmlFor='last_name'
				placeholder='Фамилия...'
				type='text'
				value={formData.last_name}
				onChange={handleChange}
			/>
			<FormField
				label='Заплата'
				name='wage'
				htmlFor='wage'
				placeholder='Заплата...'
				type='text'
				value={formData.wage}
				onChange={handleChange}
			/>
			<button className={styles['btn-add']}>Добави</button>
		</form>
	);
};

export default CreateWorker;
