import { CButton, CFormSelect } from "@coreui/react";
import P from "components/P";
import { t } from "i18next";
import Flex from "layouts/flex/Flex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useContext, useEffect, useRef, useState } from "react";
import style from "./OrderListRow.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { addCommas, getCurrentLanguageCode } from "shared/utils/Utils";
import InputNumber from "components/inputs/InputNumber";
import CustomButton from "components/buttons/CustomButton";
import { requester } from "App";
import { ToastContainer, toast } from "react-toastify";


function AdminOrderListRow(props) {
    const { data, status, purchaseOrderId, addList } = props;
    const { isMobile } = useContext(BrowserDetectContext);
    const onTrackOrderClick = () => {
        NiceModal.show("trackOrder", { id: data.product.id });
    }
    const numberInput = useRef();
    const [statusData, setStatusData] = useState();
    const [list, setList] = useState();
    useEffect(() => {
        setList(data);
    }, [data])

    useEffect(() => {
        // switch (status) {
        //     case "WaitingForPayment":
        //         setStatusData("결제대기");
        //         break;
        //     case "PreparingShipment":
        //         setStatusData("상품준비");
        //         break;
        //     case "PreparingShipment":
        //         setStatusData("배송준비");
        //         break;
        //     case "ReadyForShipment":
        //         setStatusData("배송준비완료");
        //         break;
        //     case "Shipping":
        //         setStatusData("배송중");
        //         break;
        //     case "DeliveryCompleted":
        //         setStatusData("배송완료");
        //         break;
        //     case "Canceled":
        //         setStatusData("취소");
        //         break;
        //     case "exchange":
        //         setStatusData("교환");
        //         break;
        //     case "return":
        //         setStatusData("반품");
        //         break;
        //     case "refund":
        //         setStatusData("환불");
        //         break;
        //     case "inProgress":
        //         setStatusData("처리중");
        //         break;
        //     case "deliveryDelay":
        //         setStatusData("배송지연");
        //         break;
        //     case "returnDelay":
        //         setStatusData("반품지연");
        //         break;
        //     case "exchangeDelay":
        //         setStatusData("교환지연");
        //         break;
        //     case "delayedResponse":
        //         setStatusData("답변지연");
        //         break;
        //     default:
        //         setStatusData("asd");
        //         break;
        // }

        switch (status) {
            case "WaitingForPayment":
                setStatusData("결제대기");
                break;
            case "PreparingShipment":
                setStatusData("상품준비");
                break;
            case "ReadyForShipment":
                setStatusData("배송준비완료");
                break;
            case "Shipping":
                setStatusData("배송중");
                break;
            case "DeliveryCompleted":
                setStatusData("배송완료");
                break;
            case "Canceled":
                setStatusData("취소");
                break;
            case "CancelRequest":
                setStatusData("취소요청");
                break;
            case "RefundCompleted":
                setStatusData("환불완료");
                break;
            case "ExchangeCompleted":
                setStatusData("교환완료");
                break;
            case "ReturnRequest":
                setStatusData("환불요청");
                break;
            case "ReturnCompleted":
                setStatusData("환불완료");
                break;
            // Add other cases as needed
            default:
                setStatusData("상태 불명");
                break;
        }
    }, [status])

    const onModifyClick = () => {

        let orderProductData =
        {
            purchaseOrderId: purchaseOrderId,
            id: data.id,
            quantity: numberInput.current.getValue()
        };

        requester.updateOrderProduct(orderProductData, ((result) => {
            if (result.code === 401) {
                toast.error(t("ERROR"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
            else if (result.code === 0) {
                toast.success(t("수정되었습니다"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
                if (props.callback) {
                    props.callback(result.data);
                }
            }
            else {
                toast.error(t("ERROR"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        }))
    }

    const onDeleteOrderClick = () => {
        NiceModal.show("confirm", {
            message: t("해당 주문상품을 삭제하시겠습니까 ?"),
            confirmText: t("confirm"),
            cancelText: t("cancel"),
            onConfirm: onConfirm,
            onCancel: onCancel
        });
    }

    const onConfirm = () => {
        requester.deleteOrderProduct(list, (result) => {
            if (result.code === 401) {
                toast.error(t("ERROR"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
            else if (result.code === 0) {
                toast.success(t("수정되었습니다"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
                console.log(result.data);
                console.log(list);
                if (props.callback) {
                    props.callback(result.data);
                }
            }
            else {
                toast.error(t("ERROR"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        })
    }
    const onCancel = () => {

    }

    const modifyBtn = {
        backgroundColor: "var(--main-color)",
        fontSize: "14px",
        padding: "3px 15px",
        width: "80px",
        border: "1px solid #ddd"
    }

    const deleteBtn = {
        backgroundColor: "red",
        fontSize: "14px",
        padding: "3px 15px",
        width: "80px",
        border: "1px solid #ddd",
        fontWeight: "bold"
    }

    return (
        <VerticalFlex>
            <FlexChild>
                <div className={style.wrap}>
                    {
                        isMobile
                            ?
                            <FlexChild>
                                <div className={style.tableHeaderWrap}>
                                    <HorizontalFlex>
                                        <FlexChild height={"120px"} borderRight={"1px solid #999"}>

                                            <HorizontalFlex>
                                                <FlexChild width={"max-content"}>
                                                    <div className={style.imgWrap}>
                                                        <img width={"85%"} src={list && list.product.image} />
                                                    </div>
                                                </FlexChild>
                                                <FlexChild justifyContent={"flex-start"}>
                                                    <VerticalFlex>
                                                        <FlexChild>
                                                            <Center width={"100%"} textAlign={"left"}>
                                                                <P color={"#999"}>{list.product.brandTitle}</P>
                                                                <P>{list && list.product.title}</P>
                                                                <P>{t("quantity")} : {list.quantity}</P>
                                                                <P weight={"bold"} color={"var(--main-color)"}>{addCommas(list && list.amount)}&#8361;</P>
                                                            </Center>
                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild width={"120px"} justifyContent={"center"} height={"120px"} >
                                            <VerticalFlex>
                                                <P weight={"bold"}>{t("shipping")}</P>
                                                {/* <p onClick={onTrackOrderClick} className={style.trackButton}>{t("배송추적")}</p> */}
                                            </VerticalFlex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                            :
                            <FlexChild>
                                <div className={style.tableHeaderWrap}>
                                    <HorizontalFlex>
                                        <FlexChild height={"120px"} width={"130px"} justifyContent={"center"}>
                                            <div className={style.border}>
                                                <Center>
                                                    <P>{props.time}</P>
                                                    {/* <P size={"10pt"} color={"#999"}>{t("상세보기")}</P> */}
                                                </Center>
                                            </div>
                                        </FlexChild>
                                        <FlexChild height={"120px"} borderRight={"1px solid #999"}>
                                            <div className={style.border}>
                                                <HorizontalFlex>
                                                    <FlexChild width={"max-content"}>
                                                        <div className={style.imgWrap}>
                                                            <img width={"85%"} src={list && list.product.image} />
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild justifyContent={"flex-start"}>
                                                        <VerticalFlex>
                                                            <FlexChild>
                                                                <Center width={"100%"} textAlign={"left"}>
                                                                    <P color={"#999"}>{list && list.product.brandTitle}</P>
                                                                    <P>{list && list.product.title}</P>
                                                                </Center>
                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </div>
                                        </FlexChild>
                                        <FlexChild width={"160px"} height={"120px"} justifyContent={"center"} borderRight={"1px solid #999"}>
                                            <div className={style.border}>
                                                <VerticalFlex gap={15}>
                                                    <FlexChild width={"80%"}>
                                                        <InputNumber value={list && list.quantity} ref={numberInput} />
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <CustomButton text={"수정"} style={modifyBtn} onClick={onModifyClick} />
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </div>
                                        </FlexChild>
                                        <FlexChild width={"130px"} justifyContent={"center"} height={"120px"} borderRight={"1px solid #999"}>
                                            <div className={style.border}>
                                                <P weight={"bold"} color={"var(--main-color)"}>{addCommas(list && list.amount)}&#8361;</P>
                                            </div>
                                        </FlexChild>
                                        <FlexChild width={"150px"} justifyContent={"center"} height={"120px"} >
                                            <VerticalFlex>
                                                <FlexChild>
                                                    <div className={style.border}>
                                                        <P weight={"bold"}>{statusData}</P>
                                                    </div>
                                                </FlexChild>
                                                {/* <p onClick={onTrackOrderClick} className={style.trackButton}>{t("배송추적")}</p> */}
                                            </VerticalFlex>
                                        </FlexChild>
                                        <FlexChild width={"100px"} justifyContent={"center"} height={"120px"} >
                                            <div className={style.border}>
                                                <CustomButton text={"삭제"} onClick={onDeleteOrderClick} style={deleteBtn} />
                                            </div>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                    }
                </div>
            </FlexChild>
        </VerticalFlex>
    );
}

export default AdminOrderListRow;