import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/';

const tokenString = localStorage.getItem('authTokens');
const token = tokenString ? JSON.parse(tokenString) : null;
const access = token ? token.access : null;

const axiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
	headers: {
		Authorization: access ? 'JWT ' + access : null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

export default axiosInstance;
