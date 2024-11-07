import { requester } from "App";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getTokenPayload } from "shared/utils/Utils";

export const CartReducer = createSlice({
    name: "Cart",
    initialState: {
        products: null
    },
    reducers: {
        refreshCart : (state, action ) => {
            let products = action.payload;
            
            return {...state, products: products};
        },
        reset(state) {
            return { ...state, products: null };
        }
    },
    extraReducers: {

    }
});
