import React, { useState, useEffect } from 'react';
import JobField from './JobField';
import transformWorkerData from '../../utils/WorkerDataTransform';
import axiosInstance from '../../axios';

const jobs = [
    { name: 'Оран', id: 1 },
    { name: 'Култивиране', id: 2 },
    { name: 'Пръскане против треви', id: 3 },
    { name: 'Пръскане против гъбични инфекции', id: 4 },
    { name: 'Пръскане против буболечки', id: 5 },
    { name: 'Торене', id: 6 },
    { name: 'Сеитба', id: 7 },
    { name: 'Жътва', id: 8 },
];

function JobForm(props) {
    const defaultFormData = {
        jobType: '',
        workerId: '',
        fieldId: '',
    };

    const [workers, setWorkers] = useState([]);
    const [fields, setFields] = useState([]);

    const [formData, setFormData] = useState(defaultFormData);
    const [editFormData, setEditFormData] = useState(defaultFormData);

    const handleChange = (e) => {
        if (!props.isEditMode) {
            setFormData((oldState) => ({
                ...oldState,
                [e.target.name]: e.target.value,
            }));
        } else {
            setEditFormData((oldState) => ({
                ...oldState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    useEffect(() => {
        const fetchWorkersAndFields = async () => {
            try {
                const workersResponse = await axiosInstance.get('workers/');
                setWorkers(workersResponse.data);

                const fieldsResponse = await axiosInstance.get('fields/');
                setFields(fieldsResponse.data);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        fetchWorkersAndFields();
    }, []);

    useEffect(() => {
        if (props.selectedJob) {
            const { job_type, worker, field } = props.selectedJob;
            setEditFormData({
                jobType: job_type,
                workerId: worker.id,
                fieldId: field.id,
            });
        }
    }, [props.selectedJob]);

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        const newJob = {
            job_type: !props.isEditMode
                ? formData.jobType
                : editFormData.jobType,
            worker: !props.isEditMode
                ? formData.workerId
                : editFormData.workerId,
            field: !props.isEditMode ? formData.fieldId : editFormData.fieldId,
        };
        if (props.isEditMode) {
            updateJob(props.selectedJob.id, newJob);
        } else {
            createJob(newJob);
        }
    };

    const createJob = async (newJob) => {
        try {
            const response = await axiosInstance.post('jobs/', newJob);

            if (response.status === 201) {
                props.toggleModal();
                console.log('Modal toggled');
                props.hasFetched(false);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const updateJob = async (jobId, jobData) => {
        try {
            const response = await axiosInstance.put(`jobs/${jobId}/`, jobData);
            console.log(response);

            if (response.status === 200) {
                props.toggleModal();
                props.hasFetched(false);
                props.setIsEditMode(false);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const closeModalBtnClick = () => {
        props.toggleModal();
        props.setIsEditMode(false);
    };

    const workerData = workers.map((worker) => transformWorkerData(worker));

    return (
        <div>
            <button
                className='btn-close float-end'
                onClick={closeModalBtnClick}></button>
            <h2 className='text-center mt-3 mb-3'>
                {props.isEditMode
                    ? `Промени задача №${props.selectedJob.id}`
                    : `Нова задача`}
            </h2>
            <form className='m-auto' onSubmit={handleSubmit}>
                <JobField
                    htmlFor='jobType'
                    label='Задача'
                    value={
                        props.isEditMode
                            ? editFormData.jobType
                            : formData.jobType
                    }
                    name='jobType'
                    onChange={handleChange}
                    data={jobs}
                    optionText='Избор на задача'
                />

                <JobField
                    htmlFor='worker'
                    label='Работник'
                    value={
                        props.isEditMode
                            ? editFormData.workerId
                            : formData.workerId
                    }
                    name='workerId'
                    onChange={handleChange}
                    data={workerData}
                    optionText='Избор на работник'
                />
                <JobField
                    htmlFor='field'
                    label='Нива'
                    value={
                        props.isEditMode
                            ? editFormData.fieldId
                            : formData.fieldId
                    }
                    name='fieldId'
                    onChange={handleChange}
                    data={fields}
                    optionText='Избор на нива'
                />
                <div>
                    <button className='btn btn-primary' type='submit'>
                        {props.isEditMode ? 'Промени задачата' : 'Нова задача'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default JobForm;
