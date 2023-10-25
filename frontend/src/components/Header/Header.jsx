import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import classes from './Header.module.css';

const Header = () => {
    const { user, logoutUser } = useContext(AuthContext);

    const logoutClasses = `${classes.logout} nav-link fs-6 fw-bold`;
    return (
        <nav className={`${classes.nav} navbar`}>
            <div className='container-fluid justify-content-end gap-3 m-2'>
                <Link
                    className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark fs-6 fw-bold'
                    to={'/'}>
                    Начало
                </Link>
                {user ? (
                    <React.Fragment>
                        <Link
                            className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark fs-6 fw-bold'
                            to={'/jobs'}>
                            Задачи
                        </Link>
                        <Link
                            className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark fs-6 fw-bold'
                            to={'/workers'}>
                            Работници
                        </Link>
                        <a className={logoutClasses} onClick={logoutUser}>
                            Изход
                        </a>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link className='nav-link fs-6 fw-bold' to={'/login'}>
                            Вход
                        </Link>
                        <Link
                            className='nav-link fs-6 fw-bold'
                            to={'/register'}>
                            Регистрация
                        </Link>
                    </React.Fragment>
                )}
            </div>
        </nav>
    );
};

export default Header;
