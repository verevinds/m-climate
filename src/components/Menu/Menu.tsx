import styles from './Menu.module.scss';

const Menu = () => {
    return (
        <>
            <br />
            <div className={styles['menu__button-container']}>
                <input
                    type="checkbox"
                    id="menu"
                    className={styles['menu__button-input']}
                />
                <label htmlFor="menu" className={styles['menu__button']}>
                    <span className={styles['menu__button__text']}>
                        Каталог
                    </span>
                </label>
                <br />
                <div className={styles['menu-wrap']}>
                    <div className={styles['menu']}>
                      <h1>huy</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
