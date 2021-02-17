import { selectProductList } from '@redux/reducer/product';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const products = useSelector(selectProductList);
  return (
    <>
      <h3>Список брендов</h3>
      {products.map(product => (
        <p key={product._id}>{product.name}</p>
      ))}
    </>
  );
};

export default ProductList;
