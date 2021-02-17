import { selectProductList } from '@redux/reducer/product';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const products = useSelector(selectProductList);
  return (
    <div>
      {products.map(product => (
        <p key={product._id}>{product.name}</p>
      ))}
    </div>
  );
};

export default ProductList;
