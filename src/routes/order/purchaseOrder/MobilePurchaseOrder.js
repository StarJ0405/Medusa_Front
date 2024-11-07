import { requester } from "App";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./MobilePurchaseOrder.module.css"

function PurchaseOrder(props) {
    const { data, index } = props;
    const navigate = useNavigate();

    const [products, setProducts] = useState();


    const onClick = () => {
        navigate("purchaseOrder", {
            state: { list: data.orderProducts }
        });
    }

    return (
        <div className={style.container} onClick={onClick}>
            <HorizontalFlex>
                <FlexChild justifyContent={"center"}>
                    <p className={style.row}>{data.createDateTime}</p>
                </FlexChild>
                <FlexChild justifyContent={"center"}>
                    <p className={style.row}>{data.id}</p>
                </FlexChild>
                <FlexChild justifyContent={"flex-end"}>
                    <p className={style.row}>{data.total}</p>
                </FlexChild>
                <FlexChild justifyContent={"flex-end"}>
                    <p className={style.rowQuantity}>{data.quantity}</p>
                </FlexChild>
            </HorizontalFlex>
        </div>
    );
}

export default PurchaseOrder;