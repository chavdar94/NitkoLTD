import React, { useState } from 'react';

import JobForm from './JobForm/JobForm';
import Modal from '../Modal/Modal';
import classes from './Jobs.module.css';
import formatDateTime from '../../utils/dateFormat';

function JobList({ jobs, deleteJob, hasFetched }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const newJobClasses = `btn btn-primary align-self-end ${classes.btnWidth}`;

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const openJobDetails = (job) => {
        setSelectedJob(job);
        setIsEditMode(true);
        toggleModal();
    };

    return (
        <div className='d-flex justify-content-center m-auto mt-3 w-75'>
            <div className='w-100 d-flex flex-column gap-3'>
                <h1 className='text-center mb-3'>Задачи</h1>
                <div className='overflow-auto' style={{ maxHeight: '650px' }}>
                    <table className='table table-striped table-bordered m-auto'>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Вид на работа</th>
                                <th>Нива</th>
                                <th>Работник</th>
                                <th>Дата</th>
                                <th className='w-auto'>Приключи</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td>
                                        <a
                                            className={`link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ${classes.cursor}`}
                                            onClick={() => openJobDetails(job)}
                                        >
                                            {job.id}
                                        </a>
                                    </td>
                                    <td>{job.job_type}</td>
                                    <td>{job.field.name}</td>
                                    <td>
                                        {job.worker.first_name}{' '}
                                        {job.worker.last_name}
                                    </td>
                                    <td>{formatDateTime(job.created)}</td>
                                    <td className={classes['short-td']}>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => deleteJob(job.id)}
                                        >
                                            Изтрий
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className={newJobClasses} onClick={toggleModal}>
                    Нова задача
                </button>
            </div>

            {showModal && (
                <Modal onClose={toggleModal} setIsEditMode={setIsEditMode}>
                    <JobForm
                        toggleModal={toggleModal}
                        hasFetched={hasFetched}
                        selectedJob={selectedJob}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />
                </Modal>
            )}
        </div>
    );
}

export default JobList;
