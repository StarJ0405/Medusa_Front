import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import style from "./AccountDisabledLayout.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect } from "react";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import { CButton } from "@coreui/react";
import { AuthContext } from "providers/AuthProvider";
import MypageContentHeader from "../header/MypageContentHeader";

function AccountDisabledLayout() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const onAccoundDisabledClick = () => {
        NiceModal.show("accountDisabled");
    }

    useEffect(() => {
        if (userName) {

        } else {
            // NiceModal.show("memberSignIn");
        }
    }, [])

    const modifyBtnStyle = {
        backgroundColor: "var(--main-color)",
        borderRadius: "0",
        border: "none",
        padding: "0",
        height: "30px",
        width: "150px",
        fontSize: "var(--font-size-lg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    }

    return (
        <div>
            {
                isMobile
                    ?
                    <VerticalFlex backgroundColor={"white"} padding={"0 0 30px 0 "} gap={15}>
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <MypageContentHeader />
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.horizontalLine}></div>
                                </FlexChild>
                                <FlexChild height={"50px"} padding={"13px 20px"}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P weight={"bold"} color={"var(--font-color)"} size={"var(--font-size)"}>월드인터네셔널 계정 비활성화 프로세스를 시작합니다.</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.line}></div>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild padding={"0 20px 50px 20px"}>
                            <VerticalFlex gap={15}>
                                <FlexChild>
                                    <VerticalFlex>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <P weight={"bold"}>그 외 안내사항 확인</P>
                                            <P size={"var(--font-size-sm)"} weight={"bold"}>개인정보 보유항목 및 이용기간</P>
                                            <P size={"var(--font-size-sm)"} weight={"bold"}>· 회원의 아이디, 비밀번호, 연락처정보는 1개월 (판매회원의 경우 2개월) 보관</P>
                                            <P size={"var(--font-size-sm)"} weight={"bold"}>· 로그기록, 접속아이피(IP) 정보는 12개월간 보관</P>
                                        </Center>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P weight={"bold"}>신규가입 유예기간 안내</P>
                                        <P size={"var(--font-size-sm)"} weight={"bold"}>· 탈퇴 후 재가입 시 신규 회원 가입으로 처리되며, 탈퇴 전의 회원정보와 </P>
                                        <P size={"var(--font-size-sm)"} weight={"bold"}>  거래정보 및 포인트, 쿠폰정보등은 복구되지않음</P>
                                        <P size={"var(--font-size-sm)"} weight={"bold"}>· 구매회원의 경우, 탈퇴 후 1개월 (30일)</P>
                                        <P size={"var(--font-size-sm)"} weight={"bold"}>· 판매회원의 경우, 탈퇴 후 2개월 (60일)</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P weight={"bold"}>포인트/적립금/쿠폰 사용안내</P>
                                        <P size={"var(--font-size-sm)"} weight={"bold"}>· 보유중인 포인트/적립금/쿠폰 모두 소멸</P>
                                    </Center>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild justifyContent={"flex-end"}>
                            <CButton style={modifyBtnStyle} shape="rounded-0" onClick={onAccoundDisabledClick} >계정 비활성화</CButton>
                        </FlexChild>
                    </VerticalFlex >

                    :
                    <VerticalFlex backgroundColor={"white"} padding={"0 0 30px 0 "} >
                        <FlexChild>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                        <FlexChild backgroundColor={"#ddd"} padding={"20px"}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P>월드인터네셔널 계정 비활성화 프로세스를 시작합니다.</P>
                            </Center>
                        </FlexChild>
                        <FlexChild>
                            <VerticalFlex gap={30}>
                                <FlexChild>
                                    <VerticalFlex>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <P>그 외 안내사항 확인</P>
                                            <P>개인정보 보유항목 및 이용기간</P>
                                            <P>· 회원의 아이디, 비밀번호, 연락처정보는 1개월 (판매회원의 경우 2개월) 보관</P>
                                            <P>· 로그기록, 접속아이피(IP) 정보는 12개월간 보관</P>
                                        </Center>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P>신규가입 유예기간 안내</P>
                                        <P>·탈퇴 후 재가입 시 신규 회원 가입으로 처리되며, 탈퇴 전의 회원정보와 거래정보 및 포인트, 쿠폰정보등은 복구되지않음</P>
                                        <P>· 구매회원의 경우, 탈퇴 후 1개월 (30일)</P>
                                        <P>· 판매회원의 경우, 탈퇴 후 2개월 (60일)</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P>포인트/적립금/쿠폰 사용안내</P>
                                        <P>·보유중인 포인트/적립금/쿠폰 모두 소멸</P>
                                    </Center>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild>
                            <P onClick={onAccoundDisabledClick} color={"white"} size={"18pt"} padding={"10px 20px"} backgroundColor={"var(--main-color)"}>계정 비활성화</P>
                        </FlexChild>
                    </VerticalFlex>
            }
        </div>
    );
}

export default AccountDisabledLayout;