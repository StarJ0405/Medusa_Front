import { BrowserDetectContext } from "providers/BrowserEventProvider";
import style from "./FrontLayout.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "routes/mobile/front/header/Header";
import clsx from "clsx";
import TopBar from "routes/main/top/TopBar";
import MenuBar from "./menuBar/MenuBar";
import Footer from "./footer/Footer";
import Dummy from "components/Dummy";
import { requester } from "App";
import { useDispatch } from "react-redux";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import { AuthContext } from "providers/AuthProvider";
import ChatButton from "components/buttons/ChatButton";
import TopButton from "components/buttons/TopButton";
import CartButton from "components/buttons/CartButton";

function FrontLayout() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { isAuthenticated } = useContext(AuthContext);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated === true) {
            requester.getAllCartProducts((result) => {
                if (result.code === 0) {
                    dispatch(CartReducer.actions.refreshCart(result.data));
                }
            });
            requester.getProductWishes((result) => {
                if (result.code === 0) {
                    dispatch(WishReducer.actions.refreshProducts(result.data));
                }
            })
        } else {
            dispatch(CartReducer.actions.refreshCart([]));
            dispatch(WishReducer.actions.refreshProducts([]));
        }
    }, [isAuthenticated]);

    return (
        <>
            <style> {`div {width:100%; }`}</style>
            <div className={clsx(style.container, { [style.mobile]: isMobile })}>
                {/* {!isMobile && <TopBar />} */}
                <div className={clsx(style.sticky, style.header)}>
                    <Header />
                </div>
                <div className={style.outlet}>
                    <Outlet />
                </div>
                <Dummy height={65} />
                <Footer />
            </div>
            {/* <CartButton /> */}
            <ChatButton />
            <TopButton />
        </>
    );
}

export default FrontLayout;