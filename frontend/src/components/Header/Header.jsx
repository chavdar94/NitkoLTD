import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { user, logoutUser } = useAuth();

    return (
        <nav className={styles['nav']}>
            <Link className={styles['nav-link']} to={'/'}>
                Начало
            </Link>
            {user ? (
                <>
                    <Link className={styles['nav-link']} to={'/jobs'}>
                        Задачи
                    </Link>
                    <Link className={styles['nav-link']} to={'/workers'}>
                        Работници
                    </Link>
                    <a className={styles['nav-link']} onClick={logoutUser}>
                        Изход
                    </a>
                </>
            ) : (
                <>
                    <Link className={styles['nav-link']} to={'/login'}>
                        Вход
                    </Link>
                    <Link className={styles['nav-link']} to={'/register'}>
                        Регистрация
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Header;
