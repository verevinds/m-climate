import Layout from '@components/Layout/LayoutClient';
import PortfolioGallery from '@components/PortfolioGallery/PortfolioGallery';
import {
  turnOffPending,
  turnOnPending,
} from '@redux/reducer/application/tuning';
import { getPortfolio } from '@redux/reducer/portfolio';
import { AppInitialPropsWithRedux } from '@src/interface';

const Portfolio = () => {
  return (
    <Layout>
      <h1>Наши работы</h1>
      <PortfolioGallery />
    </Layout>
  );
};
Portfolio.getInitialProps = async ({
  err,
  reduxStore,
}: AppInitialPropsWithRedux) => {
  reduxStore.dispatch(turnOnPending());

  const promise = [reduxStore.dispatch(getPortfolio())];

  await Promise.all(promise);

  reduxStore.dispatch(turnOffPending());

  return { err };
};
export default Portfolio;
