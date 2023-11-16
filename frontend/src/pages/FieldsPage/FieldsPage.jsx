import { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import styles from './FieldsPage.module.css';

import * as fieldsServices from '../../services/fieldService';
import FieldsForm from '../../components/Fields/FieldsForm/FieldsForm';

const FieldsPage = () => {
	const [fields, setFields] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	async function fetchWorkers() {
		return await fieldsServices.getAll().then((data) => setFields(data));
	}

	useEffect(() => {
		fetchWorkers();
	}, []);

	const handleFieldAdded = () => {
		toggleModal();
		fetchWorkers();
	};

	return (
		<>
			<h1 className={styles['fields-heading']}>Налични ниви</h1>
			<button className={styles['button']} onClick={toggleModal}>
				Добави нива
			</button>

			{fields.length == 0 && <h2>Няма ниви</h2>}
			{fields.length > 0 &&
				fields.map((field) => (
					<h3 key={field.id}>
						{field.name} - {field.size}
					</h3>
				))}

			{showModal && (
				<Modal onClose={toggleModal}>
					<FieldsForm
						toggleModal={toggleModal}
						onFieldAdded={handleFieldAdded}
					/>
				</Modal>
			)}
		</>
	);
};

export default FieldsPage;
