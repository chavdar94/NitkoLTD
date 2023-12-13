import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;
console.log(baseUrl);
let authTokens = localStorage.getItem('authTokens')
	? JSON.parse(localStorage.getItem('authTokens'))
	: null;

const axiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 1000,
	headers: {
		Authorization: `JWT ${authTokens?.access}`,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

export default axiosInstance;
