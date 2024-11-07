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
import style from "./ShoppingLayout.module.css";
import addCart from "resources/img/icons/mypage/addCart.svg";
import order from "resources/img/icons/mypage/order.svg";
import checkMark from "resources/img/icons/mypage/checkMark.svg";

function ShoppingLayout() {
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
    const shoppingProcesses = [
        { orderNo: ShoppingProcessType.CART, title: t("cart"), icon: addCart },
        { orderNo: ShoppingProcessType.ORDER, title: t("orderHistory"), icon: order },
        { orderNo: ShoppingProcessType.ORDER_COMPLETE, title: t("orderComplete"), icon: checkMark },
    ];

    const onDeleteSelectedProductsClick = () => {
        if (viewData && viewData.onDeleteSelectedProductsClick) {
            viewData.onDeleteSelectedProductsClick();
        }
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
                    <Container height={110} maxWidth={1200} padding={50} borderBottom={"1px solid #ddd"}>
                        <HorizontalFlex>
                            <FlexChild>
                                <P size={25} weight={1000}>{viewData.title}</P>
                            </FlexChild>
                            <FlexChild width={"initial"}>
                                <HorizontalFlex gap={20}>
                                    {
                                        shoppingProcesses.map((process, index) => {
                                            return (
                                                <FlexChild>
                                                    <HorizontalFlex gap={20}>
                                                        <FlexChild>
                                                            <HorizontalFlex gap={10}>
                                                                <FlexChild width={"initial"}>
                                                                    <Center>
                                                                        <img src={process.icon} width={process.orderNo === viewData.currentProcess ? 25 : 20}/>
                                                                        {/* <P size={18} color={process.orderNo === viewData.currentProcess ? "black" : "#949494"}>{`0${process.orderNo}`}</P> */}
                                                                    </Center>
                                                                </FlexChild>
                                                                <FlexChild width={"initial"}>
                                                                    <div style={{ width: "70px" }}>
                                                                        <Center>
                                                                            <P size={18} color={process.orderNo === viewData.currentProcess ? "black" : "#949494"} weight={process.orderNo === viewData.currentProcess ? 800 : 100}>{process.title}</P>
                                                                        </Center>
                                                                    </div>
                                                                </FlexChild>
                                                            </HorizontalFlex>
                                                        </FlexChild>
                                                        {
                                                            index < shoppingProcesses.length - 1 &&
                                                            <FlexChild width={"initial"}>
                                                                <FontAwesomeIcon icon={fas["faAngleRight"]} fontSize={15} />
                                                            </FlexChild>
                                                        }
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            );
                                        })
                                    }

                                </HorizontalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </Container>
                }

                <Container maxWidth={1200} padding={isMobile ? 0 : 30}>
                    <VerticalFlex height={"initial"} gap={15}>
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
                                {/* <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <AccordionWrapper style={accordionStyle}>
                                                <AccordionText height={230} header={
                                                    <Center width={"100%"} textAlign={"right"} padding={" 0 10px 0 0"}>
                                                        <Inline>
                                                            <P>총 주문 금액</P>
                                                            <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{viewData.totalAmount}</P>
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
                                                                                    <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{viewData.priceSum}</P>
                                                                                </FlexChild>
                                                                            </VerticalFlex>
                                                                        </FlexChild>
                                                                        {
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
                                                                        }
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
                                                                        <FlexChild width={"initial"}>
                                                                            <P color={"#666"} size={16}>{t("discount")}</P>
                                                                        </FlexChild>
                                                                        <FlexChild width={"initial"}>
                                                                            <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{0}</P>
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
                                                                            <P color={"#141414"} size={23} weight={1000}>&#8361;{viewData.totalAmount}</P>
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
                                </FlexChild> */}
                                {/* <FlexChild width={300} padding={30}>
                                    <div className={style.purchaseButton} onClick={onSubmitButtonClick}>
                                        <Center>
                                            <P>{viewData.footterButtonText}</P>
                                             <P>{`CHECKOUT ${selectedList ? selectedList.length : 0} item(s)`}</P>
                                        </Center>
                                    </div>
                                </FlexChild> */}
                            </>
                        }

                    </VerticalFlex>
                </Container>
            </Container >

            <Dummy height={"var(--footerHeight)"} />
            {/* {
                isMobile &&

                <FixedFooter bottom={0} height={100}>
                    <Footer />

                </FixedFooter>


            } */}

        </div >
    );
}

export default ShoppingLayout;