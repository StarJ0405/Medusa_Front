import { requester } from "App";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getTokenPayload } from "shared/utils/Utils";

export const VendorReducer = createSlice({
    name: "Vendor",
    initialState: {
        sidebarUnfoldable: false,
        sidebarShow : true
    },
    reducers: {
        toggleSideBar : (state, action ) => {
            let sidebarShow = action.payload;
            
            return {...state, sidebarShow: sidebarShow};
        },
        toggleSidebarUnfoldable : (state, action ) => {
            let sidebarUnfoldable = action.payload;
            
            return {...state, sidebarUnfoldable: sidebarUnfoldable};
        },
        reset(state) {
            return { ...state, sidebarUnfoldable: false, sidebarShow : true };
        }
    },
    extraReducers: {

    }
});


