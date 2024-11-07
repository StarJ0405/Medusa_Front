import NiceModal from "@ebay/nice-modal-react";
import { requester } from "App";
import clsx from "clsx";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import QuillViewer from "components/inputs/richEditor/QuillViewer";
import P from "components/P";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import Container from "layouts/container/Container";
import FixedFooter from "layouts/container/FixedFooter";
import Inline from "layouts/container/Inline";
import Flex from "layouts/flex/Flex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import StickySlideTab from "layouts/view/StickySlideTab";
import StickySlideTabChild from "layouts/view/StickySlideTabChild";
import Center from "layouts/wrapper/Center";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import { AuthContext } from "providers/AuthProvider";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import { OrderInfoReducer } from "shared/redux/reducers/shopping/OrderInfoReducer";
import { addCommas, clone, decode } from "shared/utils/Utils";
import style from "./ProductDetail.module.scss";
import ProductDetailOrderSummary from "./ProductDetailOrderSummary";
import ProductInfo from "./ProductInfo";
import { useLocation } from 'react-router-dom';
function ProductDetail() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const { id } = useParams();
    const [product, setProduct] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        let searchCondition = clone(initialSearchCondition);
        searchCondition.productId = id;
        requester.searchProducts(searchCondition, (result) => {
            let productData = result.data[0];
            let encodedContent = productData.content;
            if (encodedContent && encodedContent.length > 0) {
                let decodedContent = decode(encodedContent);
                productData.content = decodedContent;
            }
            setProduct(productData);
        });
    }, []);

    const onAddCartClick = () => {
        let quantity = 1;
        let data = { productId: product.id, quantity: quantity };
        requester.addCart(data, (result) => {
            if (result.code === 0) {
                dispatch(CartReducer.actions.refreshCart(result.data));
                toast.success(t("putInAShoppingCart"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            } else if (result.code === 401) {
                NiceModal.show("memberSignIn");
            }
        });
    }

    const onPurchaseClick = () => {
        let quantity = 1;
        let data = { product: product, quantity: quantity };
        let orderProductList = [];
        orderProductList.push(data);
        dispatch(OrderInfoReducer.actions.refreshOrderProducts(orderProductList));
        navigate("/shopping/orderSummary");
    }

    const GiftSticker = () => {
        return (
            <>
                {
                    product.gift &&
                    <div style={{ width: 50, height: 50, position: "absolute", top: 0, right: 0, zIndex: 100, backgroundColor: "#0a8fff", borderRadius: "100%", padding: "5px 10px" }}>
                        <Center>
                            <P weight={800} color={"white"}>{`${product.giftStandard} + ${product.gift}`}</P>
                        </Center>
                    </div>
                }
            </>
        );
    }
    return (
        <Container maxWidth={1500}>
            <div className={style.wrap}>
                {
                    product &&
                    <div className={style.summaryContainer}>
                        <VerticalFlex gap={10}>
                            <FlexChild>
                                <Container maxWidth={1200}>
                                    <Flex direction={isMobile ? "vertical" : "horizontal"} gap={30}>
                                        <FlexChild width={isMobile ? null : 400}>
                                            <SquareWrapper>
                                                <GiftSticker />
                                                <img src={product.image} style={{ width: "100%" }} />
                                                {/* <ProductThumbnailSwiper data={product.thumbnails} /> */}
                                            </SquareWrapper>
                                        </FlexChild>
                                        <FlexChild padding={10} >
                                            <VerticalFlex gap={10} >
                                                <FlexChild padding={"10px 0px 0px 0px"}>
                                                    <Center width={"100%"} textAlign={isMobile ? "center" : "left"}>
                                                        <P size={20} color={"#222"}>{product.brandTitle}</P>
                                                        <P size={16} color={"#222"}> {product.title}</P>
                                                    </Center>
                                                </FlexChild>
                                                <FlexChild>
                                                    <Center width={"100%"} textAlign={isMobile ? "center" : "left"}>
                                                        <P size={13} color={"lightgray"}>{product.hashTag}</P>
                                                    </Center>
                                                </FlexChild>
                                                {/* <FlexChild>
                                                <Inline>
                                                    <P color={"var(--main-color)"} weight={"500"} size={20} verticalAlign={"bottom"}>{"★★★★"}</P>
                                                    <P color={"#6f6f6f"} weight={"500"} size={20} verticalAlign={"bottom"}>{"★"}</P>
                                                    <P size={20}>{" 4.7   "}</P>
                                                    <P size={15} color={"#6f6f6f"} textDecoration={"underline"}>{"(49 reviews)"}</P>
                                                </Inline>
                                            </FlexChild> */}
                                                <FlexChild>
                                                    <HorizontalFlex justifyContent={"flex-start"} gap={20}>
                                                        <FlexChild width={isMobile ? null : "initial"}>
                                                            <Center width={"100%"} textAlign={isMobile ? "center" : "left"}>
                                                                <P size={25} weight={1000} color={product.currentPrice ? "gray" : "var(--main-color)"} textDecoration={product.currentPrice && "line-through"}>&#8361;{userName ? addCommas(product.price) : "-"}</P>
                                                            </Center>
                                                        </FlexChild>
                                                        <FlexChild width={"initial"}>
                                                            {
                                                                product.currentPrice && userName &&
                                                                <Inline>
                                                                    <P size={25} color={"red"} weight={"bold"}>-{100 - product.currentPrice / product.price * 100}%</P>
                                                                </Inline>
                                                            }
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex justifyContent={"flex-start"} gap={20}>
                                                        <FlexChild width={isMobile ? null : "initial"}>
                                                            <Center width={"100%"} textAlign={isMobile ? "center" : "left"}>
                                                                {
                                                                    product.currentPrice
                                                                        ? <P textAlign={"right"} size={25} weight={"bold"} color={"var(--main-color)"}>&#8361; {userName ? addCommas(product.currentPrice) : "-"}</P>
                                                                        : <P textAlign={"right"} size={25} weight={"bold"} color={"var(--main-color)"}>{" "}</P>
                                                                }
                                                            </Center>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            </VerticalFlex>
                                        </FlexChild>
                                    </Flex>
                                </Container>
                            </FlexChild>
                            <FlexChild>
                                <StickySlideTab height={isMobile ? 40 : 50}>
                                    <StickySlideTabChild id={"productDetail_info"} title={t("product") + t("synopsis")}>
                                        <PaddingWrapper padding={"0px 10px"}>
                                            <ProductInfo data={product} />
                                        </PaddingWrapper>
                                    </StickySlideTabChild>
                                    <StickySlideTabChild id={"brand_info"} title={t("brand") + t("info")}>
                                        <PaddingWrapper padding={"0px 10px"}>
                                            <Container maxWidth={720}>
                                                <img src={product.brandImage} style={{ width: "100%" }} />
                                            </Container>
                                        </PaddingWrapper>
                                    </StickySlideTabChild>
                                    <StickySlideTabChild id={"productDetail_detail"} title={t("detailInfo")}>
                                        <PaddingWrapper padding={"0px 10px"}>
                                            <Container maxWidth={720}>
                                                <QuillViewer value={product.content} />
                                            </Container>
                                        </PaddingWrapper>
                                    </StickySlideTabChild>
                                    {/* {
                                        !isMobile &&
                                        <StickySlideTabChild id={"productDetail_qna"} render={
                                            <div>
                                                <HorizontalFlex gap={5}>
                                                    <FlexChild>
                                                        <PaddingWrapper padding={"0px 0px"}>
                                                            <ButtonEclipse text={t("buyNow")} onClick={onPurchaseClick} height={40} borderRadius={5} backgroundColor={"white"} fontWeight={"bold"} color={"var(--main-color)"} border={"2px solid var(--main-color)"} />
                                                        </PaddingWrapper>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <PaddingWrapper padding={"0px 0px"}>
                                                            <ButtonEclipse text={t("cart")} onClick={onAddCartClick} height={40} borderRadius={5} backgroundColor={"var(--main-color)"} fontWeight={"bold"} border={"2px solid var(--main-color)"} />
                                                        </PaddingWrapper>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </div>
                                        }>
                                            <PaddingWrapper padding={"0px 10px"}>
                                                <Container maxWidth={720}>
                                                    <HorizontalFlex gap={5}>
                                                        <FlexChild>
                                                            <PaddingWrapper padding={"0px 0px"}>
                                                                <ButtonEclipse text={t("buyNow")} onClick={onPurchaseClick} height={50} borderRadius={5} backgroundColor={"white"} fontWeight={"bold"} color={"var(--main-color)"} border={"2px solid var(--main-color)"} />
                                                            </PaddingWrapper>
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <PaddingWrapper padding={"0px 0px"}>
                                                                <ButtonEclipse text={t("cart")} onClick={onAddCartClick} height={50} borderRadius={5} backgroundColor={"var(--main-color)"} fontWeight={"bold"} border={"2px solid var(--main-color)"} />
                                                            </PaddingWrapper>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </Container>
                                            </PaddingWrapper>
                                        </StickySlideTabChild>
                                    } */}

                                    {/* <StickySlideTabChild id={"productDetail_review"} title={t("client") + t("review")}>
                                    <PaddingWrapper padding={"0px 10px"}>
                                        <ProductReview productId={id} />
                                    </PaddingWrapper>
                                </StickySlideTabChild>
                                <StickySlideTabChild id={"productDetail_qna"} title={t("questions")}>
                                    <PaddingWrapper padding={"0px 10px"}>
                                        <Questions productId={id} />
                                    </PaddingWrapper>
                                </StickySlideTabChild> */}
                                </StickySlideTab>
                            </FlexChild>
                        </VerticalFlex>

                    </div>
                }
                {
                    isMobile ?
                        <FixedFooter height={60} maxWidth={1200}>
                            <div className={clsx(style.footer, { [style.mobile]: isMobile })}>
                                <HorizontalFlex gap={5}>
                                    {!isMobile && <FlexChild></FlexChild>}
                                    {!isMobile && <FlexChild></FlexChild>}
                                    {!isMobile && <FlexChild></FlexChild>}
                                    <FlexChild>
                                        <PaddingWrapper padding={"0px 0px"}>
                                            <ButtonEclipse text={t("buyNow")} onClick={onPurchaseClick} height={40} borderRadius={5} backgroundColor={"white"} fontWeight={"bold"} color={"var(--main-color)"} border={"2px solid var(--main-color)"} />
                                        </PaddingWrapper>
                                    </FlexChild>
                                    <FlexChild>
                                        <PaddingWrapper padding={"0px 0px"}>
                                            <ButtonEclipse text={t("cart")} onClick={onAddCartClick} height={40} borderRadius={5} backgroundColor={"var(--main-color)"} fontWeight={"bold"} border={"2px solid var(--main-color)"} />
                                        </PaddingWrapper>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </FixedFooter>
                        :
                        <div className={style.sidePanel}>
                            {
                                userName &&
                                <ProductDetailOrderSummary product={product} />
                            }
                        </div>
                }
            </div>
        </Container>
    );
}

export default ProductDetail;