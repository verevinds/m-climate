import Advantage from '@components/Advantage/Advantage';
import Bar from '@components/Bar/Bar';
import Layout from '@components/Layout/LayoutClient';

const IndexPage = () => {
  return (
    <Layout>
      <Bar
        title='Популярные'
        items={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
        key='1'
      />
      <Bar
        title='Кондиционеры'
        items={[
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 },
        ]}
        key='2'
      />
      <Bar title='Услуги' items={[{ id: 1 }, { id: 2 }, { id: 3 }]} key='3' />
      <Advantage />
    </Layout>
  );
};

export default IndexPage;
