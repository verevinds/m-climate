import type { FC } from 'react';

import styles from './notfound.module.scss';

type NotFoundProps = { text?: string };

const NotFound: FC<NotFoundProps> = ({ text }) => {
  return (
    <div className={styles['main']}>
      <div className={styles['fof']}>
        <h1>{text || 'Error 404'}</h1>
        <a href='/'>Перейти на главную</a>
      </div>
    </div>
  );
};

export default NotFound;
