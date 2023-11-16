import axiosInstance from '../utils/axios';

export async function getAll() {
	const response = await axiosInstance.get('workers/');
	const data = await response.data;

	return data;
}
