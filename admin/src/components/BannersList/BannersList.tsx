import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Banner,
  deleteBanners,
  selectBannersList,
} from '@redux/reducer/banners';
import { Button } from '@verevinds/ui-kit';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = () => {
  const dispatch = useDispatch();

  const banners = useSelector(selectBannersList);
  const handleDelete = (id: Banner['_id']) => async () => {
    dispatch(deleteBanners(id));
  };
  return (
    <>
      <h3>Список брендов</h3>
      {banners.map(banner => (
        <div key={banner._id}>
          <img src={banner.url} alt={banner.name} />
          <p>{banner.name}</p>
          <Button
            type='button'
            aria-label='Удалить'
            onClick={handleDelete(banner._id)}
            data-tip
            data-for={banner['_id']}
            icon={<FontAwesomeIcon icon={faTrash} />}
            variant='outline-danger'
          />
        </div>
      ))}
    </>
  );
};

export default ProductList;
