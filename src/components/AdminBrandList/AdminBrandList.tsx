import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Brand } from '@redux/reducer/brand';
import { deleteBrand, selectBrand } from '@redux/reducer/brand';
import { DateTime } from 'luxon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import styles from './adminbrandlist.module.scss';

const AdminBrandList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(selectBrand);
  const handleDelete = (id: Brand['_id']) => async () => {
    const data = dispatch(deleteBrand(id));
    console.info(data);
  };

  return (
    <>
      <h3>Список брендов</h3>
      <div className={styles['item']}>
        <h4>Название</h4>
        <h4>Дата создания</h4>
        <span />
        {list.map(el => (
          <React.Fragment key={el['_id']}>
            <span className={styles['name']}>{el.name}</span>
            <span className={styles['date']}>
              {DateTime.fromISO(el.createdAt)
                .setLocale('ru')
                .toFormat('dd.MM.yy HH:mm')}
            </span>
            <button
              type='button'
              aria-label='Удалить'
              onClick={handleDelete(el._id)}
              className={styles['button']}
              data-tip
              data-for={el['_id']}
            >
              <FontAwesomeIcon icon={faTrash} color='red' />
            </button>
            <ReactTooltip id={el['_id']} effect='float'>
              <span>Удалить</span>
            </ReactTooltip>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default AdminBrandList;
