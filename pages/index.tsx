import Bar from '@components/Bar/Bar';
import Layout from '@components/Layout/Layout';
import Item from '@components/Item/Item'
import styles from '@src/scss/pages/index.module.scss';

const IndexPage = () => {
    if (!process.browser) return null;
    return (
        <Layout>
            <Bar title='Популярные'/>
            <Bar title='Кондиционеры'/>
            <Bar title='Услуги'/>
        </Layout>
    );
};

export default IndexPage;
