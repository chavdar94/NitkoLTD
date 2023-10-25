import React from 'react';

const JobField = (props) => {
    return (
        <div className='pb-2'>
            <label htmlFor={props.htmlFor}>{props.label}:</label>
            <select
                className='form-select'
                id={props.id}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                required>
                <option value=''>{props.optionText}</option>
                {props.data.map((item) => (
                    <option
                        key={item.id}
                        value={props.name === 'jobType' ? item.name : item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default JobField;
