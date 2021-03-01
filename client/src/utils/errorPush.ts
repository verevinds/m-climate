import cogoToast from 'cogo-toast';

export default (message: string) => {
  const { hide } = cogoToast.error(message, {
    heading: 'Ошибка',
    position: 'top-right',
    hideAfter: 1000,
    onClick: () => {
      if (hide) hide();
    },
  });
};
