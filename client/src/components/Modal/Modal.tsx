/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import ReactDOM from 'react-dom';

import styles from './modal.module.scss';

type ModalContainerProps = {
  children: JSX.Element;
  show: boolean;
  onClose: () => void;
};
const ModalContainer: React.FC<ModalContainerProps> = props => {
  if (!props.show) return null;
  return ReactDOM.createPortal(
    <>
      <div className={styles['overlay']} onClick={props.onClose} />
      <div className={styles['window']}>{props.children}</div>
    </>,
    document.body,
  );
};

export default ModalContainer;
