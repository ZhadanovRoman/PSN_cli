import { createSlice } from '@reduxjs/toolkit';

interface itemIdState {
    value: string;
}

const initialState: itemIdState = {
    value: '',
};

export const itemIdSlice = createSlice({
    name: 'itemId',
    initialState,
    reducers: {
        setitemId: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setitemId } = itemIdSlice.actions;
export default itemIdSlice.reducer;