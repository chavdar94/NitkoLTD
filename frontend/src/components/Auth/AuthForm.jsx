import { useState, useEffect } from 'react';
import FormField from './FormField';
import { Link } from 'react-router-dom';

const AuthForm = ({ handleSubmit, value, handleChange, path, errors }) => {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (errors) {
            setShowError(true);

            const timeoutId = setTimeout(() => {
                setShowError(false);
            }, 4000);

            return () => clearTimeout(timeoutId);
        }
    }, [errors]);
    return (
        <form
            className='w-25 m-auto mt-5 d-flex flex-column border border-dark-subtle border-4 rounded-4 p-5'
            onSubmit={handleSubmit}>
            <FormField
                label='Потребителско име'
                name='username'
                htmlFor='username'
                placeholder='Въведете потребителско име...'
                type='text'
                value={value.username}
                onChange={handleChange}
            />
            <FormField
                label='Парола'
                name='password'
                htmlFor='password'
                placeholder='Въведете парола...'
                type='password'
                value={value.password}
                onChange={handleChange}
            />
            {path === 'register' && (
                <FormField
                    label='Повторете парлоата'
                    name='password2'
                    htmlFor='password2'
                    placeholder='Повторете паролата...'
                    type='password'
                    value={value.password2}
                    onChange={handleChange}
                />
            )}
            {showError && errors && (
                <div className='text-danger'>
                    <ul>
                        {Object.values(errors).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button className='btn btn-primary m-auto mt-3 w-50 float-center fs-5 fw-bold'>
                {path === 'login' ? 'Влизане' : 'Регистриране'}
            </button>
            {path === 'login' ? (
                <p className='mt-3 text-center fw-semibold'>
                    Нямаш акаунт? Цъкни <Link to='/register'>тук</Link> да се
                    регистрираш.
                </p>
            ) : (
                <p className='mt-3 text-center fw-semibold'>
                    Вече имаш акаунт? Цъкни <Link to='/login'>тук</Link> да
                    влезеш.
                </p>
            )}
        </form>
    );
};

export default AuthForm;
