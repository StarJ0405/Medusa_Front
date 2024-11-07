import { requester } from "App";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getTokenPayload, clone } from "shared/utils/Utils";

export const OrderInfoReducer = createSlice({
    name: "OrderInfo",
    initialState: {
        products: null
    },
    reducers: {
        refreshOrderProducts: (state, action) => {
            let products = clone(action.payload);
            products = products.map((product) => {
                product.id = null;
                if (product.product.brandId) {
                    product.product.brandId = null;
                }
                if (product.product.brand && product.product.brand.children) {
                    product.product.brand.children = null;
                }
                return product;
            });
            return { ...state, products: products };
        },
        reset(state) {
            return { ...state, products: null };
        }
    },
    extraReducers: {

    }
});
