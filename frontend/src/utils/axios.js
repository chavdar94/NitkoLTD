import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/';
let authTokens = localStorage.getItem('authTokens')
	? JSON.parse(localStorage.getItem('authTokens'))
	: null;

const axiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 1000,
	headers: {
		// Authorization: `JWT ${authTokens?.access}`,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

export default axiosInstance;
