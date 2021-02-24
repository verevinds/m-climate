import Layout from '@components/Layout';
import { getService, selectServiceList } from '@redux/reducer/service';
import { useSelector } from 'react-redux';

import { AppInitialPropsWithRedux } from './_app';

const Service = () => {
  const services = useSelector(selectServiceList);
  return (
    <Layout title='Панель услуг'>
      <h2>Добавить услугу</h2>
      {services.map(service => (
        <p key={service._id}>{service.name}</p>
      ))}
    </Layout>
  );
};

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

export default Service;
