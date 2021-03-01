import { CaseReducer } from '@reduxjs/toolkit';
import cogoToast from 'cogo-toast';

/* eslint-disable no-param-reassign */
export const handleReject: CaseReducer = (_state, action) => {
  const { payload } = action;

  const { hide } = cogoToast.error(payload.message, {
    heading: 'Ошибка',
    position: 'top-right',
    hideAfter: 1000,
    onClick: () => {
      if (hide) hide();
    },
  });
};
export const handlePending: CaseReducer = state => {
  state.isPending = true;
};
