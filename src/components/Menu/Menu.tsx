import Location from '@components/Location/Location';
import styles from './Menu.module.scss';
import MenuBlock from './MenuBlock';

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
                        <div className={styles['menu__location']}>
                            <Location />
                        </div>
                        <MenuBlock
                            items={[
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                            ]}
                            title={'Кондиционеры'}
                        />
                        <MenuBlock
                            items={[
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                            ]}
                            title={'Кондиционеры'}
                        />
                        <MenuBlock
                            items={[
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                            ]}
                            title={'Кондиционеры'}
                        />
                        <MenuBlock
                            items={[
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                            ]}
                            title={'Кондиционеры'}
                        />
                        <MenuBlock
                            items={[
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                            ]}
                            title={'Кондиционеры'}
                        />
                        <MenuBlock
                            items={[
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                                { name: 'ссылка', url: '#' },
                            ]}
                            title={'Кондиционеры'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
