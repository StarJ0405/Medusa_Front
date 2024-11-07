
import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./ShippingInfoDetailModal.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { getCurrentLanguageCode } from "shared/utils/Utils";







const ShippingInfoDetailModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, true];
        const [width, height] = ["min(95%, 500px)", "initial"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const title = "상세보기";
        const buttonText = t("close");
        const inputsSignIn = useRef([]);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { isMobile } = useContext(BrowserDetectContext);

        const [data, setData] = useState();

        const { shippingInfo, status, amount } = props;

        useEffect(() => {
            setData(shippingInfo);
        }, [shippingInfo])

        useEffect(() => {
            console.log(data);
            console.log(status);
        }, [data])


        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} overflow={"visible"}>
                <div className={style.wrap}>
                    <VerticalFlex gap={15}>
                        {
                            status &&
                            <FlexChild>
                                <VerticalFlex gap={10}>
                                    <FlexChild justifyContent={"center"}>
                                        <P weight={"bold"}>배송상태</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <P>{status}</P>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        }
                        <FlexChild>
                            <HorizontalFlex>
                                <FlexChild justifyContent={"center"}>
                                    <P weight={"bold"}>상품명</P>
                                </FlexChild>
                                <FlexChild justifyContent={"center"}>
                                    <P weight={"bold"}>수량</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        {
                            data &&
                            data.map((row, index) => {

                                return (
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild justifyContent={"center"}>
                                                <P>{row.product.brandTitle} {row.product.title}</P>
                                            </FlexChild>
                                            <FlexChild justifyContent={"center"}>
                                                <P>{row.quantity}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                );
                            })
                        }
                        {
                            amount &&
                            <FlexChild>
                                <VerticalFlex>
                                    <FlexChild>
                                        <P weight={"bold"}>결제금액</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <P>{amount}</P>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        }

                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default ShippingInfoDetailModal;