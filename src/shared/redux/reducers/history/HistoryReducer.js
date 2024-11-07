import { requester } from "App";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getTokenPayload } from "shared/utils/Utils";

export const HistoryReducer = createSlice({
    name: "History",
    initialState: {
        prevUrl: "/",
        currentUrl: "/",
        isLoading : false
    },
    reducers: {
        setHistory: (state, action) => {
            let payload = action.payload;

            return { ...state, prevUrl: state.currentUrl, currentUrl: payload };
        },
        setLoading: (state, action) => {
            let payload = action.payload;

            return { ...state, prevUrl: state.currentUrl, isLoading: payload };
        },
        reset(state) {
            return {...state, prevUrl: "/", currentUrl: "/", isLoading:false};
        }
    },
    extraReducers: {

    }
});
