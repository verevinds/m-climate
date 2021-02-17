import Layout from '@components/Layout';
import { getProducts } from '@redux/reducer/product';

import { AppInitialPropsWithRedux } from './_app';

const Item = () => {
  return <Layout title='Настройка товара' />;
};
Item.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  const promise = [reduxStore.dispatch(getProducts())];

  await Promise.all(promise);

  return { err };
};
export default Item;
