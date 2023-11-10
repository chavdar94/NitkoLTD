import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <div className={styles['contact-me']}>
                <p>Можете да се свържете с мен тук:</p>
                <ul className={styles['socials']}>
                    <li>
                        <a
                            className={styles['social-link']}
                            href='https://www.facebook.com/profile.php?id=100000919454896'
                        >
                            <i
                                className={`fa-brands fa-facebook fa-2xl ${styles['social']}`}
                            ></i>
                        </a>
                    </li>
                    <li>
                        <a
                            className={styles['social-link']}
                            href='https://github.com/chavdar94'
                        >
                            <i
                                className={`fa-brands fa-github fa-2xl ${styles['social']}`}
                            ></i>
                        </a>
                    </li>
                    <li>
                        <a
                            className={styles['social-link']}
                            href='https://www.linkedin.com/in/chavdar-tonchev-818919235/'
                        >
                            <i
                                className={`fa-brands fa-linkedin fa-2xl ${styles['social']}`}
                            ></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div>All rights reserved Чавдар Тончев &copy;</div>
        </footer>
    );
};

export default Footer;
