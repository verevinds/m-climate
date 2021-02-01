import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles['footer']}>
            <div className={styles['footer__menu-wrap']}>
                <h3>Покупателям</h3>
                <ul className={styles['footer__menu']}>
                    <li className={styles['footer__link']}>
                        <a href="#">Каталог</a>
                    </li>
                    <li className={styles['footer__link']}>
                        <a href="#">Услуги</a>
                    </li>
                    <li className={styles['footer__link']}>
                        <a href="#">О нас</a>
                    </li>
                    <li className={styles['footer__link']}>
                        <a href="#">Доставка</a>
                    </li>
                </ul>
            </div>
            <div className={styles['footer__contact']}>
                <h3>Наши контакты</h3>
                <p>ОГРНИП 316547600151869</p>
                <p>г. Новосибирск ул.3 Интернационала 157</p>
                <p>Телефон: +7 (383) 310-82-10</p>
                <p>E-mail: info@mclimate.pro</p>
                <p>WhatsApp: +7 (983) 510-82-10</p>
            </div>
        </footer>
    );
};

export default Footer;
