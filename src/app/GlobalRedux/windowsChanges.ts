import { createSlice } from '@reduxjs/toolkit';

interface windowChange {
    value: boolean;
}

const initialState: windowChange = {
    value: false,
};

export const windowChange = createSlice({
    name: 'windowChanges',
    initialState,
    reducers: {
        stateWindowChange: (state) => {
            state.value = true;
        },
        stateWindowRemove: (state) => {
            state.value = false;
        }
        },
   
});

export const { stateWindowChange, stateWindowRemove } = windowChange.actions;
export default windowChange.reducer;