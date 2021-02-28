import SearchIcon from '@public/svg/search.svg';
import { Input } from '@verevinds/ui-kit';

import styles from './search.module.scss';

const Search = () => {
  return (
    <Input
      className={styles['search']}
      icon={<SearchIcon />}
      variant='primary'
      placeholder='Найти кондиционер...'
    />
  );
};

export default Search;
