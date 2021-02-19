import BannersCreate from '@components/BannersCreate';
import BannersList from '@components/BannersList';
import Layout from '@components/Layout';
import Spinner from '@components/Spinner/Spinner';
import { getBanners, selectBannersPending } from '@redux/reducer/banners';
import { useSelector } from 'react-redux';

import { AppInitialPropsWithRedux } from './_app';

const Banners = () => {
  const isPending = useSelector(selectBannersPending);

  return (
    <Layout title='Настройка баннеров'>
      <BannersCreate />
      <BannersList />

      {isPending && <Spinner />}
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
