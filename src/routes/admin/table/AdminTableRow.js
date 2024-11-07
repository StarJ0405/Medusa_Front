import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import style from "./AdminTableRow.module.css"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requester } from "App";
import NiceModal from "@ebay/nice-modal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import VerticalFlex from "layouts/flex/VerticalFlex";
import memoIcon from "resources/img/memoIcon.png";
import P from "components/P";
import clsx from "classnames";
import CustomButton from "components/buttons/CustomButton";
import Center from "layouts/wrapper/Center";
import { ToastContainer, toast } from "react-toastify";



const AdminTableRow = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { data } = props;
    const { t } = useTranslation();
    const [isChecked, setChecked] = useState(false);
    const [checkedData, setCheckedData] = useState();
    const [status, setStatus] = useState();
    const [updateData, setUpdateData] = useState();
    const [purchaseOrderList, setPurchaseOrderList] = useState();
    const [productOption, setProductOption] = useState({
        ...data,
        increaseOrDecreaseInAmount: '',
        instock: '',
        safetyInstock: '',
        outOfStockYn: ''
    });
    const input = useRef();
    const optionsInput = useRef([]);



    useEffect(() => {
        console.log(data);
        setPurchaseOrderList(data);
        switch (data.status) {
            case "WaitingForPayment":
                setStatus("결제대기");
                break;
            case "PreparingShipment":
                setStatus("상품준비");
                break;
            case "PreparingShipment":
                setStatus("배송준비");
                break;
            case "ReadyForShipment":
                setStatus("배송준비완료");
                break;
            case "Shipping":
                setStatus("배송중");
                break;
            case "DeliveryCompleted":
                setStatus("배송완료");
                break;
            case "Canceled":
                setStatus("취소");
                break;
            case "exchange":
                setStatus("교환");
                break;
            case "return":
                setStatus("반품");
                break;
            case "refund":
                setStatus("환불");
                break;
            case "inProgress":
                setStatus("처리중");
                break;
            case "deliveryDelay":
                setStatus("배송지연");
                break;
            case "returnDelay":
                setStatus("반품지연");
                break;
            case "exchangeDelay":
                setStatus("교환지연");
                break;
            case "delayedResponse":
                setStatus("답변지연");
                break;
            // default:
            //     setStatus("입금대기");
            //     break;
        }
    }, [data])





    const callback = (index, state) => {
        if (props.callback) {
            props.callback(index, state, updateData);
            console.log(index, state, productOption);
        }
    }

    useEffect(() => {
        if (props.data) {
            setCheckedData(props.data)
        }


        // console.log("props.data:", props.data);
        // console.log("props.data.outOfStockYn:", props.data ? props.data.outOfStockYn : "props.data is undefined");
    }, [props.data]);


    useEffect(() => {
        // console.log(checkedData);

        if (checkedData) {

        }

    }, [checkedData]);



    useEffect(() => {
        if (props.checkedIndex && props.checkedIndex.includes(props.index)) {
            input.current.setChecked(true);
        } else {
            input.current.setChecked(false);
        }
    }, [props.checkedIndex]);

    useImperativeHandle(ref, () => ({
        isChecked() {
            return isChecked;
        },
        setChecked(value) {
            input.current.setChecked(value);
        },
        isCheckedVaild() {
            return input.current.isChecked();
        },
        getValue: () => ({
            ...data,
            optionType: props.optionType,
            optionName: props.optionName,
            increaseOrDecreaseInAmount: optionsInput.current[0].getValue(),
            instock: optionsInput.current[1].getValue(),
            safetyInstock: optionsInput.current[2].getValue(),
            outOfStockYn: soldout,

        })
    }));

    const [soldout, setSoldout] = useState(props.data?.outOfStockYn ?? false);
    const onChange = (e) => {
        if (!props.readOnly) {
            setSoldout(e.target.checked);
        }
    };

    const cardBtnStyle = {
        backgroundColor: data.paymentType && data.paymentType === "credit" ? "var(--admin-main-color)" : "#aaa",
        fontSize: "12px",
        padding: "3px 15px",
        width: "90%",
        border: "1px solid #ddd"
    }
    const pointBtnStyle = {
        backgroundColor: data.paymentType && data.paymentType === "point" ? "#e84518" : "#aaa",
        fontSize: "12px",
        padding: "3px 15px",
        width: "90%",
        border: "1px solid #ddd"
    }
    const cancelBtn = {
        backgroundColor: "red",
        fontSize: "12px",
        padding: "3px 15px",
        width: "60px",
        border: "1px solid #ddd"
    }
    const modifyBtn = {
        backgroundColor: "var(--main-color)",
        fontSize: "12px",
        padding: "3px 15px",
        width: "60px",
        border: "1px solid #ddd"
    }
    const returnCancelBtn = {
        backgroundColor: "#999",
        fontSize: "12px",
        padding: "3px 10px",
        width: "60px",
        border: "1px solid #ddd"
    }

    const onReturnCancelClick = () => {
        console.log("되돌리기")
        NiceModal.show("returnCancelConfirm", {
            message: t("주문서를 어떤 상태로 되돌리시겠습니까 ? "),
            confirmText: t("confirm"),
            cancelText: t("cancel"),
            onConfirm: onReturConfirm,
            onCancel: onCancel
        });
    }
    const onReturConfirm = (value) => {
        console.log("선택한 값은")
        console.log(value);
        let reqData = { id: data.id, status: value }
        requester.returnCancelPurchaseOrder(reqData, (result => {
            console.log(result.data)
            if (result.code === 0) {
                toast.success(t("취소를 철회하였습니다"), {
                    autoClose: 1000
                });
            }
            if (props.cancelCallback) {
                props.cancelCallback(result.data);
            }

        }))

    }
    const onCancelClick = () => {

        NiceModal.show("confirm", {
            message: t("confirmCancel"),
            confirmText: t("confirm"),
            cancelText: t("cancel"),
            onConfirm: onConfirm,
            onCancel: onCancel
        });



    }
    const onConfirm = () => {
        let reqData = { id: data.id }
        requester.cancelPurchaseOrder(reqData, (result => {
            console.log(result.data)
            if (result.code === 0) {
                toast.success(t("취소완료"), {
                    autoClose: 1000
                });
            }
            if (props.cancelCallback) {
                props.cancelCallback(result.data);
            }

        }))
    }

    const onCancel = () => {

    }
    const onModifyClick = () => {
        console.log("수정");
        console.log(props.purchaseOrderId);
        NiceModal.show("adminPurchaseOrder", { data: purchaseOrderList, onClose: onCloseModifyModal });

    }

    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseOver = () => {
        setShowTooltip(true);
    };

    const handleMouseOut = () => {
        setShowTooltip(false);
    };
    const onMemoIconClick = () => {
        console.log("sdf");
        NiceModal.show("memo", { content: data && data.content });
    }

    const onCloseModifyModal = (value) => {
        console.log("콜백")
        console.log(value);
        props.onChange && props.onChange(value);
    }


    return (
        <div className={style.productWrap}>
            <HorizontalFlex gap={30}>
                <FlexChild width={30} >
                    <div className={style.checkboxArea}>
                        <CheckCircle ref={input} callback={callback} index={props.index} label={props.label} checkedData={checkedData} />
                    </div>
                </FlexChild>
                <FlexChild width={150}>
                    <VerticalFlex flexStart>
                        <FlexChild>
                            <P> {data && data.createDateTime}</P>
                        </FlexChild>
                        <FlexChild>
                            <P>{"("}{data && data.paymentDate}{")"}</P>
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
                <FlexChild width={120}>
                    {/* 증감액 */}
                    <P>{data && data.id}</P>
                </FlexChild>
                <FlexChild width={100}>
                    {/* 재고수량 */}
                    <P>{data && data.userName}</P>
                </FlexChild>
                <FlexChild justifyContent={"center"}>
                    <HorizontalFlex gap={15}>
                        <FlexChild width={"max-content"}>
                            <img src={data && data.image} width={"50px"} />
                        </FlexChild>
                        <FlexChild>
                            <VerticalFlex flexStart>
                                {/* <FlexChild>
                                    <P color={"var(--admin-text-color)"}>입호흡 액상 모음</P>
                                </FlexChild> */}
                                <FlexChild>
                                    <P color={"var(--admin-main-color)"}>{data && data.brandName}{data && data.productName}x 2</P>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild width={80}>
                    <Center>
                        <P>{data && data.amount}</P>
                    </Center>
                </FlexChild>
                <FlexChild width={100}>
                    <VerticalFlex>
                        <FlexChild>
                            <CustomButton text={"신용카드"} style={cardBtnStyle} />
                        </FlexChild>
                        <FlexChild>
                            <CustomButton text={"적립금"} style={pointBtnStyle} />
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
                <FlexChild width={100}>
                    <Center>
                        <P>{status && status}</P>
                    </Center>
                </FlexChild>
                <FlexChild width={120}>
                    <P>{data && data.transportNumber}</P>
                </FlexChild>
                <FlexChild width={70}>
                    {/* <div onClick={onMemoIconClick}>
                        <img src={memoIcon} title={data && data.memo ? data.memo : ""} className={clsx(data && data.memo ? style.memoIcon : null)} />
                    </div> */}
                    {
                        purchaseOrderList &&
                            purchaseOrderList.status !== "Canceled"
                            ?
                            <VerticalFlex>
                                <FlexChild>
                                    <CustomButton text={"수정"} style={modifyBtn} onClick={onModifyClick} />
                                </FlexChild>
                                <FlexChild>
                                    <CustomButton text={"취소"} style={cancelBtn} onClick={onCancelClick} />
                                </FlexChild>

                            </VerticalFlex>
                            :
                            <VerticalFlex>
                                <FlexChild>
                                    <CustomButton text={"수정"} style={modifyBtn} onClick={onModifyClick} />
                                </FlexChild>
                                <FlexChild>
                                    <CustomButton text={"취소됨"} style={returnCancelBtn} onClick={onReturnCancelClick} />
                                </FlexChild>
                            </VerticalFlex>

                    }

                </FlexChild>

            </HorizontalFlex>
            

        </div>
    );
});

export default AdminTableRow;

