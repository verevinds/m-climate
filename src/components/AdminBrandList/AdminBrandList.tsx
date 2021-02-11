import { selectBrand } from '@redux/reducer/brand';
import { useSelector } from 'react-redux';

const AdminBrandList = () => {
  const { list } = useSelector(selectBrand);

  return (
    <>
      {list.map(el => (
        <p key={el['_id']}>{el.name}</p>
      ))}
    </>
  );
};

export default AdminBrandList;
