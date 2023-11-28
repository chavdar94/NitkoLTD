import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import FormField from './FormField';
import styles from './AuthForm.module.css';

const AuthForm = ({ handleSubmit, value, handleChange, path, errors }) => {
	const [showError, setShowError] = useState(false);
	const userRef = useRef();

	useEffect(() => {
		if (errors) {
			setShowError(true);
		}
	}, [errors]);

	useEffect(() => {
		if (userRef.current) {
			userRef.current.focus();
		}
	}, []);

	return (
		<div className={styles['form-wrapper']}>
			<div className={styles['inner-wrapper']}>
				<div className={styles['img-wrapper']}>
					<img src='https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
				</div>

				<form className={styles['form']} onSubmit={handleSubmit}>
					{showError &&
						Object.values(errors).map((err) => (
							<p key={Math.random()} className={styles['error']}>
								{err}
							</p>
						))}
					<FormField
						label='Потребителско име'
						name='username'
						htmlFor='username'
						placeholder='Потребителско име...'
						type='text'
						value={value.username}
						onChange={handleChange}
						userRef={userRef}
					/>
					<FormField
						label='Парола'
						name='password'
						htmlFor='password'
						placeholder='Парола...'
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

					<button className={styles['button']}>
						{path === 'login' ? 'Влизане' : 'Регистриране'}
					</button>
					{path === 'login' ? (
						<p className={styles['helper-text']}>
							Нямаш акаунт? Цъкни <Link to='/register'>тук</Link>{' '}
							да се регистрираш.
						</p>
					) : (
						<p className={styles['helper-text']}>
							Вече имаш акаунт? Цъкни <Link to='/login'>тук</Link>{' '}
							да влезеш.
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default AuthForm;
