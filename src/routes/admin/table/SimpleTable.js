
import style from "./SimpleTable.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import excelIcon from "resources/img/excelIcon.png"
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import Inline from "layouts/container/Inline";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import AdminTableRow from "./AdminTableRow";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requester } from "App";
import NiceModal from "@ebay/nice-modal-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import memoIcon from "resources/img/memoIcon.png";
import clsx from "classnames";
import ExcelDownloadButton from "./ExcelDownloadButton";
import { toast } from "react-toastify";
import ExcelUploadButton from "./ExcelUploadButton";

function SimpleTable(props) {
    const { theader, data, fileName, justifyContent, type } = props;
    const { isMobile } = useContext(BrowserDetectContext);
    const [tableList, setTableList] = useState();

    useEffect(() => {
        setTableList(data)
    }, [data])

    const onCheckGroupCallback = (checkedIndex, value) => {
        let selectedRows = [];

        checkedIndex && checkedIndex.map((selectedIndex, index) => {
            selectedRows.push(data[selectedIndex]);
        });

        props.callback && props.callback(selectedRows);
    }
    const checkBoxStyle = {
    }
    const callback = (value) => {
        console.log(value);
        if (props.cancelCallback) {
            props.cancelCallback(value);
        }
    }
    const onChange = (value) => {
        if (value) {
            const index = tableList.findIndex(item => item.id === value.id);

            if (index !== -1) {
                const updatedData = [...data];
                updatedData[index] = value;
                console.log(updatedData);
                setTableList(updatedData);
            }
        }

    }


    return (
        <div>
            {
                data && theader &&
                <VerticalFlex>
                    <FlexChild padding={20}>
                        <HorizontalFlex gap={20}>
                            <FlexChild width={"max-content"}>
                                <Center width={"100%"} textAlign={"left"}>
                                    <Inline>
                                        <P>검색결과 : </P>
                                        <P weight={"bold"} color={"var(--admin-main-color)"}>{data.length}</P>
                                        <P>건</P>
                                    </Inline>
                                </Center>
                            </FlexChild>
                            {
                                props.upload
                                    ?
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"}>
                                                <P>재고 일괄수정 : </P>
                                            </FlexChild>
                                            <FlexChild>


                                                <ExcelUploadButton />



                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    :
                                    null
                            }
                            <FlexChild justifyContent={"flex-end"}>
                                <ExcelDownloadButton header={theader} list={data} fileName={fileName} />
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild padding={20}>
                        <CheckCircleGroup style={checkBoxStyle} gap={10} callback={onCheckGroupCallback} padding={10} backgroundColor={"#f5f6fb"} labelWidth={30} borderTop={"1px solid #ddd"} borderBottom={"1px solid #ddd"}
                            headerGap={30} header={!isMobile && theader} justifyContent={justifyContent}>
                            {
                                tableList && tableList.length > 0 &&
                                tableList.map((row, index) => {
                                    return (<SimpleTableRow vendor={props.vendor} productStatus={props.productStatus} onChange={onChange} cancelCallback={callback} header={theader} data={row} key={index} index={index} justifyContent={justifyContent} type={type} />);
                                })
                            }
                        </CheckCircleGroup>
                    </FlexChild>
                </VerticalFlex>
            }
        </div>
    );
}


const SimpleTableRow = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { data, header, type } = props;
    const { t } = useTranslation();
    const [isChecked, setChecked] = useState(false);
    const [checkedData, setCheckedData] = useState();
    const input = useRef();
    const optionsInput = useRef([]);
    const [cols, setCols] = useState();

    const checkboxCallback = (index, state) => {
        if (props.callback) {
            props.callback(index, state);
        }
    }

    useEffect(() => {
        if (data) {

            setCheckedData(data)
        }
    }, [data]);

    useEffect(() => {
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
        }
    }));


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
                console.log("콜백시작");
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
        NiceModal.show("adminPurchaseOrder", { data: data, onClose: onCloseModifyModal });

    }

    const onCloseModifyModal = (value) => {
        console.log("콜백")
        console.log(value);
        props.onChange && props.onChange(value);
    }
    const onTableRowClick = () => {
        NiceModal.show("productStatus", { data: data });
    }


    return (
        <div className={style.productWrap} >
            <HorizontalFlex gap={30} justifyContent={props.justifyContent}>
                <FlexChild width={30} >
                    <div className={style.checkboxArea}>
                        <CheckCircle ref={input} callback={checkboxCallback} index={props.index} label={props.label} checkedData={checkedData} />
                    </div>
                </FlexChild>
                {/* {
                    header && header.map((col, index) => {
                        console.log(col.code)
                        // console.log(data[col.code])
                        console.log(data);
                        return (
                            <FlexChild key={index} width={col.width}>
                                <P>{data[col.code]}</P>
                            </FlexChild>
                        );
                    }
                    )
                } */}
                {
                    header && header.map((col, index) => {
                        const cellData = data[col.code];
                        let displayValue = '';


                        // Check if we're in the '상품명' column and handle accordingly
                        if (col.text === '상품명' && Array.isArray(cellData)) {
                            displayValue = cellData.map(item => `${item.product.brand.title} ${item.product.title}`).join('\n');
                        }
                        else if (col.text === '상태' && cellData !== null) {
                            // Convert status code to human-readable text
                            switch (cellData) {
                                case "WaitingForPayment":
                                    displayValue = "결제대기";
                                    break;
                                case "PreparingShipment":
                                    displayValue = "상품준비";
                                    break;
                                case "ReadyForShipment":
                                    displayValue = "배송준비완료";
                                    break;
                                case "Shipping":
                                    displayValue = "배송중";
                                    break;
                                case "DeliveryCompleted":
                                    displayValue = "배송완료";
                                    break;
                                case "Canceled":
                                    displayValue = "취소";
                                    break;
                                case "CancelRequest":
                                    displayValue = "취소요청";
                                    break;
                                case "RefundCompleted":
                                    displayValue = "환불완료";
                                    break;
                                case "ExchangeCompleted":
                                    displayValue = "교환완료";
                                    break;
                                case "ReturnRequest":
                                    displayValue = "환불요청";
                                    break;
                                case "ReturnCompleted":
                                    displayValue = "환불완료";
                                    break;
                                // Add other cases as needed
                                default:
                                    displayValue = "상태 불명";
                                    break;
                            }
                        }
                        // Check if we're in the '수량' column and handle accordingly
                        else if (col.text === '수량' && Array.isArray(cellData)) {
                            displayValue = cellData.map(item => `${item.quantity}`).join('\n');

                        }
                        else if (typeof cellData === 'number' || typeof cellData === 'string') {
                            displayValue = cellData;

                        }
                        else if (cellData !== null && typeof cellData === 'object') {
                            displayValue = JSON.stringify(cellData);
                        } else if (cellData !== null && col.text === '기타') {
                            return (
                                <FlexChild width={70}>
                                    {
                                        data.status &&
                                            data.status !== "Canceled"
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
                            )
                                ;
                        }
                        else {
                            displayValue = '데이터 없음';
                        }

                        return (
                            <FlexChild key={index} width={col.width}>
                                <P onClick={props.productStatus ? onTableRowClick : props.vendor ? null : onModifyClick} hover cursor>{displayValue}</P>
                            </FlexChild>
                        );
                    })
                }

            </HorizontalFlex>
        </div>
    );
});

export default SimpleTable;