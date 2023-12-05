import { useEffect, useState } from 'react';
import * as profileService from '../../services/profileService';
import ProfileEdit from '../../components/Profile/ProfileEdit';
import Modal from '../../components/Modal/Modal';
import styles from '../FieldsPage/FieldsPage.module.css';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const initialState = [
	{
		email: '',
		first_name: '',
		id: '',
		last_name: '',
	},
];

const ProfilePage = () => {
	const [profile, setProfile] = useState(initialState);
	const [hasProfile, setHasProfile] = useState(false);

	const [showModal, setShowModal] = useState(false);

	const axiosInstance = useAxios();

	useEffect(() => {
		axiosInstance.get('profile/').then((res) => {
			if (res.data.length > 0) {
				setProfile(res.data);
			}
		});
	}, []);

	const { user, logoutUser } = useAuth();

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const profileAdded = () => {
		toggleModal();
		axiosInstance.get('profile/').then((res) => {
			setProfile(res.data);
			setHasProfile(true);
		});
	};

	const deleteUserAndProfile = async () => {
		try {
			await Promise.all([
				axiosInstance.delete(`users/${user.user_id}/`),
				axiosInstance.delete(`profile/${user.user_id}`),
			]);

			setProfile(initialState);
			setHasProfile(false);
			logoutUser();
		} catch (err) {
			console.error(err);
		}
	};

	const profileDeleteHandler = () => {
		if (profile[0]) {
			deleteUserAndProfile();
		}
	};

	return (
		<>
			<h2>Профила на {user.username}</h2>
			<h4>Email: {profile[0]?.email}</h4>
			<h4>Име: {profile[0]?.first_name}</h4>
			<h4>Фамилия: {profile[0]?.last_name}</h4>
			<button className={styles['button']} onClick={toggleModal}>
				Редактирай профила
			</button>

			{hasProfile && (
				<button
					className={styles['button']}
					onClick={profileDeleteHandler}
				>
					Изтрий профила
				</button>
			)}

			{showModal && (
				<Modal onClose={toggleModal}>
					<ProfileEdit
						onProfileAdded={profileAdded}
						profile={profile[0] ? profile[0] : profile}
						userId={user.user_id}
					/>
				</Modal>
			)}
		</>
	);
};

export default ProfilePage;
