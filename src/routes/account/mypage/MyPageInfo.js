import { faAngleRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./MyPageInfo.module.css"
import listData from "InitialData/accounts/listData.json"
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NiceModal from "@ebay/nice-modal-react";
import CardList from "layouts/wrapper/CardList";
import { useTranslation } from "react-i18next";
import noWishList from "resources/img/icons/noWishList.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Inline from "layouts/container/Inline";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import Center from "layouts/wrapper/Center";
import AccordionWrapper from "components/accordion/AccordionWrapper";
import AccordionText from "components/accordion/AccordionText";
import { requester } from "App";
import coupon from "resources/img/icons/coupon.png"
import point from "resources/img/icons/point.png"
import menu from "resources/img/icons/footer/menu.svg"
import { addCommas, getCurrentLanguageCode, removeLocalStorage } from "shared/utils/Utils";
import { AuthContext } from "providers/AuthProvider";
import CustomIcon from "components/icons/CustomIcon";
import BannerSwiper from "routes/front/main/BannerSwiper";
import slide2 from "resources/img/main/banner/mainBanner_1.png";
import slide3 from "resources/img/main/banner/mainBanner_2.png";
import WishCardList from "./wishList/WishCardList";

function MyPageInfo(props) {
    const [wishes, setWishes] = useState();
    const [isOrderList, setOrderList] = useState();
    const [mounted, setMounted] = useState(false);
    const [value, setValue] = useState();
    const [login, setLogin] = useState(false);
    const [lastThreeOrder, setLastThreeOrder] = useState();
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onTrackOrderClick = (index) => {
        navigate("trackOrder", { replace: true, state: index });
    }

    useEffect(() => {
        setMounted(true);
        if (userName) {
            requester.findCouponAndPoint((result) => {
                setValue(result.data);
            })
            requester.getOrderProducts((result) => {
                if (result.code === 0) {
                    setOrderList(result.data);
                    setLogin(true);
                }
            })
            requester.getProductWishes((result) => {
                setWishes(result.data.slice(0, 4));
            })
        } else {

        }
    }, [])
    useEffect(() => {
        if (mounted) {
            requester.findLastThreeOrder((result) => {
                setLastThreeOrder(result.data);
            })
        }

    }, [mounted])

    useEffect(() => {
        console.log(lastThreeOrder)
    }, [lastThreeOrder])

    const OrderInfo = (props) => {
        return (
            <VerticalFlex gap={10}>
                <FlexChild>
                    <P cursor={props.cursor} weight={"bold"} color={props.color ? props.color : "var(--font-faint-color)"} size={isMobile ? "20pt" : "24pt"}>{props.value}</P>
                </FlexChild>
                <FlexChild>
                    <P color={"var(--font-color)"} size={isMobile ? "11pt" : ""}>{props.text}</P>
                </FlexChild>
            </VerticalFlex>
        );
    }
    const VerticalLine = () => {
        return (
            <FlexChild padding={isMobile ? "10px 0 0 0" : ""} width={"max-content"} justifyContent={"center"}>
                <div className={isMobile ? style.mobileVerticalLine : style.verticalLine}></div>
            </FlexChild>
        );
    }
    const HorizontalLine = () => {
        return (
            <FlexChild>
                <div className={isMobile ? style.mobileHorizontalLine : style.horizontalLine}></div>
            </FlexChild>
        );
    }

    const formatDate = (dateString) => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dayOfWeek = days[date.getDay()];

        return `${year}.${month}.${day}(${dayOfWeek})`;
    }

    return (
        <Container>
            <Container backgroundColor={isMobile ? "" : "white"} maxWidth={1000}>
                {
                    isMobile ?
                        <VerticalFlex>
                            <FlexChild>
                                <VerticalFlex gap={25}>
                                    <FlexChild padding={"20px 15px 85px 15px"} backgroundColor={" var(--main-color)"}>
                                        <div className={style.wrap}>
                                            <VerticalFlex gap={30}>
                                                <FlexChild>
                                                    <HorizontalFlex gap={20}>
                                                        <FlexChild width={"max-content"}>
                                                            <CustomIcon name={"myPageUser"} color={"white"} width={50} />
                                                        </FlexChild>
                                                        <FlexChild>
                                                            {userName ?
                                                                <Center width={"100%"} textAlign={"left"}>
                                                                    <P size={"14pt"} color={"white"} weight={"bold"}>WELCOME&nbsp;</P>
                                                                    <P size={"13pt"} color={"white"} weight={"bold"}>{userName}&nbsp;</P>
                                                                </Center>
                                                                :
                                                                <Center width={"100%"} textAlign={"left"}>
                                                                    <div className={style.userWelcome}>
                                                                        <P size={"16pt"} weight={"bold"}> {t("pleaseLogin")}</P>
                                                                    </div>
                                                                </Center>
                                                            }
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                                <FlexChild>
                                                    <div className={style.mypageBar}>
                                                        <HorizontalFlex>
                                                            <FlexChild>
                                                                <VerticalFlex gap={10}>
                                                                    <FlexChild>
                                                                        <div className={style.iconWrap}>
                                                                            <NavLink to={"/mypage/trackOrder"}>
                                                                                <CustomIcon name={"myPageShipping"} color={"white"} width={30} />
                                                                                <div className={style.count}>
                                                                                    <P size={9}>{isOrderList ? isOrderList.length : "0"}</P>
                                                                                </div>
                                                                            </NavLink>
                                                                        </div>
                                                                    </FlexChild>
                                                                    <FlexChild>
                                                                        <P weight={"bold"}>{t("trackOrder")}</P>
                                                                    </FlexChild>
                                                                </VerticalFlex>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <VerticalFlex gap={10}>
                                                                    <FlexChild>
                                                                        <div className={style.iconWrap}>
                                                                            <NavLink to={"/mypage/review"}>
                                                                                <CustomIcon name={"myPageReview"} color={"white"} width={30} />
                                                                                <div className={style.count}>
                                                                                    <P size={9}>{"0"}</P>
                                                                                </div>
                                                                            </NavLink>
                                                                        </div>
                                                                    </FlexChild>
                                                                    <FlexChild>
                                                                        <P weight={"bold"}>{t("리뷰관리")}</P>
                                                                    </FlexChild>
                                                                </VerticalFlex>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <VerticalFlex gap={10}>
                                                                    <FlexChild>
                                                                        <NavLink to={"/mypage/point"}>
                                                                            <CustomIcon name={"myPagePoint"} color={"white"} width={30} />
                                                                        </NavLink>
                                                                    </FlexChild>
                                                                    <FlexChild>
                                                                        <P weight={"bold"}>{t("point")}</P>
                                                                    </FlexChild>
                                                                </VerticalFlex>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <VerticalFlex gap={10}>
                                                                    <FlexChild>
                                                                        <CustomIcon name={"myPagePayment"} color={"white"} width={30} />
                                                                    </FlexChild>
                                                                    <FlexChild>
                                                                        <P weight={"bold"}>{t("결제수단")}</P>
                                                                    </FlexChild>
                                                                </VerticalFlex>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </div>
                                                </FlexChild>

                                            </VerticalFlex>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <VerticalFlex gap={10}>
                                            <FlexChild alignItems={"flex-start"} padding={"10px 20px"}>
                                                <Inline>
                                                    <P weight={"bold"}>{t("orderHistory")} </P>
                                                    <P color={"#999"}>{t("최근 3건 표시")}</P>
                                                </Inline>
                                            </FlexChild>
                                            {
                                                lastThreeOrder &&
                                                lastThreeOrder.map((data, index) =>
                                                    <FlexChild padding={"0px 10px"}>
                                                        <div className={style.horizontalCardWrap}>
                                                            <VerticalFlex gap={5}>
                                                                <FlexChild alignItems={"flex-start"}>
                                                                    <P weight={"bold"} color={"#999"}>{formatDate(data.createDateTime)}</P>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <HorizontalFlex gap={15}>
                                                                        <FlexChild width={"max-content"}>
                                                                            <img width={"90px"} src={data.orderProducts[0].product.image} />
                                                                        </FlexChild>
                                                                        <FlexChild>
                                                                            <VerticalFlex flexStart gap={5}>
                                                                                <FlexChild>
                                                                                    <HorizontalFlex>
                                                                                        <FlexChild>
                                                                                            <P weight={"bold"} color={"var(--main-color)"}>{t(data.status)}</P>
                                                                                        </FlexChild>
                                                                                        {/* <FlexChild justifyContent={"flex-end"}>
                                                                                            <FontAwesomeIcon fontSize={13} icon={faAngleRight} color={"#999"} />
                                                                                        </FlexChild> */}
                                                                                    </HorizontalFlex>
                                                                                </FlexChild>
                                                                                <FlexChild>
                                                                                    <P>{data.orderProducts[0].product.brandTitle}</P>
                                                                                </FlexChild>
                                                                                <FlexChild>
                                                                                    <HorizontalFlex>
                                                                                        <FlexChild>
                                                                                            <P>{data.orderProducts[0].product.title} {t("other")} {data.orderProducts.length - 1} {t("cases")}</P>
                                                                                        </FlexChild>

                                                                                    </HorizontalFlex>
                                                                                </FlexChild>
                                                                                <FlexChild alignItems={"flex-end"} justifyContent={"flex-end"}>
                                                                                    <P weight={"bold"} color={"var(--main-color)"}>&#8361;{addCommas(data.amount)}</P>
                                                                                </FlexChild>
                                                                            </VerticalFlex>
                                                                        </FlexChild>
                                                                    </HorizontalFlex>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </div>
                                                    </FlexChild>
                                                )
                                            }
                                        </VerticalFlex>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                            {listData && listData.map((data, index) => (
                                <>
                                    <FlexChild key={index} padding={"30px 10px"}>
                                        {
                                            data.blocks && data.blocks.map((block, index) => (
                                                <div className={style.padding} key={index}>
                                                    {
                                                        block.contents && block.contents.map((row, index) => (
                                                            <NavLink to={row.to ? row.to : ""}>
                                                                <HorizontalFlex padding={"5px"} gap={10}>
                                                                    <FlexChild width={"max-content"}>
                                                                        <CustomIcon name={row.icon} color={"white"} width={25} />
                                                                    </FlexChild>
                                                                    <FlexChild>
                                                                        <P padding={"3px"} size={"13pt"}>
                                                                            {t(row.row)}
                                                                        </P>
                                                                    </FlexChild>
                                                                </HorizontalFlex>
                                                            </NavLink>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        }
                                    </FlexChild>
                                    <HorizontalLine />
                                </>
                            ))
                            }



                        </VerticalFlex>
                        :
                        <VerticalFlex padding={"0 0 0 10px"} width={"100%"}>
                            <FlexChild >
                                <VerticalFlex>
                                    <FlexChild padding={"20px 0 0 0"}>
                                        <div className={style.titleWrap}>
                                            <HorizontalFlex>
                                                <FlexChild>
                                                    <P size={"16pt"} weight={"bold"} padding={"5px"}>{t("order")}/{t("delivery")}</P>
                                                </FlexChild>
                                                <FlexChild justifyContent={"flex-end"} padding={"0 10px 0 0 "}>
                                                    <Link to="trackOrder">
                                                        <Inline>
                                                            <P size={"12pt"} color={"var( --font-color-disabled)"}>{t("more")}</P>
                                                            &nbsp;
                                                            <FontAwesomeIcon size="sm" icon={faChevronRight} color={"var( --font-color-disabled)"} />
                                                        </Inline>
                                                    </Link>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        {
                                            userName ?
                                                <div className={style.deliveryWrap}>
                                                    <HorizontalFlex padding={"15px 0"} flexStart>
                                                        <FlexChild justifyContent={"center"}>
                                                            <OrderInfo index={2} onClick={onTrackOrderClick} color={isOrderList && isOrderList.length > 0 ? "var(--main-color)" : ""} value={isOrderList ? isOrderList.length : "0"} text={t("orderComplete")} />
                                                        </FlexChild>
                                                        <VerticalLine />
                                                        <FlexChild justifyContent={"center"}>
                                                            <OrderInfo index={1} value={"0"} text={t("readyToShip")} />
                                                        </FlexChild>
                                                        <VerticalLine />
                                                        <FlexChild justifyContent={"center"}>
                                                            <OrderInfo index={0} value={"0"} text={t("shipping")} />
                                                        </FlexChild>
                                                        <VerticalLine />
                                                        <FlexChild justifyContent={"center"}>
                                                            <OrderInfo index={3} value={"0"} text={t("deliveryComplete")} />
                                                        </FlexChild>
                                                        <VerticalLine />
                                                        <FlexChild justifyContent={"center"}>
                                                            <OrderInfo index={4} value={"0"} text={t("cancel/dispute")} />
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </div>
                                                :
                                                <div className={style.deliveryWrap}>
                                                    <HorizontalFlex padding={"15px 0"} flexStart>
                                                        <FlexChild justifyContent={"center"} width={"initial"}>
                                                            <OrderInfo index={0} value={"-"} text={t("orderComplete")} />
                                                        </FlexChild>
                                                        <VerticalLine />
                                                        <FlexChild width={"initial"}>
                                                            <OrderInfo index={1} value={"-"} text={t("readyToShip")} />
                                                        </FlexChild>
                                                        <VerticalLine />
                                                        <FlexChild width={"initial"}>
                                                            <OrderInfo index={2} value={"-"} text={t("shipping")} />
                                                        </FlexChild>
                                                        <VerticalLine />
                                                        <FlexChild width={"initial"}>
                                                            <OrderInfo index={3} value={"-"} text={t("deliveryComplete")} />
                                                        </FlexChild>
                                                        <VerticalLine />
                                                        <FlexChild width={"initial"}>
                                                            <OrderInfo index={4} value={"-"} text={t("cancel/dispute")} />
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </div>
                                        }
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                            <FlexChild >
                                <VerticalFlex>
                                    <FlexChild padding={"20px 0 0 0"}>
                                        <div className={style.wrap}>
                                            <HorizontalFlex>
                                                <FlexChild>
                                                    <P size={"16pt"} weight={"bold"} padding={"5px"}>{t("wishList")}</P>
                                                </FlexChild>
                                                <FlexChild justifyContent={"flex-end"} padding={"0 10px 0 0 "}>
                                                    <Link to="wishList">
                                                        <Inline>
                                                            <P size={"12pt"} color={"var( --font-color-disabled)"}>{t("more")}</P>
                                                            &nbsp;
                                                            <FontAwesomeIcon size="lg" icon={faChevronRight} color={"var( --font-color-disabled)"} />
                                                        </Inline>
                                                    </Link>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </div>
                                    </FlexChild>
                                    <HorizontalLine />
                                </VerticalFlex>
                                <WishCardList />
                                {/* {wishes ? <CardList data={wishes} template={"wish"} /> : null} */}
                            </FlexChild>
                            <FlexChild height={"initial"}>
                                <VerticalFlex height={"initial"} flexStart>
                                    {/* <FlexChild padding={"20px 0 0 0"}>
                                    <div className={style.wrap}>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <P size={"16pt"} weight={"bold"} padding={"5px"}>{t("relatedProducts")}</P>
                                            </FlexChild>
                                            <FlexChild justifyContent={"flex-end"} padding={"0 10px 0 0 "}>
                                                <Link to="wishList">
                                                    <Inline>
                                                        <P size={"12pt"} color={"var( --font-color-disabled)"}>{t("more")}</P>
                                                        &nbsp;
                                                        <FontAwesomeIcon size="lg" icon={faChevronRight} color={"var( --font-color-disabled)"} />
                                                    </Inline>
                                                </Link>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                    <HorizontalLine />
                                </FlexChild> */}
                                    <FlexChild>
                                        {/* <BannerSwiper slides={[slide2, slide3]} /> */}
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </VerticalFlex>
                }
            </Container >
        </Container >
    );
}

export default MyPageInfo;