import { requester } from "App";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate, useOutletContext } from "react-router-dom";
import WishCardListRow from "./WishCardListRow";
import NiceModal from "@ebay/nice-modal-react";

function WishCardList(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    
    const { products } = useSelector((state) => ({
        products: state.wish.products,
    }));

    useEffect(() => {
        // window.scrollTo(0, 0);
    },[])

    return (
        <VerticalFlex>
            {products
                &&
                products.map((data, index) => {
                    if(data.wishYn){
                        return (<WishCardListRow data={data} index={index} key={index} />);
                    }
                })
            }
        </VerticalFlex>
    );
}

export default WishCardList;