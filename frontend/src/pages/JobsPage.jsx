import { useEffect, useState } from 'react';
import JobList from '../components/Jobs/Jobs';
import useAxios from '../hooks/useAxios';

const JobsPage = () => {
	const axiosInstance = useAxios();

	const [allJobs, setAllJobs] = useState([]);
	const [hasFetched, setHasFetched] = useState(false);

	useEffect(() => {
		if (!hasFetched) {
			axiosInstance.get('jobs/').then((response) => {
				setAllJobs(response.data);
				setHasFetched(true);
			});
		}
	}, [hasFetched]);

	async function deleteJob(jobId) {
		const response = await axiosInstance.delete(`jobs/${jobId}/`);
		if (response.status === 204) {
			setAllJobs(allJobs.filter((job) => job.id !== jobId));
		}
	}

	return (
		<JobList
			jobs={allJobs}
			deleteJob={deleteJob}
			hasFetched={setHasFetched}
		/>
	);
};

export default JobsPage;
