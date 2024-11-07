import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import ModalBase from "modals/base/ModalBase";
import FlexChild from "layouts/flex/FlexChild";
import style from "./AddressModal.module.css"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Dummy from "components/Dummy";
import Center from "layouts/wrapper/Center";




const AddressCityModal = NiceModal.create(
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
        const arr = ["", "", "", "", "", "", "", "", "", "", "", ""];

        const onClick = () => {
            modal.current.close();
            NiceModal.show("address")
        }


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

        const Circle = () => {
            return (
                <div className={style.circle}></div>
            );
        }
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
        const CityList = (props) => {
            return (
                <HorizontalFlex gap={15}>
                    {
                        props.alphabet &&
                        <FlexChild width={"initial"}>
                            <P>{props.alphabet}</P>
                        </FlexChild>
                    }
                    <FlexChild padding={props.alphabet ? "" : "0 0 0 25px"}>
                        <P>중국 시</P>
                    </FlexChild>
                </HorizontalFlex>
            );
        }

        return (
            <ModalBase borderRadius={"25px"} ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <div className={style.wrap}>
                    <VerticalFlex gap={15}>
                        <FlexChild padding={"15px 20px 0 20px"}>
                            <P weight={"bold"} size={"var(--font-size-lg)"}>주소를 선택해주세요.</P>
                        </FlexChild>
                        <FlexChild padding={"0 20px"}>
                            <HorizontalFlex>
                                <FlexChild width={"initial"}>
                                    <VerticalFlex>
                                        <FlexChild >
                                            <Circle />
                                        </FlexChild>
                                        <FlexChild height={40}>
                                            <VerticalLine />
                                        </FlexChild>
                                        <FlexChild >
                                            <Circle />
                                        </FlexChild>
                                        <FlexChild height={40}>
                                            <VerticalLine />
                                        </FlexChild>
                                        <FlexChild >
                                            <Circle />
                                        </FlexChild>
                                        <FlexChild height={40}>
                                            <VerticalLine />
                                        </FlexChild>
                                        <FlexChild >
                                            <Circle />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild padding={"0 0 0 15px"}>
                                    <VerticalFlex flexStart>
                                        <FlexChild >
                                            <P onClick={onClick} color={"var(--font-faint-color)"} size={"var(--font-size)"}>중국 성</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <Dummy height={30} />
                                        </FlexChild>
                                        <FlexChild>
                                            <P color={"var(--main-color)"} size={"var(--font-size)"}>중국 시</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <Dummy height={30} />
                                        </FlexChild>
                                        <FlexChild>
                                            <P color={"var(--font-faint-color)"} size={"var(--font-size)"}>중국 구</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <Dummy height={28} />
                                        </FlexChild>
                                        <FlexChild>
                                            <P color={"var(--font-faint-color)"} size={"var(--font-size)"}>중국 로</P>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild >
                            <HorizontalLine />
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                            <P weight={"bold"} size={"var(--font-size-lg)"}>중국 성</P>
                        </FlexChild>
                        <FlexChild padding={"0 0 0 20px"}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P size={"var(--font-size)"}>중국 시</P>
                            </Center>
                        </FlexChild>
                        <FlexChild padding={"0 0 0 20px"}>
                            <VerticalFlex gap={15}>
                                <FlexChild>
                                    <CityList alphabet={"A"} />
                                </FlexChild>
                                <FlexChild>
                                    <CityList />
                                </FlexChild>
                                <FlexChild>
                                    <CityList />
                                </FlexChild>
                                <FlexChild>
                                    <CityList />
                                </FlexChild>
                                <FlexChild>
                                    <CityList alphabet={"B"} />
                                </FlexChild>
                                <FlexChild>
                                    <CityList />
                                </FlexChild>
                                <FlexChild>
                                    <CityList />
                                </FlexChild>
                                <FlexChild>
                                    <CityList />
                                </FlexChild>
                                <FlexChild>
                                    <CityList />
                                </FlexChild>
                            </VerticalFlex>



                        </FlexChild>
                        <FlexChild>
                            <Dummy height={100} />
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default AddressCityModal;