import Location from '@components/Location/Location';

import styles from './Menu.module.scss';
import MenuBlock from './MenuBlock';

const Menu = () => {
  return (
    <>
      <br />
      <div className={styles['menu__button-container']}>
        <label htmlFor='menu' className={styles.menu__button}>
          <input
            type='checkbox'
            id='menu'
            className={styles['menu__button-input']}
          />
          <span className={styles.menu__text}>Каталог</span>
        </label>
        <br />
        <div className={styles['menu-wrap']}>
          <div className={styles.menu}>
            <div className={styles.menu__location}>
              <Location />
            </div>
            <MenuBlock
              items={[
                { id: '1', name: 'ссылка', url: '#' },
                { id: '2', name: 'ссылка', url: '#' },
                { id: '3', name: 'ссылка', url: '#' },
                { id: '4', name: 'ссылка', url: '#' },
              ]}
              title='Кондиционеры'
            />
            <MenuBlock
              items={[
                { id: '1', name: 'ссылка', url: '#' },
                { id: '2', name: 'ссылка', url: '#' },
                { id: '3', name: 'ссылка', url: '#' },
                { id: '4', name: 'ссылка', url: '#' },
              ]}
              title='Кондиционеры'
            />
            <MenuBlock
              items={[
                { id: '1', name: 'ссылка', url: '#' },
                { id: '2', name: 'ссылка', url: '#' },
                { id: '3', name: 'ссылка', url: '#' },
                { id: '4', name: 'ссылка', url: '#' },
              ]}
              title='Кондиционеры'
            />
            <MenuBlock
              items={[
                { id: '1', name: 'ссылка', url: '#' },
                { id: '2', name: 'ссылка', url: '#' },
                { id: '3', name: 'ссылка', url: '#' },
                { id: '4', name: 'ссылка', url: '#' },
                { id: '5', name: 'ссылка', url: '#' },
                { id: '6', name: 'ссылка', url: '#' },
                { id: '7', name: 'ссылка', url: '#' },
                { id: '8', name: 'ссылка', url: '#' },
                { id: '9', name: 'ссылка', url: '#' },
                { id: '10', name: 'ссылка', url: '#' },
                { id: '11', name: 'ссылка', url: '#' },
              ]}
              title='Кондиционеры'
            />
            <MenuBlock
              items={[
                { id: '1', name: 'ссылка', url: '#' },
                { id: '2', name: 'ссылка', url: '#' },
                { id: '3', name: 'ссылка', url: '#' },
                { id: '4', name: 'ссылка', url: '#' },
              ]}
              title='Кондиционеры'
            />
            <MenuBlock
              items={[
                { id: '1', name: 'ссылка', url: '#' },
                { id: '2', name: 'ссылка', url: '#' },
                { id: '3', name: 'ссылка', url: '#' },
                { id: '4', name: 'ссылка', url: '#' },
                { id: '5', name: 'ссылка', url: '#' },
                { id: '6', name: 'ссылка', url: '#' },
                { id: '7', name: 'ссылка', url: '#' },
                { id: '8', name: 'ссылка', url: '#' },
                { id: '9', name: 'ссылка', url: '#' },
              ]}
              title='Кондиционеры'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
