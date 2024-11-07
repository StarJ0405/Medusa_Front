
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import { requester } from "App";
import ModalBase from "modals/base/ModalBase";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import style from "./AccountDisabledModal.module.css"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useNavigate } from "react-router-dom";
import { CButton } from "@coreui/react";




const AccountDisabledModal = NiceModal.create(
    (props, ref) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const modal = useRef();
        const [withHeader, withFooter] = [false,
            false];
        const [width, height] = [isMobile ? "90%" : "40%", isMobile ? "60vh" : "50%"];
        const withCloseButton = false;
        const clickOutsideToClose = true;
        const title = "문의 사항";
        const buttonText = "close";
        const { t } = useTranslation();
        const navigate = useNavigate();
        const onClick = () => {
            navigate("/", { replace: true })
            modal.current.close();
        }

        const modifyBtnStyle = {
            backgroundColor: "var(--main-color)",
            borderRadius: "0",
            border: "none",
            padding: "0",
            height: "30px",
            width: "80px",
            fontSize: "var(--font-size-lg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
        }

        return (
            <ModalBase borderRadius={"25px"} ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <div className={style.wrap}>
                    <VerticalFlex gap={70}>
                        <FlexChild>
                            <VerticalFlex gap={15}>
                                <FlexChild>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P size={"var(--font-size-lg)"} weight={"bold"} padding={"8px 20px"}>계정 비활성화</P>
                                    </Center>
                                    <div className={style.horizontalLine}></div>
                                </FlexChild>
                                <FlexChild padding={"0 20px"}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P weight={"bold"}>그동안 월드인터네셔널을 이용해주셔서 감사합니다.</P>
                                        <P weight={"bold"}>계정 비활성화가 완료되었습니다.</P>
                                    </Center>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>

                        <FlexChild justifyContent={"flex-end"}>
                            <CButton style={modifyBtnStyle} shape="rounded-0" onClick={onClick} >홈으로</CButton>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default AccountDisabledModal;
