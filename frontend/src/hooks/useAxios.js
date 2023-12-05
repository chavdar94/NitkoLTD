import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import useAuth from './useAuth';

const baseUrl = 'http://127.0.0.1:8000/api/';

const useAxios = () => {
	const { authTokens, setUser, setAuthTokens } = useAuth();

	const axiosInstance = axios.create({
		baseURL: baseUrl,
		timeout: 1000,
		headers: {
			Authorization: `JWT ${authTokens?.access}`,
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
	});

	axiosInstance.interceptors.request.use(async (req) => {
		if (!authTokens) {
			return req;
		}

		const user = jwt_decode(authTokens.access);
		const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
		if (!isExpired) {
			return req;
		}

		try {
			const response = await axios.post(`${baseUrl}token/refresh/`, {
				refresh: authTokens.refresh,
			});
			localStorage.setItem('authTokens', JSON.stringify(response.data));

			setAuthTokens(response.data);
			setUser(jwt_decode(response.data.access));

			req.headers.Authorization = `JWT ${response.data.access}`;
		} catch (error) {
			console.error('Error refreshing token:', error);
		}

		return req;
	});

	return axiosInstance;
};

export default useAxios;
