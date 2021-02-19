/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RestDelete } from '@src/type/api';
import Api from '@src/utils/Api';
import { AxiosResponse } from 'axios';
import cogoToast from 'cogo-toast';
import { ImageListType } from 'react-images-uploading';

import type { RootState } from '.';
import { Images } from './product';

export type Banner = {
  _id: string;
  name: string;
  url: string;
  enable: boolean;
  dateEnd?: string;
  createdAt: string;
  updatedAt: string;
};
export type BannersReducer = {
  list: Banner[];
  isPending: boolean;
};

const initialState: BannersReducer = {
  list: [],
  isPending: false,
};

export const getBanners = createAsyncThunk('banners/getThunk', async () => {
  try {
    const { data } = await Api().get<Banner[]>('/api/banners');
    data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

    return data;
  } catch (e) {
    console.error(e);
  }
});
export const addBanners = createAsyncThunk(
  'banners/addThunk',
  async (
    {
      banner,
      images,
    }: {
      banner: Pick<Banner, 'name' | 'dateEnd'>;
      images: ImageListType;
    },
    { rejectWithValue },
  ) => {
    try {
      const promiseImages: Promise<AxiosResponse<Images>>[] = [];

      images.forEach(image => {
        if (image.file) {
          const data = new FormData();
          data.append('file', image.file);
          data.append('folder', 'banners');
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

      Object.assign(banner, {
        url: arrayImages[0].url,
        path: arrayImages[0].path,
      });

      const { data } = await Api().post<{ banners: Banner; message: string }>(
        '/api/banners',
        banner,
      );

      return data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response.data);
    }
  },
);
export const deleteBanners = createAsyncThunk(
  'banners/deleteThunk',
  async (id: Banner['_id']) => {
    try {
      const { data } = await Api().delete<RestDelete>(`/api/banners/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    voidAction: () => {},
  },
  extraReducers: builder => {
    builder.addCase(getBanners.fulfilled, (state, { payload }) => {
      if (payload) state.list = payload;
    });
    builder.addCase(addBanners.pending, state => {
      state.isPending = true;
    });
    builder.addCase(addBanners.fulfilled, (state, { payload }) => {
      const { message, banners } = payload;
      if (banners && state.isPending) {
        const newList = state.list
          .concat([banners])
          .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        state.list = newList;
        cogoToast.success(message, {
          heading: 'Успешно добавлен',
          position: 'top-right',
        });
      }
      state.isPending = false;
    });
    builder.addCase(addBanners.rejected, (state, action) => {
      const { payload } = action as { payload: { message: string } };

      const { hide } = cogoToast.error(payload.message, {
        heading: 'Ошибка',
        position: 'top-right',
        hideAfter: 1000,
        onClick: () => {
          if (hide) hide();
        },
      });
      state.isPending = false;
    });
    builder.addCase(deleteBanners.fulfilled, (state, { payload }) => {
      if (payload && !payload.err)
        state.list = state.list.filter(brand => brand._id !== payload._id);
      cogoToast.success(`${payload?.message}`, {
        heading: 'Успешно удалён',
        position: 'top-right',
      });
    });
  },
});

export const selectBanners = (state: RootState) => state.banners;
export const selectBannersList = (state: RootState) => state.banners.list;

export const { voidAction } = bannersSlice.actions;

export default bannersSlice.reducer;