import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import {AuthReducer} from "shared/redux/reducers/auth/AuthReducer";
import {RouteReducer} from "shared/redux/reducers/route/RouteReducer";
import { HistoryReducer } from './redux/reducers/history/HistoryReducer';
import { SearchConditionReducer } from './redux/reducers/product/SearchConditionReducer';
import { CartReducer } from './redux/reducers/shopping/CartReducer';
import { DirectPurchaseReducer } from './redux/reducers/shopping/DirectPurchaseReducer';
import { OrderInfoReducer } from './redux/reducers/shopping/OrderInfoReducer';
import { PointReducer } from './redux/reducers/shopping/PointReducer';
import { WishReducer } from './redux/reducers/shopping/WishReducer';
import { VendorReducer } from './redux/reducers/vendor/VendorReducer';
import { persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import ReduxThunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage: storage, // 저장 공간
    whitelist: ['orderInfo', 'cart'], // 유지하고 싶은 값
    blacklist: [] // 유지하지 않을 내용 (새로고침했을 때 날려도 괜찮은 것)
  };
  

const rootReducer = combineReducers({
    auth : AuthReducer.reducer,
    cart : CartReducer.reducer,
    orderInfo : OrderInfoReducer.reducer,
    wish : WishReducer.reducer,
    directPurchase : DirectPurchaseReducer.reducer,
    searchCondition : SearchConditionReducer.reducer,
    history : HistoryReducer.reducer,
    vendor : VendorReducer.reducer,
    point : PointReducer.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [logger, ReduxThunk],
    devTools: true,
})

// export default store;