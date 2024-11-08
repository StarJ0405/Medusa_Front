import NiceModal from "@ebay/nice-modal-react";
import { requester } from "App";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import InputEmail from "components/inputs/InputEmail";
import InputPassword from "components/inputs/InputPassword";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import ModalBase from "modals/base/ModalBase";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AuthReducer } from "shared/redux/reducers/auth/AuthReducer";
import { validateInputs } from "shared/utils/Utils";
import style from "./MemberSignInModal.module.css"
import logoCircle from "resources/img/logoCircle.png"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo4 } from "resources/img/logo/03.svg";
import { emailFormat, mobileNoFormat, passwordFormat } from "InitialData/regExp";
import { ToastContainer, toast } from "react-toastify";
import WorldvapeLogo from "resources/img/logo/worldvape_logo.png";
import Center from "layouts/wrapper/Center";
import medusaClient from "shared/MedusaClient";

const MemberSignInModal = NiceModal.create(
    (props) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [false, false];
        const [width, height] = ["min(100%, 500px)", "initial"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = false;
        const title = t("signIn");
        const buttonText = t("close");
        const inputsSignIn = useRef([]);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { isMobile } = useContext(BrowserDetectContext);

        const [hasCookie, setHasCookie] = useState(false);
        const [currentCustomer, setCurrentCustomer] = useState(null);

        const onSignInClick = () => {
            signIn();
        }
        const onSignUpClick = () => {
            modal.current.close();
            NiceModal.show("memberSignTabModal");
        }

        const onKeyPress = (event) => {
            if (event.keyCode === 13) {
                signIn();
            }
        }
        const buttonStyle = {
            // width: "150px",
            '--cui-btn-line-height': '23px',
            '--cui-btn-color': 'black',
            backgroundColor: "white",
            color: "var(--font-color)",
        }

        const setCookie = (name, value, days) => {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 7);
            const expires = `expires=${date.toUTCString()}`;
            document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict; Secure`;
            setHasCookie(true);
        };

        const signIn = async () => {
            let data = { email: "", password: "" };
            data.email = inputsSignIn.current[0].getValue();
            data.password = inputsSignIn.current[1].getValue();

            if (data.email !== "" && data.password !== "") {
                // medusaClient.auth.authenticate({
                //     email: data.email,
                //     password: data.password
                // })
                //     .then(({ customer }) => {
                //         console.log(customer.id)
                //     })
                medusaClient.auth.getToken({
                    email: data.email,
                    password: data.password
                })
                    .then(({ access_token }) => {
                        setCookie("_medusa_jwt", access_token, 1);
                    })
            }
        };

        useEffect(() => {
            if (hasCookie) {
                medusaClient.auth.getSession()
                    .then(({ customer }) => {
                        console.log("userInfo : ", customer);
                        setCurrentCustomer(customer)
                    })
            }
        }, [hasCookie])

        useEffect(() => {
            if (currentCustomer !== null) {
                modal.current.close();
                navigate("/")
            }
        }, [currentCustomer])

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} overflow={"visible"}>
                <div className={style.wrap}>
                    <VerticalFlex gap={10}>
                        <FlexChild height={70}>
                            <Center width={"70%"}>
                                <img src={WorldvapeLogo} width={"100%"} />
                            </Center>

                            {/* <Logo4 fill="#e94619" className={style.logoIcon} style={{ height: 80 }} /> */}
                            {/* <img src={logoCircle} width={"90px"} /> */}
                        </FlexChild>
                        <FlexChild height={30}>
                            <div className={style.dummy}></div>
                        </FlexChild>
                        <FlexChild alignItems={"flex-start"}>
                            <InputEmail onKeyPress={onKeyPress} size={"lg"} signIn ref={el => (inputsSignIn.current[0] = el)} placeHolder={t("email")} />
                        </FlexChild>
                        <FlexChild >
                            <InputPassword onKeyPress={onKeyPress} size={"lg"} signIn ref={el => (inputsSignIn.current[1] = el)} placeHolder={t("password")} confirmVisible={false} />
                        </FlexChild>
                        <FlexChild height={150}>
                            <div className={style.dummy}></div>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex justifyContent={"center"} gap={15}>
                                <FlexChild height={40}>
                                    <ButtonEclipse fontSize={"19px"} backgroundColor={"var(--main-color)"} text={t("signIn")} onClick={onSignInClick} />
                                </FlexChild>
                                <FlexChild height={40}>
                                    <ButtonEclipse fontSize={"19px"} color={"black"} border={"1px solid black"} text={t("signUp")} onClick={onSignUpClick} />
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase >
        );
    }
);

export default MemberSignInModal;


// const signIn = () => {

//     let data = { userId: "", password: "" };
//     validateInputs(inputsSignIn.current).then((result) => {

//         if (result.isValid) {
//             data.userId = inputsSignIn.current[0].getValue();
//             data.password = inputsSignIn.current[1].getValue();

//             requester.userSignIn(data, (result) => {
//                 console.log("loginResult", result);
//                 if (result.code === -1) {
//                     if (result.message === "Not found data") {
//                         //존자하지 않는 아이디
//                         toast.error(t("noUserName"), {
//                             autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
//                         });
//                     } else if (result.message === "Bad credentials") {
//                         //비번틀림
//                         toast.error(t("noPassword"), {
//                             autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
//                         });
//                     }
//                 } else if (result.code === 0) {
//                     let tokenData = result.data.token;
//                     dispatch(AuthReducer.actions.setToken(tokenData));
//                     modal.current.close();
//                     navigate("/");
//                     if (props.callback) {
//                         props.callback(true);
//                     }
//                 }
//             });
//         } else {
//             toast.error(t("pleaseCheckedLoginInfo"), {
//                 autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
//             });
//         }
//     });
// }