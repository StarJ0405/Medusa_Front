import { faAngleRight, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./OrderListLayout.module.css"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { requester } from "App";
import NiceModal from "@ebay/nice-modal-react";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import MobileWishListRow from "routes/mobile/wishList/MobileWishListRow";
import CardList from "layouts/wrapper/CardList";
import { useTranslation } from "react-i18next";
import crown from "resources/img/icons/crown.png";
import noWishList from "resources/img/icons/noWishList.png";
import WishCard from "components/card/wish/WishCard";
import { Link } from "react-router-dom";
import Inline from "layouts/container/Inline";

function OrderListLayout () {
    
    const [wishes, setWishes] = useState();
    const [isWishProducts, setWishProducts] = useState();

    const { t } = useTranslation();
    const { products } = useSelector((state) => ({
        products: state.wish.products,
    }));

    useEffect(() => {
        if (products) {
            
            setWishes(products.slice(0, 4));
        }

    }, [products]);

    return(
        <Container backgroundColor={"white"} padding={"0  0 0 20px"}>
            <VerticalFlex>
                <FlexChild >
                    <VerticalFlex>
                        <FlexChild padding={"20px 0 0 0"}>
                            <div className={style.wrap}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <P size={"16pt"} weight={"bold"} padding={"5px"}>주문배송조회</P>
                                    </FlexChild>
                                    <FlexChild justifyContent={"flex-end"} padding={"0 10px 0 0 "}>
                                        <Link to="wishList">
                                            <Inline>
                                                <P size={"12pt"} color={"var( --font-color-disabled)"}>더보기</P>
                                                &nbsp;
                                                <FontAwesomeIcon size="lg" icon={faChevronRight} color={"var( --font-color-disabled)"} />
                                            </Inline>
                                        </Link>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.deliveryWrap}>
                                <HorizontalFlex>
                                    <FlexChild justifyContent={"center"}>
                                        <VerticalFlex>
                                            <FlexChild>
                                                <P size={"44pt"}>0</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>구매완료</P>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                    <FlexChild justifyContent={"center"}>
                                        <VerticalFlex>
                                            <FlexChild>
                                                <P size={"44pt"}>0</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>배송준비</P>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                    <FlexChild justifyContent={"center"}>
                                        <VerticalFlex>
                                            <FlexChild>
                                                <P size={"44pt"} color={"var(--main-color)"}>2</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>배송중</P>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                    <FlexChild justifyContent={"center"}>
                                        <VerticalFlex>
                                            <FlexChild>
                                                <P size={"44pt"}>0</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>배송완료</P>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                    <FlexChild justifyContent={"center"}>
                                        <VerticalFlex>
                                            <FlexChild>
                                                <P size={"44pt"}>0</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <P>취소/환불</P>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
                <FlexChild>
                    <VerticalFlex>
                        <FlexChild padding={"20px 0 0 0"}>
                            <div className={style.wrap}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <P size={"16pt"} weight={"bold"} padding={"5px"}>위시리스트</P>
                                    </FlexChild>
                                    <FlexChild justifyContent={"flex-end"} padding={"0 10px 0 0 "}>
                                        <Link to="wishList">
                                            <Inline>
                                                <P size={"12pt"} color={"var( --font-color-disabled)"}>더보기</P>
                                                &nbsp;
                                                <FontAwesomeIcon size="lg" icon={faChevronRight} color={"var( --font-color-disabled)"} />
                                            </Inline>
                                        </Link>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                    </VerticalFlex>
                    {wishes ? <CardList data={wishes} template={"wish"} /> : null}



                </FlexChild>
                <FlexChild>
                    <VerticalFlex>
                        <FlexChild padding={"20px 0 0 0"}>
                            <div className={style.wrap}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <P size={"16pt"} weight={"bold"} padding={"5px"}>연관상품</P>
                                    </FlexChild>
                                    <FlexChild justifyContent={"flex-end"} padding={"0 10px 0 0 "}>
                                        <Link to="wishList">
                                            <Inline>
                                                <P size={"12pt"} color={"var( --font-color-disabled)"}>더보기</P>
                                                &nbsp;
                                                <FontAwesomeIcon size="lg" icon={faChevronRight} color={"var( --font-color-disabled)"} />
                                            </Inline>
                                        </Link>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.imgWrap}>
                                <img src={noWishList} />
                            </div>
                            <P padding={15} color={"var(--font-color-disabled)"}>등록된 위시리스트가 없습니다.</P>

                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
            </VerticalFlex>
        </Container>
    );
}

export default OrderListLayout;