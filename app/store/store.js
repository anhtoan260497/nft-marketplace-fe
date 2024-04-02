import modalSlice from "@/features/modalSlice";
import moralisSlice from "@/features/moralisSlice";
import toastSlice from "@/features/toastSlice";
import { configureStore } from "@reduxjs/toolkit";

const reducers = {
    modalReducer : modalSlice,
    toastReducer : toastSlice,
    moralisReducer : moralisSlice
}

export const store = configureStore({
    reducer : reducers
})
