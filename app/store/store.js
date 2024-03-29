import modalSlice from "@/features/modalSlice";
import toastSlice from "@/features/toastSlice";
import { configureStore } from "@reduxjs/toolkit";

const reducers = {
    modalReducer : modalSlice,
    toastReducer : toastSlice
}

export const store = configureStore({
    reducer : reducers
})
