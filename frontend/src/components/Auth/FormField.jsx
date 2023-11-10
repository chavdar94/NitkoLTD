import styles from './FormField.module.css';

const FormField = ({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    htmlFor,
    userRef,
}) => {
    return (
        <div className={styles['form-row']}>
            <label className={styles['form-label']} htmlFor={htmlFor}>
                {label}:
            </label>
            <input
                ref={userRef}
                className={styles['form-input']}
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
