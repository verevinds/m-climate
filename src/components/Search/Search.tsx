import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';

const Search = () => {
  return (
    <div className={styles['search']}>
      <input className={styles['search__input']} />
      <button type='button' className={styles['search__button']}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default Search;
