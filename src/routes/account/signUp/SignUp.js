import Container from "layouts/container/Container";
import style from "./SignUp.module.css"
import TabView from "layouts/view/TabView";
import TabViewChild from "layouts/view/TabViewChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import Inline from "layouts/container/Inline";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import InputEmail from "components/inputs/InputEmail";
import CustomButton from "components/buttons/CustomButton";
import InputPassword from "components/inputs/InputPassword";
import InputText from "components/inputs/InputText";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import { CButton } from "@coreui/react";
import Dummy from "components/Dummy";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import { useContext, useEffect, useRef, useState } from "react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import { validateInputs } from "shared/utils/Utils";
import { ToastContainer, toast } from "react-toastify";
import { requester } from "App";
import { emailFormat, mobileNoFormat, passwordFormat } from "InitialData/regExp";
import Terms from "modals/member/sign/signUp/Terms";

function SignUp(props) {
    const modal = useRef();
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const inputsSignUp = useRef([]);
    const inputTabIndex = useRef();
    const tabViewRef = useRef();
    const [tabIndex, setTabIndex] = useState();
    const [selectedList, setSelectedList] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [agree, setAgree] = useState("");
    const [duplicateCheck, setDuplicateCheck] = useState("NOCHECK");
    const [rowIndex, setRowIndex] = useState([
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
    ]);

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


    useEffect(() => {
        if (rowIndex) {
            setTotalCount(rowIndex.length);
        }
        if (selectedList) {
            let tempList = [];
            selectedList.map((row) => {
                if (row && row.id) {
                    let selectedRow = findSelectedProductById(row.id);
                    tempList.push(selectedRow);
                }
            });
            setSelectedList(tempList);
        }
    }, [rowIndex]);


    const onTabChange = (activeTabIndex) => {
        setTabIndex(activeTabIndex);
    }

    const onNextBtnClick = () => {
        signUp();
    }

    const onShoppingClick = () => {
        window.location.replace("/");
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
                        data.partnersUrl = partners;
                    } else {
                        data.userName = inputsSignUp.current[0].getValue();
                        data.password = inputsSignUp.current[1].getValue();
                        data.mobileNo = inputsSignUp.current[2].getValue();
                    }
                    if (agree) {
                        requester.userSignUp(data, (result) => {
                            if (result.code === 0) {
                                tabViewRef.current.nextIndex();
                            } else {

                            }
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
            [emailFormat].map((re) => {
                let eachValidationResult = re.exp.test(inputsSignUp.current[0].getValue());
                if (eachValidationResult === false) {
                    validationResult = false;
                }

            });

            if (validationResult) {
                if (result.data) {
                    toast.error(t("duplicateEmail"), {
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
                toast.error(t("invalidEmail"), {
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
        <Container>
            <Container maxWidth={600}>
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
                                        {
                                            isMobile
                                                ?

                                                <HorizontalFlex height={"var(--sub-title-height)"} justifyContent={"flex-start"}>
                                                    <FlexChild height={50}>
                                                        <InputEmail callback={duplicateCallback} duplicate ref={el => (inputsSignUp.current[0] = el)} placeHolder={t("email")} lineText regExp={[emailFormat]} />
                                                    </FlexChild>
                                                </HorizontalFlex>

                                                :
                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                    <FlexChild height={130} width={"35%"} backgroundColor={"var(--user-bg-color)"} padding={"20px"}>
                                                        <VerticalFlex>
                                                            <Inline>
                                                                <P>{t("email")}</P>
                                                                <P color={"var(--main-color)"}>&nbsp;*</P>

                                                            </Inline>
                                                        </VerticalFlex>
                                                    </FlexChild>
                                                    <FlexChild padding={"0 0 0 20px"} >
                                                        <VerticalFlex flexStart>
                                                            <FlexChild height={60} width={"75%"}>
                                                                <InputEmail ref={el => (inputsSignUp.current[0] = el)} regExp={[emailFormat]} placeHolder={t("email")} />
                                                            </FlexChild>
                                                            {
                                                                !isMobile &&
                                                                <FlexChild>
                                                                    <VerticalFlex>
                                                                        <FlexChild alignItems={"flex-start"}>
                                                                            <CustomButton style={duplicateCheckBtnStyle} onClick={onDuplicateClick} text={t("duplicateInspection")} />
                                                                        </FlexChild>
                                                                        <Center width={"100%"} textAlign={"left"}>

                                                                            <P color={"#ddd"} size={"9pt"}>{t("useToLogin")}</P>
                                                                        </Center>
                                                                    </VerticalFlex>
                                                                </FlexChild>
                                                            }

                                                        </VerticalFlex>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                        }
                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.line}></div>
                                    </FlexChild>
                                    <FlexChild>
                                        {
                                            isMobile
                                                ?
                                                <HorizontalFlex height={100}>
                                                    <InputPassword line ref={el => (inputsSignUp.current[1] = el)} placeHolder={t("password")} placeHolderComfirm={t("password") + t("confirm")} confirmVisible={true} regExp={[passwordFormat]} />
                                                </HorizontalFlex>
                                                :
                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                    <FlexChild height={210} width={"35%"} backgroundColor={"var(--user-bg-color)"} padding={"20px"}>
                                                        <Inline>
                                                            <P>{t("password")} & {t("confirm")}</P>
                                                            <P color={"var(--main-color)"}>&nbsp;*</P>
                                                        </Inline>
                                                    </FlexChild>
                                                    <FlexChild padding={"0 0 0 20px"} >
                                                        <VerticalFlex flexStart>
                                                            <FlexChild height={100} width={"75%"} >
                                                                <InputPassword signUp ref={el => (inputsSignUp.current[1] = el)} placeHolder={t("password")} placeHolderComfirm={t("password") + t("confirm")} confirmVisible={true} regExp={[passwordFormat]} />
                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                        }

                                    </FlexChild>
                                    <FlexChild>
                                        <div className={style.line}></div>
                                    </FlexChild>
                                    <FlexChild>
                                        {
                                            isMobile
                                                ?
                                                <HorizontalFlex>
                                                    <FlexChild height={50}>
                                                        <InputText lineText ref={el => (inputsSignUp.current[2] = el)} placeHolder={t("number")} regExp={[mobileNoFormat]} />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                                :
                                                <HorizontalFlex justifyContent={"flex-start"}>
                                                    <FlexChild height={100} width={"35%"} backgroundColor={"var(--user-bg-color)"} padding={"20px"}>
                                                        <Inline>
                                                            <P>{t("number")}</P>
                                                            <P color={"var(--main-color)"}>&nbsp;*</P>
                                                        </Inline>
                                                    </FlexChild>
                                                    <FlexChild padding={"0 0 0 20px"}>
                                                        <VerticalFlex flexStart>
                                                            <FlexChild height={60} width={"75%"} >
                                                                <InputText placeHolder={t("number")} ref={el => (inputsSignUp.current[2] = el)} regExp={[mobileNoFormat]} />
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <Center width={"100%"} textAlign={"left"}>
                                                                    <P color={"#ddd"} size={"10pt"}>{t("enterPhoneNumber")}</P>
                                                                </Center>
                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                        }
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
                                            header={
                                                [
                                                    { width: "90%", text: `${t("termsOfUse")},${t("privacyPolicy")}${t("useToInfo")}, ${t("shoppingInfoAgree")}`, alignItems: "center" },
                                                ]
                                            }
                                        >
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
                                        {/* <ButtonEclipse backgroundColor={"var(--main-color)"} text={t("다음단계")}  /> */}
                                        <CButton style={btnStyle} onClick={onNextBtnClick}>{t("next")}</CButton>

                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <Dummy height={200} />
                            </FlexChild>
                        </VerticalFlex>
                    </TabViewChild>
                    <TabViewChild tabName={t("accountComplete")}>
                        <VerticalFlex>
                            <FlexChild>
                                <Center width={"100%"} textAlign={"left"}>
                                    <Inline>
                                        <P weight={"bold"} size={"16pt"}>{t("memberBenefit")}</P>
                                    </Inline>
                                </Center>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.titleLine}></div>
                            </FlexChild>
                            <FlexChild padding={"10px 0 "}>
                                <P size={"10pt"}>{t("welcomeSignUp")}</P>
                            </FlexChild>
                            {/* <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <img src={coupon3} />
                                        </FlexChild>
                                        <FlexChild>
                                            <img src={coupon2} />
                                        </FlexChild>
                                        <FlexChild>
                                            <img src={coupon1} />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild> */}
                            <FlexChild padding={"30px 0 0 0"}>
                                <HorizontalFlex justifyContent={"center"}>
                                    <FlexChild height={50} width={"40%"} >
                                        <ButtonEclipse backgroundColor={"var(--main-color)"} text={t("goShopping")} onClick={onShoppingClick} />
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <Dummy height={250} />
                            </FlexChild>
                        </VerticalFlex>

                    </TabViewChild>
                </TabView>
                <input ref={inputTabIndex} className={"qdqdq"} type={"hidden"} value={tabIndex || 0} />
            </Container>
        </Container>
    );
}

export default SignUp;