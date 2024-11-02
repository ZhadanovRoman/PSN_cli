"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface smsPassSlice {
    value: boolean
}

const initialState: smsPassSlice = {
    value: false
}

export const smsPassSlice = createSlice({
    name: 'smsPass',
    initialState,
    reducers: {
        stateSmsPassChange: (state) => {
            state.value = true;
        },
        stateSmsPassRemove: (state) => {
            state.value = false;
        }
    }
})
export const { stateSmsPassChange, stateSmsPassRemove } = smsPassSlice.actions;
export default smsPassSlice.reducer;