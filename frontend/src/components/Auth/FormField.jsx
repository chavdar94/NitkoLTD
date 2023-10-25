import React from 'react';

const FormField = ({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    htmlFor,
}) => {
    return (
        <div>
            <label className='form-label fs-4 fw-bold' htmlFor={htmlFor}>
                {label}:
            </label>
            <input
                className='form-control border border-dark-subtle border-2 rounded-3'
                id={htmlFor}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default FormField;
