import { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axiosInstance from '../utils/axios';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const location = useLocation();
	const from = location.state?.from.pathname || '/';

	const initiaAuthlValue = localStorage.getItem('authTokens')
		? JSON.parse(localStorage.getItem('authTokens'))
		: null;

	const initialUserValue = localStorage.getItem('authTokens')
		? jwt_decode(localStorage.getItem('authTokens'))
		: null;

	const [authTokens, setAuthTokens] = useState(() => initiaAuthlValue);
	const [user, setUser] = useState(() => initialUserValue);
	const [loading, setLoading] = useState(true);

	const loginUser = async ({ username, password }) => {
		try {
			const response = axiosInstance.post('token/', {
				username: username,
				password: password,
			});
			const { status, data } = await response;

			if (status === 200) {
				setAuthTokens(data);
				setUser(jwt_decode(data.access));
				localStorage.setItem('authTokens', JSON.stringify(data));
				setErrors({});
				navigate(from, { replace: true });
			}
		} catch (err) {
			console.error(err);
			setErrors({ auth: 'Грешно потребителско име или парола' });
		}
	};

	const logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem('authTokens');
		navigate('/');
	};

	const registerUser = async ({ username, password, password2 }) => {
		if (password !== password2) {
			setErrors({ password: 'Паролите не съвпадат!' });
			return;
		}
		try {
			const response = await axiosInstance.post('auth/register/', {
				username: username,
				password: password,
			});

			if (response.status === 201) {
				setErrors({});
				navigate('/login');
			}
		} catch (err) {
			setErrors({ username: 'Потребителското име вече е заето' });
		}
	};

	const clearErrors = () => {
		setErrors({});
	};

	let contextData = {
		user: user,
		authTokens: authTokens,
		errors: errors,
		clearErrors: clearErrors,
		loginUser: loginUser,
		logoutUser: logoutUser,
		registerUser: registerUser,
		setAuthTokens: setAuthTokens,
		setUser: setUser,
	};

	useEffect(() => {
		if (authTokens) {
			setUser(jwt_decode(authTokens.access));
		}
		setLoading(false);
	}, [authTokens, loading]);

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	);
};
