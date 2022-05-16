import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearUser, setUser } from "./userSlice";
import baseUrl from "../../utils/baseUrl";

const initialState = {
    loggedIn: false,
    isLoading: true,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reload: (state) => {
            state.isLoading = true;
        },
        validateLogin: (state) => {
            console.log("validate");
            state.loggedIn = true;
        },
        login: (state, action) => {
            state.loggedIn = action.payload.success;
            state.isLoading = false;
            action.payload.success &&
                localStorage.setItem("fam-id", action.payload.famID);
        },
        logout: (state) => {
            state.loggedIn = false;
        },
        clearId: (state) => {
            state.loggedIn = false;
            state.isLoading = false;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(revalidateSession.pending, (state) => {
            console.log("pending");
            if (localStorage.getItem("fam-id")) {
                state.loggedIn = true;
            } else {
                state.loggedIn = false;
            }

            state.isLoading = true;
        });
        builder.addCase(revalidateSession.fulfilled, (state, { payload }) => {
            console.log("Fulf", payload);
            state.loggedIn = payload;
            state.isLoading = false;
        });
        builder.addCase(revalidateSession.rejected, (state, { payload }) => {
            state.loggedIn = payload;
        });
    },
});

// actions
export const { login, logout, clearId, validateLogin, reload } =
    authSlice.actions;

// selector
export const isLoggedIn = (state) => state.auth.loggedIn;
export const isLoading = (state) => state.auth.isLoading;
export const auth = (state) => state.auth;

// reducers
export const persistLogin = () => (dispatch) => {
    dispatch(validateLogin());
};

export const checkSession = () => (dispatch) => {
    if (localStorage.getItem("fam-id") === null) {
        // invalidate this user
        console.log("Clearing Fields");
        dispatch(clearId());
        dispatch(clearUser());
    } else {
        console.log("Session Found!");
        dispatch(validateLogin());
        dispatch(revalidateSession(localStorage.getItem("fam-id")));
    }
};

export const logoutUser = (navigate) => async (dispatch) => {
    try {
        const out = await axios.get(`${baseUrl}/account/logout`);

        navigate(0);
        console.log("Logout to all tabs");
        localStorage.removeItem("fam-id");
        dispatch(clearUser());
        dispatch(logout(out.data.logout));
    } catch (e) {
        navigate("/");
        console.log("Error", e);
    }
};

const revalidateSession = createAsyncThunk(
    "auth/account/ses",
    async (data, { dispatch }) => {
        dispatch(reload());
        try {
            const ses = await axios.get(`${baseUrl}/account/ses`, {
                headers: {
                    Authorization: `Bearer ${data}`,
                },
                withCredentials: true,
            });
            console.log(ses.data);
            // get user data
            // dispatch(login(ses.data));
            dispatch(setUser(ses.data.user));

            return ses.data.success;
        } catch (e) {
            console.log("Rejected", e.response.data);
            dispatch(clearUser());
            localStorage.removeItem("fam-id");
            return false;
        }
    }
);

export const loginUser =
    ({ success, navigate, location }) =>
    async (dispatch) => {
        console.log("Apply refresh to all tabs after login"); // only need to refresh page to validate login

        dispatch(reload());
        dispatch(login(success));
        location.state !== null
            ? navigate(location.state) // navigate to last visited page
            : navigate("/search");
        // dispatch(checkSession());
    };

export const registerUser =
    ({ navigate, data }) =>
    (dispatch) => {
        console.log("registering user....");
        dispatch(login(data));
        navigate("/account/profile/monica");
    };

export default authSlice.reducer;
