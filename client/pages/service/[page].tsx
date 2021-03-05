import type { GetStaticPaths, GetStaticProps } from 'next';
import { useMemo } from 'react';

import Dismantling from '../../src/components/Dismantling';
import Installation from '../../src/components/Installation';
import Layout from '../../src/components/Layout/LayoutClient';
import Maintenance from '../../src/components/Maintenance';

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
