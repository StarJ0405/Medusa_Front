import { useContext, useEffect, useRef, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import ModalBase from "modals/base/ModalBase";
import TabView from "layouts/view/TabView";
import { useTranslation } from "react-i18next";
import TabViewChild from "layouts/view/TabViewChild";
import { validateInputs } from "shared/utils/Utils";
import { requester, techtonicChainRequester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import InputText from "components/inputs/InputText";
import InputPassword from "components/inputs/InputPassword";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { emailFormat, mobileNoFormat, passwordFormat, userNameFormat } from "InitialData/regExp";
import InputEmail from "components/inputs/InputEmail";
import style from "./SignModal.module.css"
import Center from "layouts/wrapper/Center";
import Inline from "layouts/container/Inline";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import Dummy from "components/Dummy";
import { CButton } from "@coreui/react";
import Terms from "./signUp/Terms";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "components/buttons/CustomButton";
import { useDispatch } from "react-redux";
import { AuthReducer } from "shared/redux/reducers/auth/AuthReducer";
import ReactLoading from "react-loading";
import Loading from "modals/base/Loading";
import { HistoryReducer } from "shared/redux/reducers/history/HistoryReducer";

const MemberSignTabModal = NiceModal.create((props, ref) => {
    const modal = useRef();
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const [withHeader, withFooter] = [false, false];
    const [width, height] = [isMobile ? "100%" : "min(1200px, 80%)", isMobile ? "100vh" : "80%"];
    const withCloseButton = true;
    const clickOutsideToClose = false;
    const title = "";
    const buttonText = "close";
    const inputsSignUp = useRef([]);
    const inputTabIndex = useRef();
    const tabViewRef = useRef();
    const [tabIndex, setTabIndex] = useState();
    const [selectedList, setSelectedList] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [agree, setAgree] = useState("");
    const [duplicateCheck, setDuplicateCheck] = useState("NOCHECK");
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [signUpResult, setSignUpResult] = useState(false);
    const dispatch = useDispatch();
    const rowIndex = [
        {
            id: 1,
            accent: true,
            text: t("termsOfUseAgree"),
            header: t("termsOfUse"),
        },
        {
            id: 2,
            accent: true,
            privacy: true,
            text: t("privacyPolicyAgree"),
            header: t("privacyPolicy") + t("useToInfo"),
        }
    ];

    useEffect(() => {
        selectedList.map((data, index) => {
            if (data.accent && selectedList.length >= 2) {
                setAgree(true);
            } else {
                setAgree(false);
            }
            if (selectedList.length >= 3) {
                setAgree(true);
            }
        })
    }, [selectedList]);

    // useEffect(() => {
    //     if (signUpResult) {
    //         console.log(signUpResult);
    //         console.log(userName);

    //     }
    // }, [signUpResult])


    // useEffect(() => {
    //     if (rowIndex) {
    //         setTotalCount(rowIndex.length);
    //     }
    //     if (selectedList) {
    //         let tempList = [];
    //         selectedList.map((row) => {
    //             if (row && row.id) {
    //                 let selectedRow = findSelectedProductById(row.id);
    //                 tempList.push(selectedRow);
    //             }
    //         });
    //         setSelectedList(tempList);
    //     }
    // }, [rowIndex]);

    const onTabChange = (activeTabIndex) => {
        setTabIndex(activeTabIndex);
    }

    const onNextBtnClick = () => {
        signUp();
    }

    const onShoppingClick = () => {
        signIn();
    }

    const signIn = () => {
        let data = { userId: userName, password: password };
        requester.userSignIn(data, (result) => {
            if (result.code === -1) {
                if (result.message === "Not found data") {
                    //존자하지 않는 아이디
                    toast.error(t("noUserName"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                } else if (result.message === "Bad credentials") {
                    //비번틀림
                    toast.error(t("noPassword"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            } else if (result.code === 0) {
                let tokenData = result.data.token;
                dispatch(AuthReducer.actions.setToken(tokenData));
                modal.current.close();
                // navigate("/");
            }
        });
    }

    const signUp = () => {
        let data = { userName: "", password: "", mobileNo: "", point: 0, partnersUrl: "" };
        let partners = sessionStorage.getItem("partners");

        if (!duplicateCheck) {
            validateInputs(inputsSignUp.current).then((result) => {
                if (result.isValid) {
                    if (partners) {
                        data.userName = inputsSignUp.current[0].getValue();
                        data.password = inputsSignUp.current[1].getValue();
                        data.mobileNo = inputsSignUp.current[2].getValue();
                        data.partnersParent = partners;
                    } else {
                        data.userName = inputsSignUp.current[0].getValue();
                        data.password = inputsSignUp.current[1].getValue();
                        data.mobileNo = inputsSignUp.current[2].getValue();
                    }
                    if (agree) {
                        dispatch(HistoryReducer.actions.setLoading(true));
                        requester.userSignUp(data, (result) => {
                            if (result.code === 0) {
                                setUserName(data.userName);
                                setPassword(data.password);
                                tabViewRef.current.nextIndex();

                                // let row = { type: "Register", data:  data.userName}
                                // techtonicChainRequester.userBalance(row, (result) => {
                                //     console.log(result);
                                // })
                            } else {
                                toast.error(t("문제가 발생했습니다 관리자에게 문의하세요"), {
                                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                                });
                            }
                            dispatch(HistoryReducer.actions.setLoading(false));
                        });
                    } else {
                        toast.error(t("agreeToTheTerms"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    }
                } else {
                    toast.error(t("pleaseCheck"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }

            });
        } else if (duplicateCheck === "NOCHECK") {
            toast.error(t("duplicateCheck"), {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
            inputsSignUp.current[0].focus();
        } else {
            toast.error(t("duplicateCheck"), {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
            inputsSignUp.current[0].focus();
        }

    }

    const findSelectedProductById = (id) => {
        const key = Object.keys(rowIndex).find(product => rowIndex[product].id === id);
        return rowIndex[key];
    }
    const onCheckGroupCallback = (checkedIndex) => {
        let selectedProducts = [];
        checkedIndex && checkedIndex.map((index) => {
            selectedProducts.push(rowIndex[index]);
        });
        setSelectedList(selectedProducts);
    }

    const onDuplicateClick = () => {
        let data = { userName: "" }
        data.userName = inputsSignUp.current[0].getValue();
        requester.userDuplicateCheck(data, (result) => {
            let validationResult = true;
            [userNameFormat].map((re) => {
                let eachValidationResult = re.exp.test(inputsSignUp.current[0].getValue());
                if (eachValidationResult === false) {
                    validationResult = false;
                }

            });

            if (validationResult) {
                if (result.data) {
                    toast.error("이미 사용중인 아이디입니다", {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                    inputsSignUp.current[0].focus();
                    inputsSignUp.current[0].setValid(false);
                    setDuplicateCheck(result.data);
                } else {
                    toast.success(t("available"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                    setDuplicateCheck(result.data);
                }
            } else {
                toast.error("올바른 아이디를 입력해주세요", {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
                inputsSignUp.current[0].focus();
                inputsSignUp.current[0].setValid(false);
                setDuplicateCheck(result.data);
            }
        })

    }

    const duplicateCallback = (valid) => {
        setDuplicateCheck(valid);
    };

    const btnStyle = {
        backgroundColor: "var(--main-color)",
        borderRadius: "0",
        border: "none",
        padding: "0",
        height: "30px",
        width: "130px",
        fontSize: "var(--font-size-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    }
    const duplicateCheckBtnStyle = {
        backgroundColor: "var(--main-color)",
        borderRadius: "0",
        border: "none",
        padding: "0",
        height: "25px",
        width: "90px",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    }

    return (
        <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} borderRadius={0} overflow={"hidden"}>
            <TabView ref={tabViewRef} height={"100%"} initTabIndex={props.initTabIndex || 0} onTabChange={onTabChange}>
                <TabViewChild tabName={t("privacy")}>
                    <VerticalFlex gap={30}>
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <Inline>
                                            <P weight={"bold"} size={"var(--font-size-lg)"}>{t("privacy")}</P>
                                            <P size={"var(--font-size-sm)"}>{"("}</P>
                                            <P size={"var(--font-size-sm)"} color={"var(--main-color)"}>*</P>
                                            <P size={"var(--font-size-sm)"}> RequiredField {")"}</P>
                                        </Inline>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.titleLine}></div>
                                </FlexChild>
                                <FlexChild>

                                    <HorizontalFlex justifyContent={"flex-start"}>
                                        <FlexChild height={130} width={"min(35%, 150px)"} backgroundColor={"var(--user-bg-color)"} padding={"20px"}>
                                            <VerticalFlex>
                                                <Inline>
                                                    <P>{"아이디"}</P>
                                                    <P color={"var(--main-color)"}>&nbsp;*</P>
                                                </Inline>
                                            </VerticalFlex>
                                        </FlexChild>
                                        <FlexChild padding={"0 0 0 20px"} >
                                            <VerticalFlex flexStart>
                                                <FlexChild height={60} width={"75%"}>
                                                    <InputEmail ref={el => (inputsSignUp.current[0] = el)} regExp={[userNameFormat]} placeHolder={"아이디"} />
                                                </FlexChild>
                                                <FlexChild>
                                                    <VerticalFlex>
                                                        <FlexChild alignItems={"flex-start"}>
                                                            <CustomButton style={duplicateCheckBtnStyle} onClick={onDuplicateClick} text={t("duplicateInspection")} />
                                                        </FlexChild>
                                                        <Center width={"100%"} textAlign={"left"} alignItems={"flex-start"}>
                                                            <P color={"#ddd"} size={"9pt"}>{t("useToLogin")}</P>
                                                        </Center>
                                                    </VerticalFlex>
                                                </FlexChild>
                                            </VerticalFlex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.line}></div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex justifyContent={"flex-start"}>
                                        <FlexChild height={180} width={"min(35%, 150px)"} backgroundColor={"var(--user-bg-color)"} padding={"20px"}>
                                            <Inline>
                                                <P>{t("password")}</P>
                                                <P color={"var(--main-color)"}>&nbsp;*</P>
                                            </Inline>
                                        </FlexChild>
                                        <FlexChild padding={"0 0 0 20px"} >
                                            <VerticalFlex flexStart>
                                                <FlexChild height={100} width={"75%"} >
                                                    <InputPassword signUp ref={el => (inputsSignUp.current[1] = el)} placeHolder={t("password")} placeHolderComfirm={t("password") + t("confirm")} confirmVisible={true} regExp={[passwordFormat]} />
                                                </FlexChild>
                                                <FlexChild>
                                                    <Center width={"100%"} textAlign={"left"} alignItems={"flex-start"}>
                                                        <P color={"#ddd"} size={"10pt"}>{t("minimumCharacters")}</P>
                                                    </Center>
                                                </FlexChild>
                                            </VerticalFlex>
                                        </FlexChild>
                                    </HorizontalFlex>

                                </FlexChild>
                                <FlexChild>
                                    <div className={style.line}></div>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex justifyContent={"flex-start"}>
                                        <FlexChild height={100} width={"min(35%, 150px)"} backgroundColor={"var(--user-bg-color)"} padding={"20px"}>
                                            <Inline>
                                                <P>{t("number")}</P>
                                                <P color={"var(--main-color)"}>&nbsp;*</P>
                                            </Inline>
                                        </FlexChild>
                                        <FlexChild padding={"0 0 0 20px"}>
                                            <VerticalFlex flexStart>
                                                <FlexChild height={60} width={"75%"} >
                                                    <InputText placeHolder={t("number")} ref={el => (inputsSignUp.current[2] = el)} regExp={[mobileNoFormat]} numberOnly />
                                                </FlexChild>
                                                <FlexChild>
                                                    <Center width={"100%"} textAlign={"left"} alignItems={"flex-start"}>
                                                        <P color={"#ddd"} size={"10pt"}>{t("enterPhoneNumber")}</P>
                                                    </Center>
                                                </FlexChild>
                                            </VerticalFlex>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.line}></div>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <Inline>
                                            <P weight={"bold"} size={"16pt"}>{t("termsOfUse")}</P>
                                        </Inline>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.titleLine}></div>
                                </FlexChild>
                                <FlexChild padding={"10px 0 0 0"}>
                                    <CheckCircleGroup callback={onCheckGroupCallback}
                                        header={[{ width: "90%", text: `${t("termsOfUse")},${t("privacyPolicy")}${t("useToInfo")}, ${t("shoppingInfoAgree")}`, alignItems: "center" }]}>
                                        {
                                            rowIndex &&
                                            rowIndex.map((data, index) => (
                                                <Terms data={data} key={index} index={index} />
                                            ))
                                        }
                                    </CheckCircleGroup>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild>
                            <HorizontalFlex justifyContent={"center"}>
                                <FlexChild height={50} width={"40%"} justifyContent={"center"}>
                                    <CButton style={btnStyle} onClick={onNextBtnClick}>{"회원가입"}</CButton>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <Dummy height={50} />
                        </FlexChild>
                    </VerticalFlex>
                </TabViewChild>
                <TabViewChild tabName={t("accountComplete")}>
                    <VerticalFlex>
                        <FlexChild>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.titleLine}></div>
                        </FlexChild>
                        <FlexChild padding={"10px 0 "}>
                            <P size={"10pt"}>{t("welcomeSignUp")}</P>
                        </FlexChild>
                        <FlexChild padding={"30px 0 0 0"}>
                            <HorizontalFlex justifyContent={"center"}>
                                <FlexChild height={50} width={"40%"} >
                                    <ButtonEclipse backgroundColor={"var(--main-color)"} text={t("goShopping")} onClick={onShoppingClick} />
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                    </VerticalFlex>
                </TabViewChild>
            </TabView>
            <input ref={inputTabIndex} className={"qdqdq"} type={"hidden"} value={tabIndex || 0} />
        </ModalBase>
    );
}
);

export default MemberSignTabModal;