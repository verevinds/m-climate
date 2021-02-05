import { useSelector } from 'react-redux';

import LayoutAdmin from '@components/Layout/LayoutAdmin';
import ActiveLink from '@src/lib/ActiveLink';

import { selectApplicationContext } from '@redux/reducer/application';

import styles from 'src/scss/pages/brand.module.scss';
import { faList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Brand = () => {
    const { pathname } = useSelector(selectApplicationContext);
    return (
        <LayoutAdmin>
            <div>
                <h1>Настройка брендов</h1>
                <ActiveLink
                    href={`${pathname}`}
                    activeClassName={styles['-active']}
                    exec={false}
                >
                    <a>
                        <FontAwesomeIcon icon={faList} />
                        <span>Список</span>
                    </a>
                </ActiveLink>
                <ActiveLink
                    href={`${pathname}?type=new`}
                    activeClassName={styles['-active']}
                    exec={false}
                >
                    <a>
                        <FontAwesomeIcon icon={faPlusCircle} />
                        <span>Создать</span>
                    </a>
                </ActiveLink>
            </div>
        </LayoutAdmin>
    );
};

export default Brand;
