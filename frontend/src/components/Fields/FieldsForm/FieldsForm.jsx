import { useState } from 'react';
import FormField from '../../Auth/FormField';
import * as fieldServices from '../../../services/fieldService';

const initialValues = {
	name: '',
	size: '',
};

const FieldsForm = ({ onFieldAdded }) => {
	const [formData, setFormData] = useState(initialValues);

	const handleChange = (e) => {
		setFormData((oldState) => ({
			...oldState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fieldServices.create(formData);

		if (response.status === 201) {
			onFieldAdded();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormField
				label='Име'
				name='name'
				htmlFor='name'
				placeholder='Име...'
				type='text'
				value={formData.name}
				onChange={handleChange}
			/>

			<FormField
				label='Размер'
				name='size'
				htmlFor='size'
				placeholder='Размер...'
				type='number'
				value={formData.size}
				onChange={handleChange}
			/>
			<button>Добави</button>
		</form>
	);
};

export default FieldsForm;
