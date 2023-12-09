import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';
import styles from './SingleWorker.module.css';

const SingleWorkerPage = () => {
	const { workerId } = useParams();
	const [worker, setWorker] = useState({});

	const navigate = useNavigate();
	const axiosInstance = useAxios();

	useEffect(() => {
		axiosInstance
			.get(`workers/${workerId}/`)
			.then((data) => setWorker(data.data));
	}, []);

	const handleDeleteWorker = () => {
		axiosInstance.delete(`workers/${workerId}/`).then((data) => {
			if (data.status === 204) {
				navigate('/workers');
			}
		});
	};

	return (
		<div>
			{worker !== null && (
				<>
					<h3>
						{worker.first_name} {worker.last_name}
					</h3>
					<div>
						<h4>Задачи:</h4>
						{worker.jobs && worker.jobs.length > 0 ? (
							worker.jobs.map((job) => (
								<p key={job.id}>{job.job_type}</p>
							))
						) : (
							<p>Няма задачи</p>
						)}
					</div>
					<div>
						<h4>Ниви:</h4>
						{worker.worker_fields &&
						worker.worker_fields.length > 0 ? (
							worker.worker_fields.map((field) => (
								<p key={field.id}>{field.field__name}</p>
							))
						) : (
							<p>Няма ниви</p>
						)}
					</div>
					<button
						className={styles['button']}
						type='button'
						onClick={handleDeleteWorker}
					>
						Изтрий работника
					</button>
				</>
			)}
		</div>
	);
};

export default SingleWorkerPage;
