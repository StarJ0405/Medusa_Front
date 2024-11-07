import { faAngleLeft, faAngleRight, faChevronRight, faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import InputText from "components/inputs/InputText";
import P from "components/P";
import Container from "layouts/container/Container";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { Link, useNavigate } from "react-router-dom";
import style from "./AccountInfoLayout.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import CustomIcon from "components/icons/CustomIcon";
import { CButton } from "@coreui/react";
import { emailFormat, mobileNoFormat, passwordFormat } from "InitialData/regExp";
import InputPassword from "components/inputs/InputPassword";
import { AuthContext } from "providers/AuthProvider";
import MypageContentHeader from "../header/MypageContentHeader";
import TabViewChild from "layouts/view/TabViewChild";
import TabView from "layouts/view/TabView";
import { useTranslation } from "react-i18next";
import CustomButton from "components/buttons/CustomButton";
import { requester } from "App";
import matchers from "@testing-library/jest-dom/matchers";
import { ToastContainer, toast } from "react-toastify";
import { validateInputs } from "shared/utils/Utils";



function AccountInfoLayout(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const { t } = useTranslation();
    const tabViewRef = useRef([]);
    const inputTabIndex = useRef();
    const passwordRef = useRef();
    const inputUserInfoRef = useRef([]);
    const [tabIndex, setTabIndex] = useState();
    const [match, setMatch] = useState(false);
    const [userInfo, setUserInfo] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (userName) {

        } else {
            // NiceModal.show("memberSignIn");
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                onPasswordComfirmClick();
            }
        };


        window.addEventListener('keydown', handleKeyDown);

        // 컴포넌트가 unmount 될 때 이벤트 리스너를 제거
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    useEffect(() => {
        if (userName) {
            console.log(userName);
            let data = { userName: userName }
            console.log(data);

            requester.findByUser(data, (result) => {

                setUserInfo(result.data);
            });

        }
    }, [userName])
    useEffect(() => {
        console.log(userInfo);
    }, [userInfo])

    const modifyClick = () => {
        NiceModal.show("accountVerification");
    }
    const onCancelClick = () => {
        navigate("/mypage", { replace: true });
    }

    const btnStyle = {
        backgroundColor: "white",
        borderRadius: "0",
        borderColor: "var(--line-color-lg)",
        padding: "0",
        height: "30px",
        width: "80px",
        fontSize: "var(--font-size-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--font-faint-color)",

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
    const subTitleStyle = {
        paddingTop: "6px"
    }
    const circleStyle = {
        left: "25%",

    }

    const onTabChange = (activeTabIndex) => {
        setTabIndex(activeTabIndex);
    }
    const onPasswordComfirmClick = () => {
        let passwordValue = passwordRef.current.getValue();
        let data = {id:userInfo.id,  password: passwordValue, userName: userName }
        requester.userPasswordConfirm(data, (result) => {

            setMatch(result.data);
            if (result.data) {

            } else {
                toast.error(t("비밀번호를 확인해주세요"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        });
    }
    const onUpdateUserInfoClick = () => {
        let data = { userName: userName, password: "", mobileNo: "" };
        console.log(userName);
        validateInputs(inputUserInfoRef.current).then((result) => {
            if (result.isValid) {
                data.password = inputUserInfoRef.current[0].getValue();
                data.mobileNo = inputUserInfoRef.current[1].getValue();
                requester.updateUserInfo(data, (result) => {

                    if (result.code === 0) {
                        toast.success(t("changesCompleted"), {
                            autoClose: 1000,
                            position: toast.POSITION.BOTTOM_CENTER,
                            onClose: () => navigate("/mypage")

                        });

                    }
                })
            } else {
                toast.error(t("pleaseCheck"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        });
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onPasswordComfirmClick();
        }
    };

    useEffect(() => {
        if (match) {
            tabViewRef.current.nextIndex();
        } else {

        }

    }, [match])


    return (
        <Container backgroundColor={"white"}>
            {
                isMobile ?
                    <VerticalFlex gap={40}>
                        <TabView noneScroll noneMenu circleStyle={circleStyle} textStyle={subTitleStyle} ref={tabViewRef} height={"100%"} initTabIndex={props.initTabIndex || 0} onTabChange={onTabChange}>
                            <TabViewChild tabName={(t("password")) + (t("confirm"))}>

                                <VerticalFlex gap={15}>
                                    <FlexChild width={isMobile ? "" : "40%"}>
                                        <HorizontalFlex gap={20}>
                                            <FlexChild width={"max-content"}>
                                                <P>{t("password")} : </P>
                                            </FlexChild>
                                            <FlexChild >
                                                <InputPassword signIn ref={passwordRef} />
                                            </FlexChild>
                                            <FlexChild width={"max-content"}>
                                                <div onKeyDown={handleKeyDown}>
                                                    <CustomButton text={"확인"} style={modifyBtnStyle} onClick={onPasswordComfirmClick} />
                                                </div>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>

                                </VerticalFlex>

                            </TabViewChild>
                            <TabViewChild tabName={(t("member")) + (t("info"))}>
                                <VerticalFlex gap={20}>
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <P>아이디</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>{userInfo && userInfo.userName}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <VerticalFlex gap={20} flexStart>
                                                    <FlexChild>
                                                        <P>비밀번호</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P>비밀번호 확인</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <InputPassword signUp confirmVisible />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild>

                                            </FlexChild>

                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <P>전화번호</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <InputText value={userInfo && userInfo.mobileNo} regExp={[mobileNoFormat]} numberOnly />

                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <CustomButton text={"수정하기"} style={modifyBtnStyle} onClick={onUpdateUserInfoClick} />
                                    </FlexChild>
                                </VerticalFlex>
                            </TabViewChild>
                        </TabView>
                        <input ref={inputTabIndex} className={"qdqdq"} type={"hidden"} value={tabIndex || 0} />
                    </VerticalFlex >
                    :
                    <VerticalFlex gap={40}>
                        <TabView noneScroll noneMenu circleStyle={circleStyle} textStyle={subTitleStyle} ref={tabViewRef} height={"100%"} initTabIndex={props.initTabIndex || 0} onTabChange={onTabChange}>
                            <TabViewChild tabName={(t("password")) + (t("confirm"))}>

                                <VerticalFlex gap={15}>
                                    <FlexChild width={"40%"}>
                                        <HorizontalFlex gap={20}>
                                            <FlexChild width={"max-content"}>
                                                <P>{t("password")} : </P>
                                            </FlexChild>
                                            <FlexChild >
                                                <InputPassword signIn ref={passwordRef} />
                                            </FlexChild>
                                            <FlexChild width={"max-content"}>
                                                <div onKeyDown={handleKeyDown}>
                                                    <CustomButton text={"확인"} style={modifyBtnStyle} onClick={onPasswordComfirmClick} />
                                                </div>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>

                                </VerticalFlex>

                            </TabViewChild>
                            <TabViewChild tabName={(t("member")) + (t("info"))}>
                                <VerticalFlex gap={20}>
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <P>아이디</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>{userInfo && userInfo.userName}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <VerticalFlex gap={20} flexStart>
                                                    <FlexChild>
                                                        <P>비밀번호</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P>비밀번호 확인</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <InputPassword signUp confirmVisible={true} regExp={[passwordFormat]} ref={el => (inputUserInfoRef.current[0] = el)} />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <P>전화번호</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <InputText ref={el => (inputUserInfoRef.current[1] = el)} value={userInfo && userInfo.mobileNo} regExp={[mobileNoFormat]} numberOnly />

                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <CustomButton text={"수정하기"} style={modifyBtnStyle} onClick={onUpdateUserInfoClick} />
                                    </FlexChild>
                                </VerticalFlex>
                            </TabViewChild>
                        </TabView>
                        <input ref={inputTabIndex} className={"qdqdq"} type={"hidden"} value={tabIndex || 0} />
                    </VerticalFlex >
            }
        </Container >
    );
}

export default AccountInfoLayout;