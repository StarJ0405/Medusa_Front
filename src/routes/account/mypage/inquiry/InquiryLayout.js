import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./InquiryLayout.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { AuthContext } from "providers/AuthProvider";
import { t } from "i18next";
import MypageContentHeader from "../header/MypageContentHeader";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { clone } from "shared/utils/Utils";

function InquiryLayout() {
    const [product, setProduct] = useState();
    const [active, setActive] = useState(false);
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    useEffect(() => {
        if (userName) {
            let searchCondition = clone(initialSearchCondition);
            searchCondition.productId = "a938b80c-a7ab-462b-a2ec-d5142b1610fc";
            requester.searchProducts(searchCondition, (result) => {
                setProduct(result.data[0]);
            });
        } else {
            // NiceModal.show("memberSignIn");
        }
    }, [])

    const onInquiryComplateClick = () => {
        setActive(!active);
    }

    const navigate = useNavigate();

    const onClick = () => {
        navigate("/singleInquiry");
    }

    const Row = (props) => {
        return (
            <>
                {
                    product &&
                    <HorizontalFlex padding={"10px"}>
                        <FlexChild width={"30%"} justifyContent={"center"}>
                            <img src={product.image} width={isMobile ? "60px" : "100px"} />
                        </FlexChild>
                        {
                            isMobile
                                ?
                                <FlexChild width={"70%"}>
                                    <VerticalFlex flexStart>
                                        <FlexChild>
                                            <P>작성일자 2022.12.01</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <P>액상이 깨져서 배송 되었어요. 어떻게 하나요?</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <P>옵션  |  {product.brandTitleKr} 시리즈 - {product.titleKr}</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-end"}>
                                            {props.complate
                                                ?
                                                <P onClick={onInquiryComplateClick} backgroundColor={"var(--main-color)"} color={"white"} padding={"3px 20px"} cursor borderRadius={"3px"}>답변 완료 <FontAwesomeIcon icon={active ? faAngleUp : faAngleDown} /></P>
                                                :
                                                <P backgroundColor={"#eee"} color={"#999"} padding={"3px 20px"} cursor borderRadius={"3px"}>답변 미완료</P>
                                            }
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                :
                                <>
                                    <FlexChild width={"40%"}>
                                        <VerticalFlex flexStart>
                                            <FlexChild>
                                                <P>작성일자 2022.12.01</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>액상이 깨져서 배송 되었어요. 어떻게 하나요?</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>옵션  |  {product.brandTitleKr} 시리즈 - {product.titleKr}</P>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                    <FlexChild width={"30%"} justifyContent={"flex-end"}>
                                        {props.complate
                                            ?
                                            <P onClick={onInquiryComplateClick} backgroundColor={"var(--main-color)"} color={"white"} padding={"3px 20px"} cursor borderRadius={"3px"}>답변 완료 <FontAwesomeIcon icon={active ? faAngleUp : faAngleDown} /></P>
                                            :
                                            <P backgroundColor={"#eee"} color={"#999"} padding={"3px 20px"} cursor borderRadius={"3px"}>답변 미완료</P>
                                        }
                                    </FlexChild>
                                </>
                        }
                    </HorizontalFlex>
                }
                {props.inquiry && active &&
                    <FlexChild padding={isMobile ? "20px 10px 20px 30px" : "20px 10px 20px 100px"} backgroundColor={"#ddd"}>
                        <VerticalFlex>
                            <FlexChild>
                                <HorizontalFlex>
                                    <P size={"16pt"} weight={"bold"}>{t("inquiryDetail")}</P>
                                    <P padding={"2px 15px"} border={"1px solid #999"} backgroundColor={"white"} size={"10pt"}> 온라인몰 {">"} 제품문의</P>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild>
                                <HorizontalFlex>
                                    <FlexChild width={"initial"} padding={"0 10px 0 0"}>
                                        <div className={style.verticalLine}></div>
                                    </FlexChild>
                                    <FlexChild>
                                        <VerticalFlex>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"initial"} padding={"0 15px 0 0"}>
                                                        <P>주문일자</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P>2022.05.11</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"initial"} padding={"0 15px 0 0"}>
                                                        <P>문의상품</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        {product &&
                                                            <P>{product.brandTitleKr} 시리즈 - {product.titleKr}</P>
                                                        }

                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild padding={"30px 0"}>
                                <Center width={"100%"} textAlign={"left"}>
                                    <P weight={"bold"} size={"14pt"}>액상이 꺠져서 배송 되었어요.. 어떻게 하나요?</P>
                                </Center>
                            </FlexChild>

                            <FlexChild>
                                <Center width={"100%"} textAlign={"left"}>
                                    <P weight={"bold"} size={"16pt"} color={"var(--main-color)"}>답변완료</P>
                                </Center>
                            </FlexChild>
                            <FlexChild padding={"20px 0 0 0"}>
                                <Center width={"100%"} textAlign={"left"}>
                                    <P color={"black"} padding={"0 0 20px 0"} size={"14pt"}>반갑습니다. 월드인터네셔널입니다.</P>
                                    <P color={"black"} size={"14pt"}>
                                        우선 제품 받아보시는데 있어 불편을 드려 정말로 죄송합니다.<br />
                                        해당 내용 입점사에게 전달하여 시일내로 교환절차 관련하여 안내 전화 <br />
                                        드리겠습니다. 불편을 드려 죄송합니다.
                                    </P>
                                </Center>
                            </FlexChild>
                        </VerticalFlex>
                    </FlexChild>

                }
                <FlexChild padding={"10px 0 0 0"}>
                    <div className={style.line}></div>
                </FlexChild>
            </>
        );
    }

    return (
        <VerticalFlex backgroundColor={"white"}>
            {/* <FlexChild padding={"20px 0 0 0"}>
                <Center width={"100%"} textAlign={"left"}>
                    <P size={"16pt"} weight={"bold"} padding={"5px"}>{t("inquiryDetail")}</P>
                </Center>
            </FlexChild> */}
            <FlexChild>
                {
                    isMobile &&
                    <MypageContentHeader />
                }
            </FlexChild>
            <FlexChild>
                <div className={style.horizontalLine}></div>
            </FlexChild>
            <FlexChild backgroundColor={"var(--box-color)"} padding={"20px 10px"}>
                <HorizontalFlex>
                    <FlexChild width={"30%"} justifyContent={"center"}>
                        <P>{t("product")}</P>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                        <P>{t("review")}</P>
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                {
                    userName
                        ?
                        <VerticalFlex>
                            {/* <FlexChild>
                                <Row complate inquiry />
                            </FlexChild>
                            <FlexChild>
                                <Row />
                            </FlexChild> */}
                        </VerticalFlex>
                        :
                        <P>{t("pleaseLogin")}</P>

                }
            </FlexChild>
            <FlexChild padding={"30px 10px"}>
                <HorizontalFlex justifyContent={"flex-end"}>
                    {/* <P onClick={onClick} backgroundColor={"var(--main-color)"} color={"white"} padding={"3px 30px"} cursor borderRadius={"3px"}>문의하러가기</P> */}
                </HorizontalFlex>
            </FlexChild>
        </VerticalFlex>
    )
}

export default InquiryLayout;