import NiceModal from "@ebay/nice-modal-react";
import { requester } from "App";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import InputEmail from "components/inputs/InputEmail";
import InputPassword from "components/inputs/InputPassword";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import ModalBase from "modals/base/ModalBase";
import { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AuthReducer } from "shared/redux/reducers/auth/AuthReducer";
import { setLocalStorage, validateInputs } from "shared/utils/Utils";
import style from "./WarningModal.module.css"
import logoCircle from "resources/img/logoCircle.png"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo4 } from "resources/img/logo/03.svg";
import { emailFormat, mobileNoFormat, passwordFormat } from "InitialData/regExp";
import { ToastContainer, toast } from "react-toastify";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import warning from "resources/img/warning.svg"


const WarningModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [false, false];
        const [width, height] = ["min(100%, 500px)", "initial"];
        const withCloseButton = false;
        const modal = useRef();
        const clickOutsideToClose = false;
        const title = t("signIn");
        const buttonText = t("close");
        const inputsSignIn = useRef([]);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { isMobile } = useContext(BrowserDetectContext);
        

        const onAudltClick = () => {
            modal.current.close();
            setLocalStorage("audltYn", true);
        }

        const onNotAudltClick = () => {
            toast.error(t("warning1"), {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
        }


        const buttonStyle = {
            width: "80%",
            '--cui-btn-line-height': '23px',
            '--cui-btn-color': 'var(--main-color)',
            backgroundColor: "var(--main-color)",
            color: "white",
            border: "none"
        }

        const underBtnStyle = {
            width: "80%",
            '--cui-btn-line-height': '23px',
            '--cui-btn-color': 'var(--main-color)',
            backgroundColor: "white",
            color: "black",
            border: "2px solid var(--main-color)",
            fontWeight: "bold"
        }

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} overflow={"visible"}>
                <div className={style.wrap}>
                    <VerticalFlex gap={15}>
                        <FlexChild></FlexChild>
                        <FlexChild >
                            <img src={warning} width="15%" />

                        </FlexChild>
                        <FlexChild>
                            <Center>
                                <P size={"16pt"} weight={"bold"}>{t("warningTitle")}</P>
                            </Center>
                        </FlexChild>
                        <FlexChild>

                            <Center>
                                <P color={"var(--font-faint-color)"}>{t("warning1")}</P>
                                <P color={"var(--font-faint-color)"}>{t("warning2")}</P>
                            </Center>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex>
                                <FlexChild justifyContent={"center"}>
                                    <CButton onClick={onAudltClick} style={buttonStyle}>{t("18age")}</CButton>


                                </FlexChild>
                                <FlexChild justifyContent={"center"}>
                                    <CButton onClick={onNotAudltClick} style={underBtnStyle}>{t("under18age")}</CButton>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default WarningModal;