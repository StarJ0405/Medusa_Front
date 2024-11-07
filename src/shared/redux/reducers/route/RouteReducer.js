import { requester } from "App";
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { useNavigate, useLocation } from "react-router-dom";

const goToHome = createAction("goToHome");
// window.location.href
// window.location.protocol
// window.location.host
// window.location.hostname
// window.location.port
// window.location.pathname
// window.location.search

// export const goToHome = () => (dispatch, getState, { history }) => {
//     history.push('/');
// };

export const RouteReducer = createSlice({
    name : "Route",
    initialState : 0,
    reducers : {

    },
    extraReducers: {
        [goToHome]: (state, action) => {
            window.location.href = "/";
            return { ...state, path: window.location.pathname }
        }
    }
});