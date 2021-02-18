import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  deleteProduct,
  Product,
  selectProductList,
} from '@redux/reducer/product';
import { Button } from '@verevinds/ui-kit';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProductList);
  const handleDelete = (id: Product['_id']) => async () => {
    dispatch(deleteProduct(id));
  };
  return (
    <>
      <h3>Список брендов</h3>
      {products.map(product => (
        <div key={product._id}>
          <p>{product.name}</p>
          <Button
            type='button'
            aria-label='Удалить'
            onClick={handleDelete(product._id)}
            data-tip
            data-for={product['_id']}
            icon={<FontAwesomeIcon icon={faTrash} />}
            variant='outline-danger'
          />
        </div>
      ))}
    </>
  );
};

export default ProductList;
