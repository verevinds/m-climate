import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles['footer__menu-wrap']}>
        <h3>Информация</h3>
        <ul className={styles.footer__menu}>
          <li className={styles.footer__link}>
            <a href='#'>Как сделать заказ?</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Доставка</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Обмен и возврат</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Способы оплаты</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Скидки и акции</a>
          </li>
        </ul>
      </nav>
      <nav className={styles['footer__menu-wrap']}>
        <h3>О компании</h3>
        <ul className={styles.footer__menu}>
          <li className={styles.footer__link}>
            <a href='#'>О нас</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Контакты</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Отзывы</a>
          </li>
        </ul>
      </nav>
      <nav className={styles['footer__menu-wrap']}>
        <h3>Покупателям</h3>
        <ul className={styles.footer__menu}>
          <li className={styles.footer__link}>
            <a href='#'>Кондиционеры</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Популярные</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Монтаж / Демонтаж</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Сервисное обслуживание</a>
          </li>
          <li className={styles.footer__link}>
            <a href='#'>Подключение бытовой техники</a>
          </li>
        </ul>
      </nav>
      <div className={styles.footer__contact}>
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
