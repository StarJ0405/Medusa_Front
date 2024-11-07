import { requester } from "App";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getTokenPayload } from "shared/utils/Utils";

export const PointReducer = createSlice({
    name: "Point",
    initialState: {
        point: null
    },
    reducers: {
        refreshPoint : (state, action ) => {
            let point = action.payload;
            
            return {...state, point: point};
        },
        reset(state) {
            return { ...state, point: null };
        }
    },
    extraReducers: {

    }
});
