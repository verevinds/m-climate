import Item from '@components/Item';
import Layout from '@components/Layout/LayoutClient';
import { getGeo } from '@redux/reducer/application/geo';
import { getBrands, selectBrandList } from '@redux/reducer/brand';
import { getProducts, selectProductList } from '@redux/reducer/product';
import { AppInitialPropsWithRedux } from '@src/interface';
import { useRouter } from 'next/dist/client/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const ProductPage = () => {
  const products = useSelector(selectProductList);
  const brands = useSelector(selectBrandList);
  const { query } = useRouter();

  const text = useMemo(() => {
    let draft = '';
    if (query) {
      if (query.brand) {
        const brand = brands.find(el => el._id === query.brand);
        draft += brand?.name;
      }
    }
    return draft;
  }, [query, brands]);

  return (
    <Layout>
      <h1>{`Каталог кондиционеров ${text}`}</h1>
      {products.map(product => (
        <Item key={product._id} {...product} />
      ))}
    </Layout>
  );
};
ProductPage.getInitialProps = async ({
  reduxStore,
  query,
  req,
}: AppInitialPropsWithRedux) => {
  const subdomain = (req && req.headers.host?.split('.')[0]) || 'nsk';
  await reduxStore.dispatch(getGeo({ subdomain }));
  console.log(query);
  const promise = [
    reduxStore.dispatch(getProducts(query)),
    reduxStore.dispatch(getBrands()),
  ];
  await Promise.all(promise);
  return { query };
};
export default ProductPage;
