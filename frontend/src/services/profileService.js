import axiosInstance from '../utils/axios';

export async function getProfile() {
	try {
		const response = await axiosInstance.get('profile/');
		const data = await response.data;
		return data;
	} catch (err) {
		console.error(err);
	}
}

export async function editProfile(formData) {
	try {
		return await axiosInstance.put('profile/', formData);
	} catch (err) {
		console.error(err);
	}
}

export async function deleteProfile(userId) {
	try {
		const profileResponse = await axiosInstance.delete('profile/');
		const userResponse = await axiosInstance.delete(`users/${userId}/`);

		const profileData = await profileResponse.data;
		const userData = await userResponse.data;

		return { profile: profileData, user: userData };
	} catch (err) {
		console.error(err);
	}
}
