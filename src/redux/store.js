import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slicer/userSlice";
import authSlice from "./slicer/authSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        auth: authSlice,
    },
});
