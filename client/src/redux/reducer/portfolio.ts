/* eslint-disable no-param-reassign */
import { handlePending, handleReject } from '@redux/caseReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '@src/utils/Api';

import type { RootState } from '.';

export type Portfolio = {
  _id: string;
  url: string;
  path: string;
  createdAt: string;
  updatedAt: string;
};
export type PortfolioReducer = {
  list: Portfolio[];
  isPending: boolean;
};

const initialState: PortfolioReducer = {
  list: [],
  isPending: false,
};

export const getPortfolio = createAsyncThunk('portfolio/getThunk', async () => {
  try {
    const { data } = await Api().get<Portfolio[]>(`/api/portfolio`);
    data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

    return data;
  } catch (e) {
    console.error(e);
  }
});

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    voidAction: () => {},
  },
  extraReducers: builder => {
    builder.addCase(getPortfolio.fulfilled, (state, { payload }) => {
      if (payload) state.list = payload;
      state.isPending = false;
    });

    builder.addCase(getPortfolio.pending, handlePending);

    builder.addCase(getPortfolio.rejected, handleReject);
  },
});

export const selectPortfolio = (state: RootState) => state.portfolio;
export const selectPortfolioList = (state: RootState) => state.portfolio.list;
export const selectPortfolioPending = (state: RootState) =>
  state.portfolio.isPending;

export const { voidAction } = portfolioSlice.actions;

export default portfolioSlice.reducer;
