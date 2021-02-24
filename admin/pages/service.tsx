import Layout from '@components/Layout';
import ServiceCreate from '@components/ServiceCreate/ServiceCreate';
import ServiceList from '@components/ServiceList/ServiceList';
import { getService } from '@redux/reducer/service';

import { AppInitialPropsWithRedux } from './_app';

export default function Service() {
  return (
    <Layout title='Панель услуг'>
      <ServiceCreate />
      <ServiceList />
    </Layout>
  );
}

Service.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  const services = reduxStore.getState().service.list;

  if (!services.length) {
    const promise = [reduxStore.dispatch(getService())];

    await Promise.all(promise);
  }
  return { err };
};
