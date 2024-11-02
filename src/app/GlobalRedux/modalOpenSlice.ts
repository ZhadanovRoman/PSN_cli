"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface modalOpenSlice {
    value: boolean
}

const initialState: modalOpenSlice = {
    value: false
}

export const modalOpenSlice = createSlice({
    name: 'modalOpenSlice',
    initialState,
    reducers: {
        stateModalChange: (state) => {
            state.value = true;
        },
        stateModalRemove: (state) => {
            state.value = false;
        }
    }
})
export const { stateModalChange, stateModalRemove } = modalOpenSlice.actions;
export default modalOpenSlice.reducer;