import { useEffect, useState, useRef } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import { requester } from "App";
import InputText from "components/inputs/InputText";
import Select from 'react-select'
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import ModalBase from "modals/base/ModalBase";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import style from "./ConfirmModal.module.css"
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { CFormSelect } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";

const ReturnCancelConfirmModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [false, false];
        const [width, height] = ["min(80%, 400px)", "250px"];
        const withCloseButton = false;
        const clickOutsideToClose = true;
        const title = "";
        const buttonText = t("close");
        const selectRef = useRef();
        const [status, setStatus] = useState();


        const modal = useRef();

        const onStatusChange = (e) => {
            console.log(e.target.value);
            if (e.target.value) {
                setStatus(e.target.value);
            }

        }

        const onConfirmClick = async () => {
            if (props.onConfirm) {

                let isAsyncFn = props.onConfirm.constructor.name === "AsyncFunction" ? true : false;
                if (isAsyncFn) {
                    await props.onConfirm().then((result) => {
                        modal.current.close();
                    });
                } else {
                    if (status) {
                        props.onConfirm(status);
                        modal.current.close();
                    }else{
                        toast.error(t("주문서의 상태를 선택하세요"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    }

                }
            } else {
                modal.current.close();
            }
        }

        const onCancelClick = () => {
            if (props.onCancel) {
                props.onCancel();
            } else {

            }
            modal.current.close();
        }

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <PaddingWrapper padding={"10px 20px"}>
                    <VerticalFlex gap={10} height={"100%"}>
                        <FlexChild>
                            <Center width={"100%"} textAlign={"left"}>
                                <P size={14}>{props.message}</P>
                            </Center>
                        </FlexChild>
                        <FlexChild>
                            <CFormSelect onChange={onStatusChange}>
                                <option>선택하세요</option>
                                <option value={"WaitingForPayment"}>결제대기</option>
                                <option value={"PreparingShipment"}>상품준비</option>
                                <option value={"ReadyForShipment"}>배송준비완료</option>
                                <option value={"Shipping"}>배송중</option>
                                <option value={"DeliveryCompleted"}>배송완료</option>
                            </CFormSelect>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex>
                                <FlexChild></FlexChild>
                                <FlexChild width={70}>
                                    <div className={style.confirmButton} onClick={onCancelClick}>
                                        <Center><P size={14} color={"var(--main-color)"}>{props.cancelText}</P></Center>
                                    </div>
                                </FlexChild>
                                <FlexChild width={70}>
                                    <div className={style.confirmButton} onClick={onConfirmClick}>
                                        <Center><P size={14} color={"var(--main-color)"}>{props.confirmText}</P></Center>
                                    </div>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
                </PaddingWrapper>
            </ModalBase>
        );
    }
);

export default ReturnCancelConfirmModal;