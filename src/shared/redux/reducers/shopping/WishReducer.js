import { requester } from "App";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getTokenPayload } from "shared/utils/Utils";

export const WishReducer = createSlice({
    name: "Wish",
    initialState: {
        products: null,
        brands: null
    },
    reducers: {
        refreshProducts : (state, action ) => {
            let products = action.payload;
            
            
            return {...state, products: products };
        },
        refreshBrands : (state, action ) => {
            let brands = action.payload;
            
            return {...state, brands: brands };
        },
        reset(state) {
            return { ...state, products: null, brands: null };
        }
        
    },
    extraReducers: {

    }
});
