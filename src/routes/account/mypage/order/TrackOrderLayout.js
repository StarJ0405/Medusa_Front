import { faAngleRight, faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./TrackOrderLayout.module.css"
import { useContext, useEffect, useRef, useState } from "react";
import { requester } from "App";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import Inline from "layouts/container/Inline";
import { CButton, CFormInput, CFormSelect } from "@coreui/react";
import OrderList from "./OrderList";
import clsx from "classnames";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import TestDatePicker from "components/inputs/datePicker/TestDatePicker";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import { useLocation } from "react-router-dom";
import { AuthContext } from "providers/AuthProvider";
import MypageContentHeader from "../header/MypageContentHeader";
import { addCommas } from "shared/utils/Utils";

function OrderListLayout() {
    const [isOrderList, setOrderList] = useState();

    const { t } = useTranslation();
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const { state } = useLocation();
    const dateRef = useRef();

    const onLookUpClick = (start, end) => {
        var dateString = new Date(start);
        var result = dateString.toISOString().split(/[TZ]/g);
        var value = result[0] + ' ' + result[1];
        const data = { createDateTime: value }
        requester.getOrderProductsByDateTime(data, (result) => {
            setOrderList(result.data);
        })

    }

    useEffect(() => {
        if (userName) {
            if (dateRef.current) {
                const isDateTime = dateRef.current.getStartDate();
                var dateString = new Date(isDateTime);
                dateString.setHours(dateString.getHours() - 9);
                console.log(dateString);
                var result = dateString.toISOString().split(/[TZ]/g);
                var value = result[0] + ' ' + result[1];
                console.log(value);
                const data = { createDateTime: value }
                requester.getOrderProductsByDateTime(data, (result) => {
                    setOrderList(result.data);
                })
            }
        } else {
            // NiceModal.show("memberSignIn");
        }

    }, []);

    const OrderInfo = (props) => {

        return (
            <VerticalFlex>
                <FlexChild>
                    <P weight={"bold"} color={props.color ? props.color : "#999"} size={isMobile ? "24pt" : "24pt"}>{props.value}</P>
                </FlexChild>
                <FlexChild>
                    <P weight={"bold"} size={isMobile ? "11pt" : ""}>{props.text}</P>
                </FlexChild>
            </VerticalFlex>
        );
    }
    const formatDate = (dateString) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dayOfWeek = days[date.getDay()];

        return `${year}.${month}.${day}(${dayOfWeek})`;
    }


    return (
        <Container backgroundColor={"white"}>
            <VerticalFlex gap={10}>
                <FlexChild >
                    <VerticalFlex>
                        {/* <FlexChild>
                            <div className={style.wrap}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <P size={"16pt"} weight={"bold"} padding={"5px"}>{t("delivery")}{t("order")}{t("lookUp")}</P>
                                    </FlexChild>

                                </HorizontalFlex>
                            </div>
                        </FlexChild> */}
                        <FlexChild>
                            {
                                isMobile &&
                                <MypageContentHeader />
                            }
                        </FlexChild>
                        <FlexChild>
                            <div className={style.deliveryWrap}>
                                <HorizontalFlex padding={isMobile ? "5px" : "30px"} justifyContent={"space-around"}>
                                    <FlexChild justifyContent={"center"} width={"initial"}>
                                        <OrderInfo color={isOrderList && isOrderList.length > 0 ? "var(--main-color)" : ""} value={userName ? isOrderList ? isOrderList.length : "0" : "-"} text={t("orderComplete")} />
                                    </FlexChild>
                                    <FlexChild justifyContent={"center"} width={"initial"}>
                                        <OrderInfo value={userName ? "0" : "-"} text={t("readyToShip")} />
                                    </FlexChild>
                                    <FlexChild justifyContent={"center"} width={"initial"}>
                                        <OrderInfo value={userName ? "0" : "-"} text={t("shipping")} />
                                    </FlexChild>
                                    <FlexChild justifyContent={"center"} width={"initial"}>
                                        <OrderInfo value={userName ? "0" : "-"} text={t("deliveryComplete")} />
                                    </FlexChild>
                                    <FlexChild justifyContent={"center"} width={"initial"}>
                                        <OrderInfo value={userName ? "0" : "-"} text={t("cancel/dispute")} />
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
                <FlexChild>
                    <DateChoice lookUp={onLookUpClick} value={state} ref={dateRef} />
                </FlexChild>
                <FlexChild>
                    {
                        isMobile
                            ?
                            <VerticalFlex gap={15}>
                                {isOrderList
                                    &&
                                    isOrderList.map((data, index) => {
                                        console.log(data);
                                        const onPurchaseOrderClick = () => {
                                            NiceModal.show("purchaseOrder", { data: data });
                                        }
                                        return (
                                            // <OrderList data={data} key={index} index={index} />
                                            <FlexChild padding={"0px 10px"}>
                                                <div className={style.horizontalCardWrap}>
                                                    <VerticalFlex gap={5}>
                                                        <FlexChild alignItems={"flex-start"}>
                                                            <P weight={"bold"} color={"#999"}>{formatDate(data.createDateTime)}</P>
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <HorizontalFlex gap={15}>
                                                                <FlexChild width={"max-content"}>
                                                                    <img width={"90px"} src={data.orderProducts[0].product.image} />
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <VerticalFlex flexStart gap={5}>
                                                                        <FlexChild>
                                                                            <HorizontalFlex>
                                                                                <FlexChild>
                                                                                    <P weight={"bold"} color={"var(--main-color)"}>{t(data.status)}</P>
                                                                                </FlexChild>
                                                                                {/* <FlexChild justifyContent={"flex-end"}>
                                                                                            <FontAwesomeIcon fontSize={13} icon={faAngleRight} color={"#999"} />
                                                                                        </FlexChild> */}
                                                                            </HorizontalFlex>
                                                                        </FlexChild>
                                                                        <FlexChild>
                                                                            <P>{data.orderProducts[0].product.brandTitle}</P>
                                                                        </FlexChild>
                                                                        <FlexChild>
                                                                            <HorizontalFlex>
                                                                                <FlexChild>
                                                                                    <P>{data.orderProducts[0].product.title} {t("other")} {data.orderProducts.length - 1} {t("cases")}</P>
                                                                                </FlexChild>

                                                                            </HorizontalFlex>
                                                                        </FlexChild>
                                                                        <FlexChild alignItems={"flex-end"} justifyContent={"flex-end"}>
                                                                            <P weight={"bold"} color={"var(--main-color)"}>&#8361;{addCommas(data.amount)}</P>
                                                                        </FlexChild>
                                                                    </VerticalFlex>
                                                                </FlexChild>
                                                            </HorizontalFlex>
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <P cursor onClick={onPurchaseOrderClick} weight={"bold"} color={"#999"}>상세보기</P>
                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </div>
                                            </FlexChild>
                                        );
                                    })
                                }
                            </VerticalFlex>
                            :
                            <VerticalFlex>
                                <FlexChild>
                                    <div className={style.tableHeaderWrap}>
                                        <HorizontalFlex>
                                            <FlexChild width={isMobile ? "100px" : "150px"} justifyContent={"center"}>
                                                <P>{t("orderTime")}</P>
                                            </FlexChild>
                                            <FlexChild justifyContent={"center"}>
                                                <P>{t("product")}</P>
                                            </FlexChild>
                                            <FlexChild justifyContent={"center"}>
                                                <P>{t("address")}</P>
                                            </FlexChild>
                                            <FlexChild width={"100px"} justifyContent={"center"}>
                                                <P>{t("price")}</P>
                                            </FlexChild>
                                            <FlexChild width={"100px"} justifyContent={"center"}>
                                                <P>{t("etc")}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    {isOrderList
                                        &&
                                        isOrderList.map((data, index) => (
                                            <OrderList data={data} key={index} index={index} />
                                        ))
                                    }
                                </FlexChild>
                            </VerticalFlex>
                    }
                </FlexChild>
            </VerticalFlex>
        </Container>
    );
}

export default OrderListLayout;