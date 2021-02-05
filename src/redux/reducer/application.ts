import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface IInitialState {
    context: {
        pathname: string;
        query: string;
    };
}

const initialState: IInitialState = {
    context: { pathname: '', query: '' },
};

const application = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setContext: (
            state,
            { payload }: PayloadAction<{ pathname: string; query: string }>
        ) => {
            state.context = payload;
        },
    },
});

export const selectApplication = (state: RootState) => state.application;
export const selectApplicationContext = (state: RootState) => state.application.context;

export const { setContext } = application.actions;

export default application.reducer;
