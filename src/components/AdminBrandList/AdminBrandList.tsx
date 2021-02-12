import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Brand } from '@redux/reducer/brand';
import { deleteBrand, selectBrand } from '@redux/reducer/brand';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

const AdminBrandList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(selectBrand);
  const handleDelete = (id: Brand['_id']) => async () => {
    const data = dispatch(deleteBrand(id));
    console.info(data);
  };

  return (
    <>
      {list.map(el => (
        <div key={el['_id']}>
          <p>{`${el.name} ${moment(el.createdAt).format('DD.MM.YY HH:mm')}`}</p>
          <button
            type='button'
            aria-label='Удалить'
            onClick={handleDelete(el._id)}
          >
            <FontAwesomeIcon icon={faTrash} color='red' />
          </button>
        </div>
      ))}
    </>
  );
};

export default AdminBrandList;
