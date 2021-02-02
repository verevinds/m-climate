import Bar from '@components/Bar/Bar';
import Layout from '@components/Layout/LayoutClient';
import Advantage from '@components/Advantage/Advantage';

const IndexPage = () => {
    if (!process.browser) return null;
    return (
        <Layout>
            <Bar title='Популярные' items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}/>
            <Bar title='Кондиционеры'  items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}/>
            <Bar title='Услуги'  items={[1, 2, 3]}/>
            <Advantage />
        </Layout>
    );
};

export default IndexPage;
