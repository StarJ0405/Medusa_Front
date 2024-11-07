import { BrowserView, MobileView, isBrowser, isMobile as isMobileBrowser } from "react-device-detect";

import React, { useState, createContext, useEffect, Component } from "react";
import Requester from "shared/Requester";
import MedusaRequester from "shared/Requester-Medusa";
import FileRequester from "shared/FileRequester";
import NiceModal from "@ebay/nice-modal-react";
import AuthProvider from "providers/AuthProvider";
import BrowserEventProvider from "providers/BrowserEventProvider";
import RootRouter from "router/RootRouter";
import PapagoRequester from "shared/PapagoRequester";
import { ToastContainer } from "react-toastify";
import style from "./App.module.css";
import { clone } from "shared/utils/Utils";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { useSelector, useDispatch } from "react-redux";
import Loading from "modals/base/Loading";

export const requester = new Requester();
export const medusaRequester = new MedusaRequester();
export const fileRequester = new FileRequester();
export const papagoRequester = new PapagoRequester();

function App() {
  const { isLoading } = useSelector((state) => ({
    isLoading: state.history.isLoading
  }));

  useEffect(() => {
    const disableScrollRestoration = () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    };

    disableScrollRestoration();

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return (
    <BrowserEventProvider>
      <div className={style.toast}>
        <ToastContainer />
      </div>
      <Loading isLoading={isLoading} />
      <NiceModal.Provider>
        <AuthProvider>
          <RootRouter />
        </AuthProvider>
      </NiceModal.Provider>
    </BrowserEventProvider>
  );
}

export default App;