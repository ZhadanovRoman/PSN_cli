"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface LoginSlice {
    value: boolean
}

const initialState: LoginSlice = {
    value: false
}

export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        stateChange: (state) => {
            state.value = true;
        },
        stateRemove: (state) => {
            state.value = false;
        }
    }
})
export const { stateChange, stateRemove } = loginSlice.actions;
export default loginSlice.reducer;