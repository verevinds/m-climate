import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@verevinds/ui-kit';

import styles from './search.module.scss';

const Search = () => {
  return (
    <Input
      className={styles['search']}
      icon={<FontAwesomeIcon icon={faSearch} />}
      variant='primary'
      placeholder='Найти кондиционер...'
    />
  );
};

export default Search;
