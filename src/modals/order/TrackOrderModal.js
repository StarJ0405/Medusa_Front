import ModalBase from "modals/base/ModalBase";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import style from "./TrackOrderModal.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import { useNavigate } from "react-router-dom";
import { requester } from "App";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Flex from "layouts/flex/Flex";
import { Radar } from "react-chartjs-2";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { CButton, CFormTextarea } from "@coreui/react";
import Inline from "layouts/container/Inline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import box from "../../resources/img/icons/box.png"
import truck from "../../resources/img/icons/truck.png"
import fasttruck from "../../resources/img/icons/fastTruck.png"
import home from "../../resources/img/icons/home.png"
import AccordionWrapper from "components/accordion/AccordionWrapper";
import AccordionText from "components/accordion/AccordionText";
import TermsOfUse from "routes/front/footer/TermsOfUse";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { addCommas, clone } from "shared/utils/Utils";

const TrackOrderModal = NiceModal.create(
    (props, ref) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const modal = useRef();
        const [withHeader, withFooter] = [false,
            false];
        const [width, height] = [isMobile ? "100%" : "730px", isMobile ? "65vh" : "85%"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = "문의 사항";
        const { id, price, quantity } = props;
        const buttonText = "close";
        const { t } = useTranslation();
        const [product, setProduct] = useState();

        useEffect(() => {
            let searchCondition = clone(initialSearchCondition);
            searchCondition.productId = id;
            requester.searchProducts(searchCondition, (result) => {
                setProduct(result.data[0]);
            });
        }, [])

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                {product &&
                    <div className={style.wrap} style={{ padding: isMobile ? "10px" : "40px", height: isMobile ? "65vh" : "100%", overflowY: isMobile ? "scroll" : "hidden" }}>
                        <VerticalFlex gap={20}>
                            <FlexChild>
                                <div className={style.header}>
                                    <P textAlign={"left"} size={"18pt"} weight={"bold"}>배송조회</P>
                                </div>
                            </FlexChild>
                            <FlexChild >
                                <div className={style.borderBottom}>
                                    <P size={"18pt"} weight={"bold"} color={"var(--main-color)"}>{t("내일 12월 2일 (금) 도착 예정")}</P>
                                    <P color={"var(--font-color-disabled)"} size={"10pt"}>{t("고객님의 상품이 배송되었습니다")}</P>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.borderBottom}>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild>
                                                    <HorizontalFlex>
                                                        <FlexChild width={"max-content"}>
                                                            <P>{t("송장번호")} </P>
                                                        </FlexChild>
                                                        <FlexChild padding={"0 0 0 20px"}>
                                                            <P weight={"bold"} size={"12pt"}>{t("12345678910")}</P>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex>
                                                        <FlexChild width={"max-content"}>
                                                            <P>{t("배송기사")} </P>
                                                        </FlexChild>
                                                        <FlexChild padding={"0 0 0 20px"}>
                                                            <P weight={"bold"} size={"12pt"}>{t("정하연")}&nbsp;&nbsp;<FontAwesomeIcon color={"#999"} icon={faPhone} /></P>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild width={"max-content"}>
                                                    <P>{t("배송업체")} </P>
                                                </FlexChild>
                                                <FlexChild padding={"0 0 0 20px"}>
                                                    <P weight={"bold"} size={"12pt"}>{t("로젠택배")}&nbsp;&nbsp;<FontAwesomeIcon color={"#999"} icon={faPhone} /></P>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                    </VerticalFlex>
                                </div>
                            </FlexChild>
                            <FlexChild >
                                <HorizontalFlex>
                                    <FlexChild width={"max-content"}>
                                        <img src={product.image} width={"100px"} />
                                    </FlexChild>
                                    <FlexChild padding={"0 0 0 10px"}>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <P size={"10pt"} color={"#999"}>{product.brandTitleKr}</P>
                                            <P padding={"0 0 20px 0"}>{product.titleKr}</P>
                                            <P weight={"bold"} color={"var(--main-color)"}>{addCommas(product.price)}&#8361;</P>
                                        </Center>
                                    </FlexChild>
                                    <FlexChild justifyContent={"flex-end"}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild padding={"5px"}>
                                {
                                    isMobile
                                        ?
                                        <HorizontalFlex gap={10}>
                                            <FlexChild width={"initial"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <div className={style.circle}>
                                                            <img width={"60%"} src={box} />
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P color={"var(--main-color)"} size={"11pt"}>배송준비중</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild width={"initial"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <div className={style.circle}>
                                                            <img width={"60%"} src={truck} />
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P color={"var(--main-color)"} size={"12pt"}>배송시작</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild width={"initial"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <div className={style.circle}>
                                                            <img width={"60%"} src={fasttruck} />
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P color={"var(--main-color)"} size={"12pt"}>배송중</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild width={"initial"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <div className={style.circleHome}>
                                                            <img width={"60%"} src={home} />
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P size={"12pt"}>배송완료</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                        :
                                        <HorizontalFlex>
                                            <FlexChild width={"initial"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <div className={style.circle}>
                                                            <img width={"60%"} src={box} />
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P color={"var(--main-color)"} size={"11pt"}>배송준비중</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild padding={"0 0 10px 0"}>
                                                <div className={style.line}></div>
                                            </FlexChild>
                                            <FlexChild width={"initial"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <div className={style.circle}>
                                                            <img width={"60%"} src={truck} />
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P color={"var(--main-color)"} size={"12pt"}>배송시작</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild padding={"0 0 10px 0"}>
                                                <div className={style.line}></div>
                                            </FlexChild>
                                            <FlexChild width={"initial"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <div className={style.circle}>
                                                            <img width={"60%"} src={fasttruck} />
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P color={"var(--main-color)"} size={"12pt"}>배송중</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                            <FlexChild padding={"0 0 10px 0"}>
                                                <div className={style.line}></div>
                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <div className={style.circleHome}>
                                                            <img width={"60%"} src={home} />
                                                        </div>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P size={"12pt"}>배송완료</P>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                }
                            </FlexChild>
                            <FlexChild>
                                <div className={style.borderTop}>
                                    <VerticalFlex>
                                        <FlexChild padding={"10px"}>
                                            <div className={style.borderBottom} >
                                                <HorizontalFlex>
                                                    <FlexChild justifyContent={"center"}>
                                                        <P>집하</P>
                                                    </FlexChild>
                                                    <FlexChild justifyContent={"center"}>
                                                        <P size={"11pt"}>부산연제거제2동 {"("}임병섭{")"}</P>
                                                    </FlexChild>
                                                    <FlexChild justifyContent={"center"}>
                                                        <P>12.01{"("}목{")"} 15:31</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </div>
                                        </FlexChild>
                                        <FlexChild padding={"10px"}>
                                            <div className={style.borderBottom} >
                                                <HorizontalFlex>
                                                    <FlexChild justifyContent={"center"}>
                                                        <P weight={"bold"}>배송중</P>
                                                    </FlexChild>
                                                    <FlexChild justifyContent={"center"}>
                                                        <P weight={"bold"}>대전신대전 {"("}정하연{")"}</P>
                                                    </FlexChild>
                                                    <FlexChild justifyContent={"center"}>
                                                        <P weight={"bold"}>12.02{"("}목{")"} 00:31</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </div>
                            </FlexChild>

                            <FlexChild>
                                <AccordionWrapper>
                                    <AccordionText height={150} header={"Q.상품 배송기간은 얼마나 걸리나요?"} >
                                        <TermsOfUse narrow />
                                    </AccordionText>
                                </AccordionWrapper>
                                <AccordionWrapper>
                                    <AccordionText height={150} header={"Q.발송처리가되었는데 배송조회가 되지 않아요"} >
                                        <TermsOfUse narrow />
                                    </AccordionText>
                                </AccordionWrapper>
                            </FlexChild>
                        </VerticalFlex>
                    </div>

                }
            </ModalBase>
        );
    }
);


export default TrackOrderModal;