// import React, { useState, useEffect, useContext } from 'react';
// import AuthContext from '../context/AuthContext';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div className={styles['main']}>
            <h1 className={styles['main-header']}>Нитко ООД</h1>
            <p>
                Основна дейност на Нитко ООД е земеделие. Собственик на фирмата
                е Николай Колев.{' '}
            </p>
            <p>
                Землището се намира на територията на село Ивански, община
                Шумен.
            </p>
            <p>
                В момента фирмата разполага със 2134 декара обработваема земя.
            </p>
            <p>
                Основните култури които се отглеждат са: жито, царевица и
                слънчоглед.
            </p>
            <div>
                <p>Фирмата разполага с:</p>
                <ul>
                    <li>3 Трактора</li>
                    <li>1 Комбайна</li>
                    <li>1 Самосвал</li>
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
