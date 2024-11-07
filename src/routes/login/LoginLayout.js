import { Container } from "@mui/material";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./LoginLayout.module.css"
import loginPage from "resources/img/login/loginPageSVG.svg"
import circle1 from "resources/img/login/circle1.svg"
import circle2 from "resources/img/login/circle2.svg"
import eye from "resources/img/login/eye.png"
import logo6 from "resources/img/logo/06.svg";
import qrCode from "resources/img/logo/qrcode_50.png";
import P from "components/P";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useRef } from "react";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import { validateInputs } from "shared/utils/Utils";
import { requester } from "App";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthReducer } from "shared/redux/reducers/auth/AuthReducer";
import { CButton } from "@coreui/react";
import logoCircle from "resources/img/logoCircle.png"
import InputEmail from "components/inputs/InputEmail";
import InputPassword from "components/inputs/InputPassword";
import Center from "layouts/wrapper/Center";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import Inline from "layouts/container/Inline";

function LoginLayout(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const inputsSignIn = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSignInClick = () => {
        signIn();
    }
    const onSignUpClick = () => {

        NiceModal.show("memberSignTabModal");
    }
    const signIn = () => {
        
        let data = { userId: "", password: "" };
        validateInputs(inputsSignIn.current).then((result) => {
            if (result.isValid) {
                data.userId = inputsSignIn.current[0].getValue();
                data.password = inputsSignIn.current[1].getValue();

                requester.userSignIn(data, (result) => {
                    if (result.code === -1) {
                        if (result.message === "Not found data") {
                            //존자하지 않는 아이디
        
                        } else if (result.message === "Bad credentials") {
                            //비번틀림
        
                        }
                    } else if (result.code === 0) {
                        let tokenData = result.data;
                        dispatch(AuthReducer.actions.setToken(tokenData));

                        navigate("/");
                    }
                });
            }
        });
    }
    const onKeyPress = (event) => {
        if (event.keyCode === 13) {
            signIn();
        }
    }

    const buttonStyle = {
        width: "220px",
        '--cui-btn-line-height': '23px',
        '--cui-btn-color': 'black',
        backgroundColor: "white",
        color: "var(--font-color)",
    }
    return (


        <div className={style.container}>

            <HorizontalFlex justifyContent={"center"} alignItems={"center"}>
                <FlexChild width={"40%"}>
                    <div className={style.leftWrap}>
                        <img src={circle1} className={style.circle1} />
                        <img src={circle2} className={style.circle2} />
                        <img src={logo6} className={style.logo} />
                    </div>
                </FlexChild>
                <FlexChild width={"60%"}>
                    <div className={style.rightWrap}>
                        <VerticalFlex padding={"100px"} width={"50%"} justifyContent={"center"} alignItems={"center"}>
                            <FlexChild height={70}>
                                <img src={logo6} width={"90px"} className={style.logo2} />
                            </FlexChild>
                            <FlexChild height={30}>
                                <div className={style.dummy}></div>
                            </FlexChild>
                            <FlexChild>
                                <VerticalFlex gap={20}>
                                    <FlexChild alignItems={"flex-start"}>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <P padding={"0 0 10px 10px"}>아이디</P>
                                        </Center>
                                        <InputEmail onKeyPress={onKeyPress} size={"lg"} signIn ref={el => (inputsSignIn.current[0] = el)} placeHolder={"이메일을 입력해주세요"} />

                                    </FlexChild>
                                    <FlexChild >
                                        <div className={style.inputWrap}>
                                            <Center width={"100%"} textAlign={"left"}>
                                                <P padding={"0 0 10px 10px"}>비밀번호</P>
                                            </Center>
                                            <InputPassword onKeyPress={onKeyPress} size={"lg"} signIn ref={el => (inputsSignIn.current[1] = el)} placeHolder={"비밀번호를 입력해주세요"} confirmVisible={false} />
                                            <img src={eye} className={style.eye} />
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex gap={15} alignItems={"flex-start"}>
                                            <FlexChild width={"initial"} alignItems={"flex-start"}>
                                                <CheckCircle width={"15px"} height={"15px"} />
                                                <P>아이디 저장</P>
                                            </FlexChild>
                                            <FlexChild alignItems={"flex-start"}>
                                                <CheckCircle width={"15px"} height={"15px"} />
                                                <P>자동로그인</P>
                                            </FlexChild>

                                        </HorizontalFlex>

                                    </FlexChild>
                                    <FlexChild height={10}>
                                        <div className={style.dummy}></div>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>

                            <FlexChild width={"100%"}>

                                <ButtonEclipse height={40} fontSize={"14px"} backgroundColor={"#e84518"} text={t("signIn")} onClick={onSignInClick} />
                            </FlexChild>
                            <FlexChild padding={"30px 0 0 0"}>
                                <P color={"#bebebe"}>다른 방법으로 로그인하기</P>
                            </FlexChild>
                            <FlexChild padding={"20px 0 0 0"}>
                                <HorizontalFlex gap={20}>
                                    <FlexChild justifyContent={"flex-end"}>
                                        <div className={style.loginCircle1}>
                                            <P size={"var(--font-size-lg)"}>ID</P>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.loginCircle2}>
                                            <img src={qrCode} className={style.qrCode} />
                                        </div>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild padding={"20px 0 0 0"}>
                                <Inline>
                                <P>아직 회원이 아니신가요 ?</P>
                                <P color={"#e84518"}>회원가입</P>
                                </Inline>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </FlexChild>
            </HorizontalFlex>
        </div>


    );
}

export default LoginLayout;