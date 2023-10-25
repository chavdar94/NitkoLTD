import { useState, useEffect } from 'react';
import axiosInstance from '../../axios';

const WorkersPage = () => {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axiosInstance.get('workers/');
                setWorkers(response.data);
            } catch (err) {
                console.error('An error occurred:', err);
            }
        };

        fetchWorkers();
    }, []);

    return (
        <div>
            {workers.map((worker) => (
                <div key={worker.id}>
                    <h3>
                        {worker.first_name} {worker.last_name}
                    </h3>
                    <ul>
                        {worker.jobs.length !== 0 && (
                            <div>
                                <h5>Задачи:</h5>
                                {worker.jobs.map((job) => (
                                    <li key={job.id}>{job.job_type}</li>
                                ))}
                            </div>
                        )}
                        <ul>
                        {worker.worker_fields.length !== 0 && (
                            <div>
                                <h5>Ниви:</h5>
                                {worker.worker_fields.map((field) => (
                                    <li key={field.field__id}>
                                        {field.field__name}
                                    </li>
                                ))}
                            </div>
                        )}
                    </ul>
                    </ul>
                    
                </div>
            ))}
        </div>
    );
};

export default WorkersPage;
