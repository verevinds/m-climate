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

export type Banner = {
  _id: string;
  name: string;
  url: string;
  href: string;
  enable: boolean;
  dateEnd: string;
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

export const getBanners = createAsyncThunk(
  'banners/getThunk',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState;
      const { city } = state.application.geo;
      const { data } = await Api().get<Banner[]>(`/api/banners/?city=${city}`);
      data.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));

      return data;
    } catch (e) {
      console.error(e);
    }
  },
);
export const addBanners = createAsyncThunk(
  'banners/addThunk',
  async (
    {
      banner,
      images,
      imagesMobile,
    }: {
      banner: Pick<Banner, 'name' | 'dateEnd'>;
      images: ImageListType;
      imagesMobile: ImageListType;
    },
    { rejectWithValue, getState },
  ) => {
    try {
      const addImage = async (imagesArray: ImageListType) => {
        const promiseImages: Promise<AxiosResponse<Images>>[] = [];

        imagesArray.forEach(image => {
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
        return arrayImages;
      };

      const state = getState() as RootState;
      const { city } = state.application.geo;

      const arrayImages = await addImage(images);
      const arrayImagesMobile = await addImage(imagesMobile);

      Object.assign(banner, {
        url: arrayImages[0].url,
        path: arrayImages[0].path,
        urlMobile: arrayImagesMobile[0].url,
        pathMobile: arrayImagesMobile[0].path,
        city,
      });
      console.log({ banner });
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
      state.isPending = false;
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
    builder.addCase(deleteBanners.fulfilled, (state, { payload }) => {
      if (payload && !payload.err)
        state.list = state.list.filter(brand => brand._id !== payload._id);
      cogoToast.success(`${payload?.message}`, {
        heading: 'Успешно удалён',
        position: 'top-right',
      });
      state.isPending = false;
    });

    builder.addCase(getBanners.pending, handlePending);
    builder.addCase(addBanners.pending, handlePending);
    builder.addCase(deleteBanners.pending, handlePending);

    builder.addCase(getBanners.rejected, handleReject);
    builder.addCase(addBanners.rejected, handleReject);
    builder.addCase(deleteBanners.rejected, handleReject);
  },
});

export const selectBanners = (state: RootState) => state.banners;
export const selectBannersList = (state: RootState) => state.banners.list;
export const selectBannersPending = (state: RootState) =>
  state.banners.isPending;

export const { voidAction } = bannersSlice.actions;

export default bannersSlice.reducer;
