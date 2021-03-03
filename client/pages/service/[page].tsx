import Dismantling from '@components/Dismantling';
import Installation from '@components/Installation';
import Layout from '@components/Layout/LayoutClient';
import Maintenance from '@components/Maintenance';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useMemo } from 'react';

type ServiceSlugProps = {
  page: 'installation' | 'dismantling' | 'maintenance';
};

const ServiceSlug: React.FC<ServiceSlugProps> = props => {
  const Content = useMemo(() => {
    switch (props.page) {
      case 'installation':
        return <Installation />;
      case 'dismantling':
        return <Dismantling />;
      case 'maintenance':
        return <Maintenance />;
      default:
        return null;
    }
  }, [props]);
  return <Layout>{Content}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: { ...params },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          page: 'installation',
        },
      },
      {
        params: {
          page: 'dismantling',
        },
      },
      {
        params: {
          page: 'maintenance',
        },
      },
    ],
    fallback: false,
  };
};
export default ServiceSlug;
