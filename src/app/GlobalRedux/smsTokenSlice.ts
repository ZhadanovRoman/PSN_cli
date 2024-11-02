import { createSlice } from '@reduxjs/toolkit';

interface smsTokenState {
    value: string;
}

const initialState: smsTokenState = {
    value: '',
};

export const smsTokenSlice = createSlice({
    name: 'smsToken',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setToken } = smsTokenSlice.actions;
export default smsTokenSlice.reducer;