import Location from '@components/Location/Location';
import { selectBrandList } from '@redux/reducer/brand';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import MenuBlock from './MenuBlock';
import styles from './menudropdown.module.scss';

type MenuDropdownProps = {
  show: boolean;
};
const MenuDropdown: React.FC<MenuDropdownProps> = ({ show }) => {
  const brands = useSelector(selectBrandList);
  const services = [
    { _id: 'installation', name: 'Стандартный монтаж' },
    { _id: 'dismantling', name: 'Демонтаж кондиционера' },
    { _id: 'maintenance', name: 'Сервисное обслуживание' },
  ];
  return (
    <div className={cn(styles['wrap'], show && styles['show'])}>
      <Location className={styles['location']} />
      <MenuBlock items={brands} title='Кондиционеры' path='/product?brand=' />
      <MenuBlock items={services} title='Услуги' path='/service/' />
    </div>
  );
};

export default MenuDropdown;
