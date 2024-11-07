import { requester } from "App";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, getTokenPayload } from "shared/utils/Utils";

export const SearchConditionReducer = createSlice({
    name: "SearchCondition",
    initialState: {
        searchCondition: {
            keyword: null,
            price: { from: 0, to: 300 },
            brands: [],
            categories: [],
            cooling: { from: 0, to: 5 },
            weight: { from: 0, to: 5 },
            blow: { from: 0, to: 5 },
            fresh: { from: 0, to: 5 },
            sweet: { from: 0, to: 5 }
        }
    },
    reducers: {
        refreshSearchCondition: (state, action) => {
            let searchCondition = action.payload;

            return { ...state, searchCondition : searchCondition };
        },
        reset(state) {
            return { ...state, searchCondition: {
                keyword: null,
                price: { from: 0, to: 300 },
                brands: [],
                categories: [],
                cooling: { from: 0, to: 5 },
                weight: { from: 0, to: 5 },
                blow: { from: 0, to: 5 },
                fresh: { from: 0, to: 5 },
                sweet: { from: 0, to: 5 }
            } };
        }
    },
    extraReducers: {

    }
});
