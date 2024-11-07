import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BackButton from "components/buttons/BackButton";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import Dummy from "components/Dummy";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import P from "components/P";
import Container from "layouts/container/Container";
import FixedFooter from "layouts/container/FixedFooter";
import FixedHeader from "layouts/container/FIxedHeader";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import CircleWrapper from "layouts/wrapper/CircleWrapper";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ShoppingProcessType } from "shared/constants/constants";
import style from "./CartLayout.module.css";
import AccordionWrapper from "components/accordion/AccordionWrapper";
import AccordionText from "components/accordion/AccordionText";
import addCart from "resources/img/icons/mypage/addCart.svg";
import order from "resources/img/icons/mypage/order.svg";
import checkMark from "resources/img/icons/mypage/checkMark.svg";
import MypageContentHeader from "../header/MypageContentHeader";
import { addCommas } from "shared/utils/Utils";

function CartLayout() {
    const { isMobile } = useContext(BrowserDetectContext);
    const [viewData, setViewData] = useState({
        title: "",
        footterButtonText: "",
        currentProcess: null,
        totalCount: 0,
        selectedCount: 0,
        priceSum: 0,
        vat: 0,
        deliveryFee: 0,
        discountSum: 0,
        totalAmount: 0,
        onDeleteSelectedProductsClick: () => { },
        onSubmitButtonClick: () => { }
    });
    const { t } = useTranslation();
    const [isDetailShown, setDetailShown] = useState(false);
    const shoppingProcesses = [
        { orderNo: ShoppingProcessType.CART, title: t("cart"), icon: addCart },
        { orderNo: ShoppingProcessType.ORDER, title: t("order"), icon: order },
        { orderNo: ShoppingProcessType.ORDER_COMPLETE, title: t("orderComplete"), icon: checkMark },
    ];

    const onDeleteSelectedProductsClick = () => {
        if (viewData && viewData.onDeleteSelectedProductsClick) {
            viewData.onDeleteSelectedProductsClick();
        }
    }

    const onSubmitButtonClick = () => {
        if (viewData && viewData.onSubmitButtonClick) {
            viewData.onSubmitButtonClick();
        }
    }

    const onPriceWrapClick = () => {
        setDetailShown((before) => !before);
    }



    const Footer = () => {
        return (
            <>
                <div className={style.footer} style={{
                    border: "0.5px solid #aaa"
                }}>
                    <HorizontalFlex>
                        <FlexChild>
                            <div className={style.priceWrap} onClick={onPriceWrapClick}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <Center>
                                            <Inline>
                                                <p className={style.total}>{t("totalAmount")} : </p>
                                                <p className={style.price}>{viewData.priceSum + (Math.floor(viewData.totalAmount * 0.1)) + viewData.deliveryFee}</p>
                                            </Inline>
                                        </Center>
                                    </FlexChild>
                                    <FlexChild width={20}>
                                        <Center>
                                            <FontAwesomeIcon icon={isDetailShown ? fas["faChevronUp"] : fas["faChevronDown"]} width={10} />
                                        </Center>
                                    </FlexChild>
                                    <FlexChild width={20}>

                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild width={150}>
                            <div className={style.buttonArea}>
                                <ButtonEclipse height={30} text={viewData.footterButtonText} backgroundColor={"var(--main-color)"} onClick={onSubmitButtonClick} />
                            </div>
                        </FlexChild>
                    </HorizontalFlex>
                </div>
                {isDetailShown && <FooterOverlay />}
            </>
        );

    }

    const FooterOverlay = () => {
        const onOverlayCloseClick = () => {
            setDetailShown(false);
        }
        return (
            <div className={style.footerOverlay}>
                <VerticalFlex>
                    <FlexChild height={40}>
                        <HorizontalFlex>
                            <FlexChild width={50}>

                            </FlexChild>
                            <FlexChild>
                                <Center>
                                    <P weight={"bold"} size={14}>{t("amountOfPayment")}</P>
                                </Center>
                            </FlexChild>
                            <FlexChild width={50}>
                                <div className={style.buttonWrap} onClick={onOverlayCloseClick}>
                                    <Center>
                                        <P weight={"bold"} size={18}>{' '}&times;{' '}</P>
                                    </Center>
                                </div>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild>
                        <PaddingWrapper padding={"3px 20px"}>
                            <HorizontalFlex>
                                <FlexChild>
                                    <P size={14}>{t("productAmountSum")}</P>
                                </FlexChild>
                                <FlexChild justifyContent={"flex-end"}>
                                    <P size={14}>{viewData.priceSum}</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </PaddingWrapper>
                    </FlexChild>
                    {
                        viewData.vat ?
                            <FlexChild>
                                <PaddingWrapper padding={"3px 20px"}>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <P size={14}>{t("vat")}</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-end"}>
                                            <P size={14}>{viewData.vat}</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </PaddingWrapper>
                            </FlexChild>
                            :
                            <FlexChild>
                                <PaddingWrapper padding={"3px 20px"}>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <P size={14}>{t("vat")}</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-end"}>
                                            <P size={14}>{"0"}</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </PaddingWrapper>
                            </FlexChild>
                    }
                    {
                        viewData.deliveryFee ?
                            <FlexChild>
                                <PaddingWrapper padding={"3px 20px"}>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <P size={14}>{t("deliveryFee")}</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-end"}>
                                            <P size={14}>{viewData.deliveryFee}</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </PaddingWrapper>
                            </FlexChild>
                            :
                            <FlexChild>
                                <PaddingWrapper padding={"3px 20px"}>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <P size={14}>{t("deliveryFee")}</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-end"}>
                                            <P size={14}>{"0"}</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </PaddingWrapper>
                            </FlexChild>
                    }

                    <FlexChild>
                        <PaddingWrapper padding={"3px 20px"}>
                            <HorizontalFlex>
                                <FlexChild>
                                    <P size={14}>{t("totalAmount")}</P>
                                </FlexChild>
                                <FlexChild justifyContent={"flex-end"}>
                                    <P size={14}>{viewData.priceSum + (Math.floor(viewData.totalAmount * 0.1)) + viewData.deliveryFee}</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </PaddingWrapper>
                    </FlexChild>

                </VerticalFlex>
            </div>
        );
    }


    const accordionStyle = {
        '--cui-accordion-bg': "white",
        '--cui-accordion-active-color': "var(--font-color)",

        '--cui-accordion-color': "var(--font-color)",
        '--cui-accordion-active-bg': "var(--user-bg-color)",
        '--cui-accordion-btn-focus-border-color': "none",
        '--cui-accordion-btn-focus-box-shadow': "none",

    }



    return (
        <div className={style.container}>
            {
                isMobile &&
                <>
                    <FixedHeader height={50}>
                        <div className={style.titleWrap}>
                            <Container maxWidth={1200}>
                                <HorizontalFlex height={50}>
                                    <FlexChild width={50}>
                                        <BackButton color={"black"} />
                                    </FlexChild>
                                    <FlexChild>
                                        <Center alignItems={"flex-start"}>
                                            <Inline>
                                                <P color={"black"}>{viewData.title} {"( "}</P>
                                                <P color={"var(--main-color)"} weight={1000}>{viewData.totalCount || 0}</P>
                                                <P color={"black"}>{" )"}</P>
                                            </Inline>
                                        </Center>
                                    </FlexChild>
                                    {
                                        viewData.currentProcess === ShoppingProcessType.CART &&
                                        <FlexChild width={"initial"}>
                                            <div className={style.deleteAllButton} onClick={onDeleteSelectedProductsClick}>
                                                <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                                    <FlexChild width={"initial"}>
                                                        <Center>
                                                            <CIcon icon={cilTrash} size="lg" />
                                                        </Center>
                                                    </FlexChild>
                                                    <FlexChild width={"initial"}>
                                                        <Center>
                                                            <P size={14} textDecoration={"underline"}>{t("selectDelete")}</P>
                                                        </Center>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </div>
                                        </FlexChild>
                                    }

                                    <FlexChild width={20}></FlexChild>
                                </HorizontalFlex>
                            </Container>
                        </div>
                    </FixedHeader>
                </>
            }
            <Container backgroundColor={"white"}>
                {
                    !isMobile &&
                    <Container height={50} maxWidth={1200}>
                        <HorizontalFlex justifyContent={"flex-end"}>
                            {/* <FlexChild>
                                <P size={25} weight={1000}>{viewData.title}</P>
                            </FlexChild> */}
                            <FlexChild width={"max-content"} >
                                <HorizontalFlex gap={10} padding={"0 10px 0 0"}>
                                    {
                                        shoppingProcesses.map((process, index) =>
                                            <>
                                                <FlexChild width={30}>
                                                    <Center>
                                                        <img src={process.icon} width={"20px"} />
                                                        {/* <P size={18} color={process.orderNo === viewData.currentProcess ? "black" : "#949494"}>{`0${process.orderNo}`}</P> */}
                                                    </Center>
                                                </FlexChild>
                                                <FlexChild>
                                                    <div style={{ width: "100%" }}>
                                                        <Center>
                                                            <P whiteSpace size={"var(--font-size)"} color={process.orderNo === viewData.currentProcess ? "black" : "#949494"}>{process.title}</P>
                                                        </Center>
                                                    </div>
                                                </FlexChild>
                                                {
                                                    index < shoppingProcesses.length - 1 &&
                                                    <FlexChild width={"initial"}>
                                                        <FontAwesomeIcon color={"var(--font-faint-color)"} icon={fas["faAngleRight"]} fontSize={15} />
                                                    </FlexChild>
                                                }
                                            </>
                                        )
                                    }

                                </HorizontalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </Container>
                }

                <Container padding={isMobile ? 0 : 0}>
                    <VerticalFlex height={"initial"} gap={15}>
                        <FlexChild>
                            {
                                isMobile &&
                                <MypageContentHeader />
                            }
                        </FlexChild>
                        <FlexChild>
                            <div className={style.productWrap}>
                                <Outlet context={{ setViewData }} />
                            </div>
                        </FlexChild>
                        {
                            !isMobile &&
                            <>
                                {
                                    viewData.currentProcess === ShoppingProcessType.CART &&
                                    <FlexChild alignItems={"flex-end"} padding={"0px 20px"} >
                                        <div className={style.deleteAllButton} onClick={onDeleteSelectedProductsClick}>
                                            <HorizontalFlex justifyContent={"flex-start"} gap={10}>
                                                <FlexChild width={"initial"}>
                                                    <Center>
                                                        <CIcon icon={cilTrash} size="lg" />
                                                    </Center>
                                                </FlexChild>
                                                <FlexChild width={"initial"}>
                                                    <Center>
                                                        <P size={12}>{t("choice")}{t("delete")}</P>
                                                    </Center>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </div>
                                    </FlexChild>
                                }
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <AccordionWrapper style={accordionStyle}>
                                                <AccordionText height={230} header={
                                                    <Center width={"100%"} textAlign={"right"} padding={" 0 10px 0 0"}>
                                                        <Inline>
                                                            <P>{t("totalAmount")}</P>
                                                            <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(viewData.priceSum + (Math.floor(viewData.totalAmount * 0.1)) + viewData.deliveryFee)}</P>
                                                        </Inline>
                                                    </Center>
                                                } >
                                                    <FlexChild>
                                                        <div className={style.summaryWrap}>
                                                            <HorizontalFlex>
                                                                <FlexChild width={"initial"}>
                                                                    <VerticalFlex>
                                                                        <FlexChild>
                                                                            <VerticalFlex gap={5}>
                                                                                <FlexChild width={"initial"}>
                                                                                    <P color={"#666"} size={16}>{t("productAmountSum")}</P>
                                                                                </FlexChild>
                                                                                <FlexChild width={"initial"}>
                                                                                    <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(viewData.priceSum)}</P>
                                                                                </FlexChild>
                                                                            </VerticalFlex>
                                                                        </FlexChild>
                                                                        {/* {
                                                                            viewData.vat &&
                                                                            <FlexChild>
                                                                                <VerticalFlex gap={5}>
                                                                                    <FlexChild width={"initial"}>
                                                                                        <P color={"#666"} size={16}>{t("vat")}</P>
                                                                                    </FlexChild>
                                                                                    <FlexChild width={"initial"}>
                                                                                        <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{viewData.vat}</P>
                                                                                    </FlexChild>
                                                                                </VerticalFlex>
                                                                            </FlexChild>
                                                                        }
                                                                        {
                                                                            viewData.deliveryFee &&
                                                                            <FlexChild>
                                                                                <VerticalFlex gap={5}>
                                                                                    <FlexChild width={"initial"}>
                                                                                        <P color={"#666"} size={16}>{t("deliveryFee")}</P>
                                                                                    </FlexChild>
                                                                                    <FlexChild width={"initial"}>
                                                                                        <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{viewData.deliveryFee}</P>
                                                                                    </FlexChild>
                                                                                </VerticalFlex>
                                                                            </FlexChild>
                                                                        } */}
                                                                    </VerticalFlex>
                                                                </FlexChild>
                                                                <FlexChild width={20}>
                                                                    <CircleWrapper backgroundColor={"#c6c6c6"} borderColor={"#ddd"}>
                                                                        <div className={style.circle}>
                                                                            <FontAwesomeIcon size="xs" icon={fas["faPlus"]} color={"#eee"} />
                                                                            <div className={style.topMinusLine}></div>
                                                                            <div className={style.bottomMinusLine}></div>
                                                                        </div>
                                                                    </CircleWrapper>
                                                                </FlexChild>
                                                                <FlexChild width={"initial"}>
                                                                    <VerticalFlex gap={5}>
                                                                        <FlexChild>
                                                                            <HorizontalFlex>
                                                                                <FlexChild width={"initial"}>
                                                                                    <P color={"#666"} size={16}>{t("vat")}</P>
                                                                                </FlexChild>
                                                                                <FlexChild width={"initial"}>
                                                                                    <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(Math.floor(viewData.totalAmount * 0.1))}</P>
                                                                                </FlexChild>
                                                                            </HorizontalFlex>
                                                                        </FlexChild>
                                                                        <FlexChild>
                                                                            <HorizontalFlex>
                                                                                <FlexChild width={"initial"}>
                                                                                    <P color={"#666"} size={16}>{t("deliveryFee")}</P>
                                                                                </FlexChild>
                                                                                <FlexChild width={"initial"}>
                                                                                    <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(viewData.deliveryFee)}</P>
                                                                                </FlexChild>
                                                                            </HorizontalFlex>
                                                                        </FlexChild>
                                                                    </VerticalFlex>
                                                                </FlexChild>
                                                                <FlexChild width={20}>
                                                                    <CircleWrapper backgroundColor={"#c6c6c6"} borderColor={"#ddd"}>
                                                                        <div className={style.circle}>
                                                                            <FontAwesomeIcon size="xs" icon={fas["faPlus"]} color={"#eee"} />
                                                                            <div className={style.topMinusLine}></div>
                                                                            <div className={style.bottomMinusLine}></div>
                                                                        </div>
                                                                    </CircleWrapper>
                                                                </FlexChild>
                                                                <FlexChild width={"initial"}>
                                                                    <HorizontalFlex gap={15}>
                                                                        <FlexChild width={"initial"}>
                                                                            <P color={"#666"} size={16}>{t("totalAmount")}</P>
                                                                        </FlexChild>
                                                                        <FlexChild width={"initial"}>
                                                                            <P color={"#141414"} size={23} weight={1000}>&#8361;{addCommas(viewData.priceSum + (Math.floor(viewData.totalAmount * 0.1)) + viewData.deliveryFee)}</P>
                                                                        </FlexChild>
                                                                    </HorizontalFlex>
                                                                </FlexChild>
                                                            </HorizontalFlex>
                                                        </div>

                                                    </FlexChild>

                                                </AccordionText>
                                            </AccordionWrapper>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild width={300} padding={30}>
                                    <div className={style.purchaseButton} onClick={onSubmitButtonClick}>
                                        <Center>
                                            <P>{viewData.footterButtonText}</P>
                                            {/* <P>{`CHECKOUT ${selectedList ? selectedList.length : 0} item(s)`}</P> */}
                                        </Center>
                                    </div>
                                </FlexChild>
                            </>
                        }

                    </VerticalFlex>
                </Container>
            </Container >

            <Dummy height={"var(--footerHeight)"} />
            {
                isMobile &&

                <FixedFooter bottom={"30px"} height={100}>
                    <Footer />

                </FixedFooter>


            }

        </div >
    );
}

export default CartLayout;