import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import ModalBase from "modals/base/ModalBase";
import FlexChild from "layouts/flex/FlexChild";
import style from "./LoginHistoryModal.module.css"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Dummy from "components/Dummy";
import Center from "layouts/wrapper/Center";
import { CButton } from "@coreui/react";




const LoginHistoryModal = NiceModal.create(
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

        const VerticalLine = () => {
            return (
                <div className={style.verticalLine}></div>
            );
        }
        const HorizontalLine = () => {
            return (
                <div className={style.horizontalLine}></div>
            )
        }
        const close = () => {
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
                    <VerticalFlex gap={40}>
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild padding={"5px 20px"} height={"44px"}>
                                            <Center width={"100%"} textAlign={"left"}>
                                                <P color={"var(--font-color)"} weight={"bold"} size={"var(--font-size-lg)"}>로그인 이력</P>
                                            </Center>
                                        </FlexChild>
                                        <FlexChild>
                                            <HorizontalLine />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild height={"50px"} padding={"15px 20px"}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P color={"var(--font-color)"} size={"var(--font-size)"}>2022/12/05 {"(월)"} 12:21</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalLine />
                                </FlexChild>
                                <FlexChild height={"50px"}>
                                    <HorizontalFlex padding={"0 20px"}>
                                        <FlexChild width={"100px"}>
                                            <P color={"var(--font-color)"} size={"var(--font-size)"}>2022/12/05</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"center"}>
                                            <P color={"var(--font-color)"} size={"var(--font-size)"}>123.123.123.111</P>
                                        </FlexChild>
                                        <FlexChild width={"70px"} justifyContent={"center"}>
                                            <P color={"var(--font-color)"} size={"var(--font-size)"}>대한민국</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                    <FlexChild>
                                        <HorizontalLine />
                                    </FlexChild>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild justifyContent={"flex-end"}>
                            <CButton style={modifyBtnStyle} shape="rounded-0" onClick={close} >확인</CButton>
                        </FlexChild>
                    </VerticalFlex>

                </div>
            </ModalBase>
        );
    }
);

export default LoginHistoryModal;