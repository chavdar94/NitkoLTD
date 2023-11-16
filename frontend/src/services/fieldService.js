import axiosInstance from '../utils/axios';

export async function getAll() {
	const response = await axiosInstance.get('fields/');
	const data = await response.data;

	return data;
}

export async function create(formData) {
	const response = await axiosInstance.post('fields/', formData);
	// const data = await response.data;

	return response;
}
