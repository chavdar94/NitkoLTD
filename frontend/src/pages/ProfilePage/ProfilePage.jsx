import { useEffect, useState } from 'react';
import * as profileService from '../../services/profileService';
import ProfileEdit from '../../components/Profile/ProfileEdit';
import Modal from '../../components/Modal/Modal';
import styles from '../FieldsPage/FieldsPage.module.css';
import useAuth from '../../hooks/useAuth';

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
	console.log(profile);
	const [hasProfile, setHasProfile] = useState(false);

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		profileService.getProfile().then((res) => setProfile(res));
	}, []);

	const { user, logoutUser } = useAuth();

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const profileAdded = () => {
		toggleModal();
		profileService.getProfile().then((res) => {
			setProfile(res);
			setHasProfile(true);
		});
	};

	const profileDeleteHandler = () => {
		if (profile[0]) {
			profileService.deleteProfile(profile[0]?.user).then(() => {
				setProfile(initialState);
				setHasProfile(false);
				logoutUser();
			});
		}
	};

	return (
		<>
			<h2>Email: {profile[0]?.email}</h2>
			<h3>Име: {profile[0]?.first_name}</h3>
			<h3>Фамилия: {profile[0]?.last_name}</h3>
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
