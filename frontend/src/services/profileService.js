import axiosInstance from '../utils/axios';

export async function getProfile() {
	try {
		const response = await axiosInstance.get('profile/');
		const data = await response.data;
		return data;
	} catch {
		const tokenString = localStorage.getItem('authTokens');
		const token = JSON.parse(tokenString);
		const access = token.access;
	}
}

export async function createProfile(formData) {
	try {
		const response = await axiosInstance.put('profile/', formData);

		const data = await response.data;
	} catch (err) {
		console.error(err);
	}
}
