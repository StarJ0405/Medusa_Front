import { requester } from "App";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getTokenPayload, removeLocalStorage } from "shared/utils/Utils";

export const AuthReducer = createSlice({
    name: "Auth",
    initialState: {
        token: null
    },
    reducers: {
        setToken: (state, action) => {
            let token = action.payload;
            if (token) {
                requester.setAuthTokenHeader("Bearer " + token);
                setLocalStorage("token", token);
            }
            return { ...state, token: token };
        },
        reset(state) {
            // state = this.initialState;
            requester.setAuthTokenHeader(null);
                setLocalStorage("token", null);
            return { ...state, token: null };
        }

    },
    extraReducers: {

    }
});
