/* eslint-disable no-param-reassign */
import { handlePending, handleReject } from '@redux/caseReducer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Images } from '@src/interface';
import { RestDelete } from '@src/type/api';
import Api from '@src/utils/Api';
import { AxiosResponse } from 'axios';
import cogoToast from 'cogo-toast';
import { ImageListType } from 'react-images-uploading';

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

export const addPortfolio = createAsyncThunk(
  'portfolio/addThunk',
  async (images: ImageListType, { rejectWithValue }) => {
    try {
      const promiseImages: Promise<AxiosResponse<Images>>[] = [];

      images.forEach(image => {
        if (image.file) {
          const data = new FormData();
          data.append('file', image.file);
          data.append('folder', 'portfolio');
          const promiseImage = Api().post<Images>('/api/files', data);
          promiseImages.push(promiseImage);
        }
      });

      const responseImages = await Promise.all(promiseImages);

      const arrayImages = responseImages.map(response => ({
        url: response?.data.url,
        path: response?.data.path,
        filename: response?.data.filename,
      }));

      const portfolio = {
        url: arrayImages[0].url,
        path: arrayImages[0].path,
      };

      const { data } = await Api().post<{
        portfolio: Portfolio;
        message: string;
      }>('/api/portfolio', portfolio);

      return data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  },
);

export const deletePortfolio = createAsyncThunk(
  'portfolio/deleteThunk',
  async (id: Portfolio['_id']) => {
    try {
      const { data } = await Api().delete<RestDelete>(`/api/portfolio/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

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
    builder.addCase(addPortfolio.fulfilled, (state, { payload }) => {
      const { message, portfolio } = payload;
      if (portfolio && state.isPending) {
        const newList = state.list
          .concat([portfolio])
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

        state.list = newList;

        cogoToast.success(message, {
          heading: 'Успешно добавлен',
          position: 'top-right',
        });
      }
      state.isPending = false;
    });
    builder.addCase(deletePortfolio.fulfilled, (state, { payload }) => {
      if (payload && !payload.err)
        state.list = state.list.filter(img => img._id !== payload._id);

      cogoToast.success(`${payload?.message}`, {
        heading: 'Успешно удалён',
        position: 'top-right',
      });

      state.isPending = false;
    });

    builder.addCase(getPortfolio.pending, handlePending);
    builder.addCase(addPortfolio.pending, handlePending);
    builder.addCase(deletePortfolio.pending, handlePending);

    builder.addCase(getPortfolio.rejected, handleReject);
    builder.addCase(addPortfolio.rejected, handleReject);
    builder.addCase(deletePortfolio.rejected, handleReject);
  },
});

export const selectPortfolio = (state: RootState) => state.portfolio;
export const selectPortfolioList = (state: RootState) => state.portfolio.list;
export const selectPortfolioPending = (state: RootState) =>
  state.portfolio.isPending;

export const { voidAction } = portfolioSlice.actions;

export default portfolioSlice.reducer;
