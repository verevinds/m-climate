import LayoutAdmin from '@components/Layout/LayoutAdmin';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActiveLink from '@src/lib/ActiveLink';
import styles from 'src/scss/pages/brand.module.scss';

const Brand = () => {
    return (
        <LayoutAdmin>
            <h1>Настройка брендов</h1>
            <ActiveLink
                href={'/admin/brand?type=new'}
                activeClassName={styles['-active']}
                exec={false}
            >
                <a>
                    <span>Создать</span>
                    <FontAwesomeIcon icon={faPlusCircle} />
                </a>
            </ActiveLink>
        </LayoutAdmin>
    );
};

export default Brand;
