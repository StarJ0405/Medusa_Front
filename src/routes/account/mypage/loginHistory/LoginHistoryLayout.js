import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect } from "react";
import style from "./LoginHistoryLayout.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { AuthContext } from "providers/AuthProvider";
import MypageContentHeader from "../header/MypageContentHeader";

function LoginHistoryLayout() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);

    useEffect(() => {
        if (userName) {

        } else {
            NiceModal.show("memberSignIn");
        }
    }, [])

    const Row = () => {

        const onClick = () => {
            NiceModal.show("loginHistory");
        }

        return (
            <>
                {
                    isMobile
                        ?
                        <HorizontalFlex padding={"0 20px"}>
                            <FlexChild width={"100px"} justifyContent={"center"}>
                                <P size={"var(--font-size)"}>2022/12/05</P>
                            </FlexChild>
                            <FlexChild justifyContent={"center"}>
                                <P size={"var(--font-size)"}>123.123.123.111</P>
                            </FlexChild>
                            <FlexChild width={"70px"} height={"30px"} justifyContent={"center"} border={"1px solid var(--line-color)"} borderRadius={"3px"}>
                                <P onClick={onClick} size={"var(--font-size)"}>상세보기</P>
                            </FlexChild>
                        </HorizontalFlex>
                        :
                        <HorizontalFlex padding={"30px 5px"}>
                            <FlexChild width={"250px"} justifyContent={"center"}>
                                <P>2022/12/05 (월) 12:00</P>
                            </FlexChild>
                            <FlexChild justifyContent={"center"}>
                                <P>123.123.123.111</P>
                            </FlexChild>
                            <FlexChild width={"200px"} justifyContent={"center"}>
                                <P>010-****-1234</P>
                            </FlexChild>
                            <FlexChild width={"150px"} justifyContent={"center"}>
                                <P>PC (웹)</P>
                            </FlexChild>
                        </HorizontalFlex>
                }
                <FlexChild>
                    <div className={style.line}></div>
                </FlexChild>
            </>
        );
    }
    return (
        <VerticalFlex backgroundColor={"white"}>
            {
                isMobile
                    ?
                    <FlexChild>
                        <VerticalFlex>
                            {/* <FlexChild height={"40px"} backgroundColor={"var(--main-color)"}>
                                <HorizontalFlex>
                                    <FlexChild padding={" 0 0 0 20px"}>
                                        <P color={"white"} size={"16pt"}><FontAwesomeIcon icon={faAngleLeft} /></P>
                                    </FlexChild>
                                    <FlexChild justifyContent={"center"}>
                                        <P color={"white"} size={"16pt"}>로그인이력</P>
                                    </FlexChild>
                                    <FlexChild justifyContent={"flex-end"} padding={"0 20px 5px 0 "}>
                                        <div className={style.iconWrap}>
                                            <CustomIcon name={"shoppingBag"} color={"white"} />
                                        </div>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild> */}
                            <FlexChild>
                                {
                                    isMobile &&
                                    <MypageContentHeader />
                                }
                            </FlexChild>
                        </VerticalFlex>
                    </FlexChild>
                    :
                    // <FlexChild padding={"5px 20px 0 20px"} height={"44px"}>
                    //     <Center width={"100%"} textAlign={"left"}>
                    //         <P size={"16pt"} weight={"bold"}>로그인이력</P>
                    //     </Center>
                    // </FlexChild>
                    <FlexChild />

            }
            {
                !isMobile
                &&
                <FlexChild backgroundColor={"#ddd"} padding={"15px"}>
                    <HorizontalFlex>
                        <FlexChild width={"250px"} justifyContent={"center"}>
                            <P>일시</P>
                        </FlexChild>
                        <FlexChild justifyContent={"center"}>
                            <P>로그인 IP</P>
                        </FlexChild>
                        <FlexChild width={"200px"} justifyContent={"center"}>
                            <P>국가</P>
                        </FlexChild>
                        <FlexChild width={"150px"} justifyContent={"center"}>
                            <P>기기</P>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
            }

            {
                isMobile
                    ?
                    userName
                        ?
                        <VerticalFlex>
                            <FlexChild>
                                <div className={style.horizontalLine}></div>
                            </FlexChild>
                            <FlexChild height={50}>
                                <Row />
                            </FlexChild>
                            <FlexChild height={50}>
                                <Row />
                            </FlexChild>
                            <FlexChild height={50}>
                                <Row />
                            </FlexChild>
                            <FlexChild height={50}>
                                <Row />
                            </FlexChild>
                            <FlexChild height={50}>
                                <Row />
                            </FlexChild>
                        </VerticalFlex>
                        :
                        <Center>
                            <P>로그인하세요</P>
                        </Center>
                    :
                    <VerticalFlex>
                        <FlexChild>
                            <div className={style.horizontalLine}></div>
                        </FlexChild>
                        <FlexChild >
                            <Row />
                        </FlexChild>
                        <FlexChild >
                            <Row />
                        </FlexChild>
                        <FlexChild>
                            <Row />
                        </FlexChild>
                        <FlexChild >
                            <Row />
                        </FlexChild>
                        <FlexChild>
                            <Row />
                        </FlexChild>
                    </VerticalFlex>
            }

        </VerticalFlex>
    );
}

export default LoginHistoryLayout;