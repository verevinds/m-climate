import Layout from '@components/Layout';
import PortfolioCreate from '@components/PortfolioCreate';
import PortfolioList from '@components/PortfolioList';
import Spinner from '@components/Spinner/Spinner';
import { useSelector } from 'react-redux';

import {
  getPortfolio,
  selectPortfolioPending,
} from '../src/redux/reducer/portfolio';
import { AppInitialPropsWithRedux } from './_app';

const Portfolio = () => {
  const isPending = useSelector(selectPortfolioPending);
  return (
    <Layout title='Настройка портфолио'>
      <PortfolioCreate />
      <PortfolioList />
      {isPending && <Spinner />}
    </Layout>
  );
};
Portfolio.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  const promise = [reduxStore.dispatch(getPortfolio())];

  await Promise.all(promise);
  return { err };
};

export default Portfolio;
