import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import { requester } from "App";
import ModalBase from "modals/base/ModalBase";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import style from "./AccountVerificationModal.module.css"
import verification from "resources/img/icons/mypage/verification.svg"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { CButton } from "@coreui/react";




const AccountVerificationModal = NiceModal.create(
    (props, ref) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const modal = useRef();
        const [withHeader, withFooter] = [false,
            false];
        const [width, height] = [isMobile ? "90%" : "40%", isMobile ? "60vh" : "50%"];
        const withCloseButton = false;
        const clickOutsideToClose = true;
        const title = "문의 사항";
        const { id } = props;
        const buttonText = "close";
        const { t } = useTranslation();


        const onPhoneVerificationClick = () => {
            modal.current.close();

            NiceModal.show("nextVerification");
        }

        const btnStyle = {
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "134px",
            borderRadius: "0",
            backgroundColor: "var(--main-color)",
            border: "none",
        }

        return (
            <ModalBase borderRadius={"25px"} ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <div className={style.wrap}>
                    <VerticalFlex padding={"0 20px"} gap={40}>
                        <FlexChild>
                            <Center width={"100%"} textAlign={"left"}>
                                <P size={"16pt"} weight={"bold"} padding={"5px"}>본인인증</P>
                            </Center>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                        <FlexChild>
                            <img src={verification} width={isMobile ?"35%" : "15%"} />
                        </FlexChild>
                        <FlexChild>
                            <VerticalFlex gap={15}>
                                <FlexChild>
                                    <CButton onClick={onPhoneVerificationClick} style={btnStyle}>휴대전화 인증</CButton>
                                </FlexChild>
                                <FlexChild>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P weight={"bold"} size={"10pt"}>본인인증 시 제공되는 정보는 해당 인증기관에서 직접 수집하며,<br />인증 이외의 용도로 이용 또는 저장하지 않습니다.</P>

                                    </Center>
                                </FlexChild>
                            </VerticalFlex>

                            {/* <P cursor onClick={onPhoneVerificationClick} padding={"15px 40px"} backgroundColor={"var(--main-color)"} size={"20pt"} color={"white"}>휴대전화 인증</P> */}
                        </FlexChild>

                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default AccountVerificationModal;