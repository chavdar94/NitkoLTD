import { useEffect, useState } from 'react';
import * as profileService from '../../services/profileService';
import ProfileEdit from '../../components/Profile/ProfileEdit';
import Modal from '../../components/Modal/Modal';
import styles from '../FieldsPage/FieldsPage.module.css';

const ProfilePage = () => {
	const [profile, setProfile] = useState({
		email: '',
		first_name: '',
		id: '',
		last_name: '',
		user: '',
	});

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		profileService.getProfile().then((res) => setProfile(res));
	}, []);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const profileAdded = () => {
		toggleModal();
		profileService.getProfile().then((res) => setProfile(res));
	};

	return (
		<>
			<h2>Email: {profile[0]?.email}</h2>
			<h3>Име: {profile[0]?.first_name}</h3>
			<h3>Фамилия: {profile[0]?.last_name}</h3>
			{/* <h3>{profile.age}</h3> */}
			{/* <h3>{profile.wage}</h3> */}
			<button className={styles['button']} onClick={toggleModal}>
				Редактирай профила
			</button>

			{showModal && (
				<Modal onClose={toggleModal}>
					<ProfileEdit
						onProfileAdded={profileAdded}
						userId={profile[0].user}
					/>
				</Modal>
			)}
		</>
	);
};

export default ProfilePage;
