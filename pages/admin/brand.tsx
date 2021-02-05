import type { AppContext } from 'next/app';
import LayoutAdmin from '@components/Layout/LayoutAdmin';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActiveLink from '@src/lib/ActiveLink';
import styles from 'src/scss/pages/brand.module.scss';
import { NextPage } from 'next';

const Brand: NextPage<Pick<AppContext['ctx'], 'pathname' | 'query'>> = ({
    pathname,
}) => {
    return (
        <LayoutAdmin>
            <div>
                <h1>Настройка брендов</h1>
                <ActiveLink
                    href={`${pathname}?type=new`}
                    activeClassName={styles['-active']}
                    exec={false}
                >
                    <a>
                        <span>Создать</span>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </a>
                </ActiveLink>
            </div>
        </LayoutAdmin>
    );
};
Brand.getInitialProps = async ({ pathname, query }) => {
    return { pathname, query };
};

export default Brand;
