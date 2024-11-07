
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import { requester } from "App";
import ModalBase from "modals/base/ModalBase";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import style from "./NextVerificationModal.module.css"
import qrcode from "resources/img/chat_qr.png"
import { BrowserDetectContext } from "providers/BrowserEventProvider";




const NextVerificationModal = NiceModal.create(
    (props, ref) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const modal = useRef();
        const [withHeader, withFooter] = [false,
            false];
        const [width, height] = [isMobile ? "90%" : "50%", isMobile ? "50%" : "70%"];
        const withCloseButton = false;
        const clickOutsideToClose = true;
        const title = "";
        const buttonText = "close";
        const { t } = useTranslation();

        return (
            <ModalBase borderRadius={"25px"} ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <VerticalFlex gap={40}>
                    <FlexChild padding={"10px 0 0 10px"}>
                        <Center width={"100%"} textAlign={"left"}>
                            <P size={"16pt"} weight={"bold"} padding={"5px"}>본인인증</P>
                        </Center>
                        <div className={style.horizontalLine}></div>
                    </FlexChild>
                    <FlexChild>
                        <img src={qrcode} width={"40%"}/>
                    </FlexChild>
                    <FlexChild>
                        <P weight={"bold"} size={"var(--font-size)"}>휴대폰에서 인증 확인버튼을 눌러주세요</P>
                    </FlexChild>
                </VerticalFlex>
            </ModalBase>
        );
    }
);

export default NextVerificationModal;