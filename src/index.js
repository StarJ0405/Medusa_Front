import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "lang/i18n";
import { createBrowserHistory } from "history";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {store, rootReducer } from "shared/RootReducer";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import "resources/css/styles.scss";
import "resources/css/styles.css";
import "resources/css/font/font.css";
import "resources/css/swiperStyle.css";
import "resources/css/react-contextmenu.css";
import "resources/css/tree.css";
import "react-toastify/dist/ReactToastify.css";

import ModalHandler from "modals/handler/ModalHandler";
import { getLocalStorage } from "shared/utils/Utils";
import { useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/lib/persistStore";



const history = createBrowserHistory();
let persistor = persistStore(store); // 데이터가 유지되는 Store를 생성

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [logger, ReduxThunk],
//   devTools: true,
// });
ModalHandler();

ReactDOM.render(
  //  <React.Fragment> Legacy context API has been detected within a strict-mode tree. 워닝뜨는 이유 : React.StrictMode => React.Fragment로 하면 안뜬다
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}> {/* React 사용할 경우 루트 구성 요소를 PersistGate로 래핑해야한다 */}  
        <App />
        </PersistGate>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
