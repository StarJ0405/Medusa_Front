import { faArrowLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FixedHeader from "layouts/container/FIxedHeader";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./MobilePurchaseOrderList.module.css"
import PurchaseOrderListRow from "./MobilePurchaseOrderListRow";

function PurchaseOrderList() {

    const location = useLocation();
    const data = location.state.list;


    const onClickBack = () => {
        window.history.back();
    }

    return (
        <>
            <FlexChild>
                <FixedHeader height={40}>
                    <div className={style.accountArea}>
                        <HorizontalFlex>
                            <FlexChild>
                                <p onClick={onClickBack}><FontAwesomeIcon icon={faArrowLeft} />&nbsp;&nbsp;</p>
                                <p>주문 상세</p>
                            </FlexChild>
                            <FlexChild justifyContent={"flex-end"}>
                                <Link to="/setting" style={{
                                    color: "white",
                                }}>
                                    <p className={style.setting}><FontAwesomeIcon icon={faGear} /></p>
                                </Link>
                            </FlexChild>


                        </HorizontalFlex>

                    </div>
                </FixedHeader>
            </FlexChild>
            <FlexChild>
                <div className={style.container}>
                    <HorizontalFlex>
                        <FlexChild justifyContent={"center"}>
                            <p>이미지</p>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                            <p>상품명</p>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                            <p>가격</p>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                            <p>수량</p>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                            <p>처리여부</p>
                        </FlexChild>
                    </HorizontalFlex>

                </div>
            </FlexChild>
            <FlexChild>
                {data ? data.map((row, index) => (
                    <PurchaseOrderListRow row={row} key={index} />
                )) : null}
            </FlexChild>
        </>
    );
}

export default PurchaseOrderList;