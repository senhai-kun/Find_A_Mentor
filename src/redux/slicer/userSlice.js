import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";

const initialState = {
    user: null,
    componentLoading: false,
};

export const updateProfile = createAsyncThunk(
    "auth/account/uploadimage",
    async ({ ismentor, img, firstname, lastname, location, ref_id }, { dispatch }) => {
        try {
            console.log(ismentor, img, firstname, lastname, location, ref_id)
            const result = await axios.post(
                `${baseUrl}/account/update_profile`,
                { ismentor, img, firstname, lastname, location, ref_id },
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
            console.log(state.user)

        },
        clearUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(updateProfile.pending, (state) => {
            state.componentLoading = true;
        });
        addCase(updateProfile.fulfilled, (state) => {
            state.componentLoading = false;
        });
        addCase(updateProfile.rejected, (state) => {
            state.componentLoading = false;
        });
    },
});

export const userData = (state) => state?.user?.user;
export const loadComponent = (state) => state.user.componentLoading;

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
