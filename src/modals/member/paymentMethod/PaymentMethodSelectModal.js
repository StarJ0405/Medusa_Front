import { useEffect, useState, useRef, useContext } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import ModalBase from "modals/base/ModalBase";
import style from "./PaymentMethodSelectModal.module.css"
import Radio from "components/inputs/radio/Radio";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import FixedFooter from "layouts/container/FixedFooter";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import Dummy from "components/Dummy";
import visacard from "resources/img/paymentMethod/visa_logo.png";
import mastercard from "resources/img/paymentMethod/mastercard_logo.png";
import alipay from "resources/img/paymentMethod/alipay_logo.jpg";
import wechatpay from "resources/img/paymentMethod/wechatpay_logo.png";
import unionpay from "resources/img/paymentMethod/unionpay_logo.png";
import paypal from "resources/img/paymentMethod/paypal_logo.png";
import creditCard from "resources/img/icons/creditCard.png"
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";

const PaymentMethodSelectModal = NiceModal.create(
    (props) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(100%, 500px)", isMobile ? "60%" : "min(100%, 600px)"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = t("selectPaymentMethod");
        const buttonText = t("close");
        const modal = useRef();
        const paymentMethods = [
            { id: 1, title: "가상계좌", icon: "" },
            // { id: 1, title: t("bankBook"), icon: paypal },
            // { id: 2, title: t("card"), icon: "" },
            // { id: 3, title: "Alipay", icon: alipay },
            // { id: 4, title: "Wechatpay", icon: wechatpay },
            // { id: 5, title: "Unionpay", icon: unionpay },
            // { id: 6, title: "Paypal", icon: paypal }
        ];
        const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState();

        useEffect(() => {
            setSelectedPaymentMethodId(props.initialId);
        }, []);

        const onPaymentMethodClick = (paymentMethod) => {
            setSelectedPaymentMethodId(paymentMethod.id);
        }

        useEffect(() => {
            if (selectedPaymentMethodId) {
                if (props.onSelect) {
                    let selectedPaymentMethod;
                    paymentMethods.map((paymentMethod, index) => {
                        if (paymentMethod.id === selectedPaymentMethodId) {
                            selectedPaymentMethod = paymentMethod;
                        }
                    });
                    props.onSelect(selectedPaymentMethod);
                }
            }
        }, [selectedPaymentMethodId]);

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} borderRadius={10}>
                <div className={style.wrap}>
                    <VerticalFlex gap={5}>
                        {
                            paymentMethods.map((paymentMethod, index) =>
                                <FlexChild height={"initial"} key={index}>
                                    <div className={style.paymentMethodCard} onClick={() => onPaymentMethodClick(paymentMethod)}>
                                        <HorizontalFlex>
                                            {paymentMethod.icon == null
                                                ?
                                                <FlexChild width={50} padding={"0 0 0 20px"} />
                                                :
                                                <FlexChild width={50} padding={"0 0 0 20px"}>
                                                    <Radio name={"name"} value={paymentMethod.id} selectedValue={selectedPaymentMethodId} />
                                                </FlexChild>
                                            }
                                            <FlexChild width={"initial"}>
                                                <PaddingWrapper padding={5}>
                                                    <img className={style.icon} src={paymentMethod.icon} />
                                                </PaddingWrapper>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>{paymentMethod.title}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                            )
                        }
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default PaymentMethodSelectModal;