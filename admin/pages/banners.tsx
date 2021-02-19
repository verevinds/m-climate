import BannersCreate from '@components/BannersCreate';
import BannersList from '@components/BannersList';
import Layout from '@components/Layout';
import { getBanners } from '@redux/reducer/banners';

import { AppInitialPropsWithRedux } from './_app';

const Banners = () => {
  return (
    <Layout title='Настройка баннеров'>
      <BannersCreate />
      <BannersList />
    </Layout>
  );
};
Banners.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  const promise = [reduxStore.dispatch(getBanners())];

  await Promise.all(promise);

  return { err };
};

export default Banners;
