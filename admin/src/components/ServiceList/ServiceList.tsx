import { selectServiceList } from '@redux/reducer/service';
import { useSelector } from 'react-redux';

const ServiceList = () => {
  const services = useSelector(selectServiceList);
  return (
    <>
      {services.map(service => (
        <p key={service._id}>{service.name}</p>
      ))}
    </>
  );
};

export default ServiceList;
