import { createSlice } from '@reduxjs/toolkit';

interface btnChange {
    value: boolean;
}

const initialState: btnChange = {
    value: false,
};

export const btnChange = createSlice({
    name: 'btnChange',
    initialState,
    reducers: {
        stateBtnChange: (state) => {
            state.value = true;
        },
        stateBtnRemove: (state) => {
            state.value = false;
        }
        },
   
});

export const { stateBtnChange, stateBtnRemove } = btnChange.actions;
export default btnChange.reducer;