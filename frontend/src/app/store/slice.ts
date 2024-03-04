import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
    redirectPath: string | null;
};

const initialState: State = {
    redirectPath: null,
};

const { reducer, actions, name } = createSlice({
    initialState,
    name: 'app',
    reducers: {
        navigate: (state, action: PayloadAction<string | null>) => {
            state.redirectPath = action.payload;
        },
    },
});

export { actions, name, reducer };
