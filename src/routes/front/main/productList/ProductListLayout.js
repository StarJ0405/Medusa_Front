import style from "./ProductListLayout.module.css";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import clsx from "clsx";
import { useCallback, useContext, useEffect, useState } from "react";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import Center from "layouts/wrapper/Center";
import SkeletonText from "components/skeleton/SkeletonText";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import P from "components/P";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import MobileSearchBar from "components/MobileSearchBar";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Container from "layouts/container/Container";
import DesktopCategory from "../1stFloor/left/category/DesktopCategory";
import Inline from "layouts/container/Inline";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import { deepFind, getGroupedList, getMultipleGroupedList, getSpreadArray, getUniqColumns, rpad } from "shared/utils/Utils";
import { ProductType } from "shared/constants/constants";


function ProductListLayout() {
    const { t } = useTranslation();
   
    const { isMobile } = useContext(BrowserDetectContext);
    const categoryWidth = 200;



    return (
        <Container>
            <Container maxWidth={1400}>
                <div className={style.layout}>
                    {/* {
                        !isMobile &&
                       
                            <CategoryPanel />
                     
                    } */}
                    <div className={style.outlet} style={{ width: isMobile ? null : `calc(100% - ${categoryWidth}px)` }}>
                        <Outlet />
                    </div>
                </div>
            </Container>
        </Container>

    );
}

export default ProductListLayout;

