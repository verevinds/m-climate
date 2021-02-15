import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Brand } from '@redux/reducer/brand';
import { deleteBrand, selectBrand } from '@redux/reducer/brand';
import { Button } from '@verevinds/ui-kit';
import { DateTime } from 'luxon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import styles from './adminbrandlist.module.scss';

const AdminBrandItems = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(selectBrand);

  const handleDelete = (id: Brand['_id']) => async () => {
    dispatch(deleteBrand(id));
  };
  return (
    <>
      {list.map(el => (
        <React.Fragment key={el['_id']}>
          <span className={styles['name']}>{el.name}</span>
          <span className={styles['date']}>
            {DateTime.fromISO(el.createdAt)
              .setLocale('ru')
              .toFormat('dd.MM.yy HH:mm')}
          </span>
          <Button
            type='button'
            aria-label='Удалить'
            onClick={handleDelete(el._id)}
            data-tip
            data-for={el['_id']}
            icon={<FontAwesomeIcon icon={faTrash} />}
            variant='outline-danger'
          />
          <ReactTooltip id={el['_id']} effect='float'>
            <span>Удалить</span>
          </ReactTooltip>
        </React.Fragment>
      ))}
    </>
  );
};

export default React.memo(AdminBrandItems);
