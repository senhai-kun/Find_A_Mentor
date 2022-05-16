import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    componentLoading: false,
};

export const uploadImage = createAsyncThunk(
    "auth/account/uploadimage",
    async (data, { dispatch }) => {
        try {
            const result = await axios.post(
                "http://localhost:5000/account/uploadimage",
                { img: data },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "fam-id"
                        )}`,
                    },
                    withCredentials: true,
                }
            );

            dispatch(setUser(result.data.user));

            return result.data.user;
        } catch (e) {
            console.log(e.response);
            return false;
        }
    }
);

export const userSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(uploadImage.pending, (state) => {
            state.componentLoading = true;
        });
        addCase(uploadImage.fulfilled, (state) => {
            state.componentLoading = false;
        });
        addCase(uploadImage.rejected, (state) => {
            state.componentLoading = false;
        });
    },
});

export const userData = (state) => state?.user?.user;
export const loadComponent = (state) => state.user.componentLoading;

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
