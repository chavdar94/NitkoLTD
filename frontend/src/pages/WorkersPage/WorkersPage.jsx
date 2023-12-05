import { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import WorkerCard from './WorkerCard/WorkerCard';
import styles from './WorkersPage.module.css';
import Modal from '../../components/Modal/Modal';
import CreateWorker from '../../components/CreateWorker/CreateWorker';

const WorkersPage = () => {
	const [workers, setWorkers] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};
	const axiosInstance = useAxios();

	const fetchWorkers = async () => {
		try {
			const response = await axiosInstance.get('workers/');
			setWorkers(response.data);
		} catch (err) {
			console.error('An error occurred:', err);
		}
	};

	const handleWorkerAdded = () => {
		toggleModal();
		fetchWorkers();
	};

	useEffect(() => {
		fetchWorkers();
	}, []);

	return (
		<>
			<h1 className={styles['heading']}>Работници</h1>
			<button className={styles['button']} onClick={toggleModal}>
				Добави работник
			</button>

			<div className={styles['cards-container']}>
				{workers.map((worker) => (
					<WorkerCard key={worker.id} {...worker} />
				))}
			</div>

			{showModal && (
				<Modal onClose={toggleModal}>
					<CreateWorker
						toggleModal={toggleModal}
						onWorkerAdded={handleWorkerAdded}
					/>
				</Modal>
			)}
		</>
	);
};

export default WorkersPage;
