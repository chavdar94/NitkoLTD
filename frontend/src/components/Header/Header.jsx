import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { user, logoutUser } = useAuth();

    const logoutClasses = `${classes.logout} nav-link fs-6 fw-bold`;
    return (
        <nav className={`${classes.nav} navbar`}>
            <div className='container-fluid justify-content-end gap-3 m-2'>
                <Link
                    className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark fs-6 fw-bold'
                    to={'/'}
                >
                    Начало
                </Link>
                {user ? (
                    <>
                        <Link
                            className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark fs-6 fw-bold'
                            to={'/jobs'}
                        >
                            Задачи
                        </Link>
                        <Link
                            className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark fs-6 fw-bold'
                            to={'/workers'}
                        >
                            Работници
                        </Link>
                        <a className={logoutClasses} onClick={logoutUser}>
                            Изход
                        </a>
                    </>
                ) : (
                    <>
                        <Link className='nav-link fs-6 fw-bold' to={'/login'}>
                            Вход
                        </Link>
                        <Link
                            className='nav-link fs-6 fw-bold'
                            to={'/register'}
                        >
                            Регистрация
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
