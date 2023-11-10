// import React, { useState, useEffect, useContext } from 'react';
// import AuthContext from '../context/AuthContext';
import Footer from '../../components/Footer/Footer';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <>
            <section className={styles['hero-wrapper']}>
                <img
                    src='https://cdn.pixabay.com/photo/2017/03/15/19/41/claas-2147239_1280.jpg'
                    className={styles['hero-img']}
                />
                <div className={styles['hero-info']}>
                    <h1 className={styles['hero-heading']}>Нитко ООД</h1>
                    <p className={styles['hero-help-text']}>
                        Основан през 2019г. със седалище в с.Ивански
                    </p>
                    <p className={styles['hero-help-text']}>
                        Собственик Николай Колев
                    </p>
                </div>
            </section>

            <section className={styles['crops']}>
                <div className={styles['crops-img-wrapper']}>
                    <img
                        src='https://images.pexels.com/photos/9305056/pexels-photo-9305056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                        className={styles['crops-img']}
                    />
                </div>
                <div className={styles['crops-intro']}>
                    <h2 className={styles['crops-heading']}>
                        Отглежда се пшеница, слънчоглед и царевица
                    </h2>
                    <p className={`${styles['green']}`}>
                        Фирмата разполга с 2183 декара обработваема земя
                    </p>
                    <p className={styles['crops-info-txt']}>
                        Николай Колев се занимава със земеделие над 30 години.
                        Работи със световно извествни фирми за препарати и
                        семена. Цел на фирмат е финансова независимост и семеен
                        бизнес. Разполага с не малък набор от техника и база с
                        размер над 2000 кв.м.
                    </p>
                </div>
            </section>
        </>
    );
};

export default HomePage;
