import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import PaginatedTable from "routes/table/PagenationTable";
import ShippingInfoPagenationTable from "routes/table/ShippingInfoPagenationTable";



function ShippingInfo() {
    const { isMobile } = useContext(BrowserDetectContext);
    const navigate = useNavigate();
    const shippingInfoRef = useRef();
    const [purchaseOrder, setPurchaseOrder] = useState();

    useEffect(() => {
        setTimeout(() => {
            requester.getOrderAllProduct((result) => {
                console.log(result.data);
                setPurchaseOrder(result.data);
            })
        }, 1500)

    }, [])

    const columns =
        isMobile
            ?
            [
                "No",
                "주문날짜",
                "상세",
                "비고"
            ] :
            [
                "No",
                "주문날짜",
                "상품",
                "배송상태",
                "결제금액",
                "비고"
            ];


    return (

        <VerticalFlex gap={30}>
            <FlexChild>
                <P size={"18pt"} weight={"bold"}>주문내역</P>
            </FlexChild>
            <FlexChild>
                {
                    purchaseOrder &&
                    <ShippingInfoPagenationTable ref={shippingInfoRef} columns={columns} data={purchaseOrder} />
                }
            </FlexChild>
        </VerticalFlex>

    );
}

export default ShippingInfo;