"use client";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './loginSlice';
import modalOpenSlice from "./modalOpenSlice";
import smsPassSlice from "./smsPassSlice";
import smsTokenSlice from "./smsTokenSlice";
import createBtnSlice   from "./createBtnSlice";
import itemIdSlice  from "./itemIdSlice";
import  windowChange  from "./windowsChanges";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        modalChange: modalOpenSlice,
        smsPassChange: smsPassSlice,
        smsToken: smsTokenSlice,
        createBtn: createBtnSlice,
        itemId: itemIdSlice,
        windowChange: windowChange
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

