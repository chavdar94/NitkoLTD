import React from 'react';

const JobEditForm = ({ jobType, worker, field }) => {
    return (
        <div>
            <button
                className='btn-close float-end'
                onClick={props.toggleModal}></button>
            <h2 className='text-center mt-3 mb-3'>Промяна на задачата</h2>
            <form className='m-auto' onSubmit={handleSubmit}>
                <JobField
                    htmlFor='jobType'
                    label='Задача'
                    value={jobType}
                    name='jobType'
                    onChange={handleChange}
                    data={jobs}
                    optionText='Избор на задача'
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
                <JobField
                    htmlFor='field'
                    label='Нива'
                    value={formData.fieldId}
                    name='fieldId'
                    onChange={handleChange}
                    data={fields}
                    optionText='Избор на нива'
                />
                <div>
                    <button className='btn btn-primary' type='submit'>
                        Промени задачата
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobEditForm;
