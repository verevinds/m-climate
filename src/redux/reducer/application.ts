import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParsedUrlQuery } from 'querystring';
import { RootState } from '.';

interface IInitialState {
    context: {
        pathname: string;
        query: ParsedUrlQuery;
    };
}

const initialState: IInitialState = {
    context: { pathname: '', query: {} },
};

const application = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setContext: (
            state,
            { payload }: PayloadAction<{ pathname: string; query: ParsedUrlQuery }>
        ) => {
            state.context = payload;
        },
    },
});

export const selectApplication = (state: RootState) => state.application;
export const selectApplicationContext = (state: RootState) => state.application.context;

export const { setContext } = application.actions;

export default application.reducer;
