import { useEffect, useState } from 'react';
import FormField from '../../Auth/FormField';
import * as fieldServices from '../../../services/fieldService';
import * as workerService from '../../../services/workerService';
import transformWorkerData from '../../../utils/WorkerDataTransform';
import JobField from '../../Jobs/JobField/JobField';

import styles from './FieldsForm.module.css';

const initialValues = {
	name: '',
	size: '',
	workerId: '',
};

const FieldsForm = ({ onFieldAdded }) => {
	const [formData, setFormData] = useState(initialValues);
	const [workers, setWorkers] = useState([]);

	useEffect(() => {
		workerService.getAll().then((data) => setWorkers(data));
	}, []);

	const handleChange = (e) => {
		setFormData((oldState) => ({
			...oldState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fieldServices.create({
			...formData,
			workersIds: [formData.workerId],
		});

		console.log(response);

		if (response.status === 201) {
			onFieldAdded();
		}
	};

	const workerData = workers.map((worker) => transformWorkerData(worker));

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

			<JobField
				htmlFor='worker'
				label='Работник'
				value={formData.workerId}
				name='workerId'
				onChange={handleChange}
				data={workerData}
				optionText='Избор на работник'
			/>
			<button className={styles['btn-add']}>Добави</button>
		</form>
	);
};

export default FieldsForm;
