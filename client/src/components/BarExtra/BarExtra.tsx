import Bar from '@components/Bar/Bar';
import { selectBrandList } from '@redux/reducer/brand';
import { selectProductList } from '@redux/reducer/product';
import { useSelector } from 'react-redux';

const BarExtra = () => {
  const brands = useSelector(selectBrandList);
  const products = useSelector(selectProductList);

  return (
    <>
      {brands.map(brand => (
        <Bar
          key={brand._id}
          title={brand.name}
          items={products.filter(product => product.brand?.name === brand.name)}
        />
      ))}
    </>
  );
};

export default BarExtra;
