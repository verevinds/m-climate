import { useState } from 'react';

import styles from './menu.module.scss';
import MenuDropdown from './MenuDropdown';

const Menu = () => {
  const [show, toggleShow] = useState(false);
  const handleShow = () => {
    toggleShow(!show);
  };

  return (
    <>
      <div className={styles['container']}>
        <input
          type='checkbox'
          id='menu1'
          className={styles['button-input']}
          defaultChecked={show}
          onChange={handleShow}
        />
        <label htmlFor='menu1' className={styles['button']}>
          <span className={styles['text']}>Каталог</span>
        </label>
        <br />
      </div>
      <div>
        <MenuDropdown show={show} />
      </div>
    </>
  );
};

export default Menu;
