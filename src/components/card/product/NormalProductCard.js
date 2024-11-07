
import NiceModal from "@ebay/nice-modal-react";
import { requester } from "App";
import clsx from "classnames";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import SkeletonImage from "components/skeleton/SkeletonImage";
import SkeletonText from "components/skeleton/SkeletonText";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import { addCommas } from "shared/utils/Utils";
import style from "./NormalProductCard.module.scss";
import { AuthContext } from 'providers/AuthProvider'

function NormalProductCard(props) {
    const { data, type, skeleton } = props;
    const { userName } = useContext(AuthContext);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [wish, setWish] = useState(false);
    const dispatch = useDispatch();
    const { products } = useSelector((state) => ({ products: state.wish.products }));

    const onProductClick = () => {
        navigate(`/product/detail/${data.id}`);
    }
    const addCartButtonClick = (e) => {
        e.stopPropagation();
        NiceModal.show("addCartCount", { product: data });
    }
    const wishButtonClick = (e) => {
        e.stopPropagation();
        let wishProductData = { productId: data.id, wishYn: !wish };
        requester.updateProductWish(wishProductData, (result) => {
            if (result.code === 401) {
                toast.error(t("로그인하세요."), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
            else if (result.code === 0) {
                dispatch(WishReducer.actions.refreshProducts(result.data));
            }
        })
    }

    const GiftSticker = () => {
        return (
            <>
                {
                    data.gift &&
                    <div style={{ width: 50, height: 50, position: "absolute", top: 0, right: 0, zIndex: 100, backgroundColor: "#0a8fff", borderRadius: "100%", padding: "5px 10px" }}>
                        <Center>
                            <P weight={800} color={"white"}>{`${data.giftStandard} + ${data.gift}`}</P>
                        </Center>
                    </div>
                }
            </>
        );
    }

    useEffect(() => {
        if (products && data) {
            let wishYn = false;

            products.map((wish) => {
                if (wish.productId === data.id && wish.userId) {
                    wishYn = wish.wishYn;
                }
            })
            setWish(wishYn);
        }
    }, [products]);

    useEffect(() => {
        if (products && data) {
            let wishYn = false;

            products.map((wish) => {
                if (wish.productId === data.id && wish.userId) {
                    wishYn = wish.wishYn;
                }
            })
            setWish(wishYn);
        }
    }, [data]);

    return (
        <div className={style.wrap} onClick={onProductClick}>
            <VerticalFlex>
                <FlexChild borderBottomRightRadius={"0"}>
                    {
                        skeleton ?
                            <div className={style.thumbnail} style={{ backgroundColor: "#ebebeb" }}>
                                <SquareWrapper>
                                    {
                                        skeleton ? <SkeletonImage width={100} />
                                            : <img className={style.image} src={data.thumbnail} alt={""} />
                                    }
                                </SquareWrapper>
                            </div>
                            :
                            <div className={style.thumbnail} style={{ backgroundColor: `${data.bgColor}11` }}>
                                <GiftSticker />
                                <SquareWrapper>
                                    {
                                        props.rank &&
                                        <div className={style.indexCircle}>{props.rank}</div>
                                    }
                                    <img className={style.image} src={data.thumbnail} alt={""} />
                                </SquareWrapper>
                            </div>
                    }
                </FlexChild >
                <FlexChild height={"fit-content"} backgroundColor={"white"}>
                    <div className={style.buttonWrap}>
                        <div onClick={wishButtonClick} className={clsx(style.button, style.wishButton)}>
                            <button className={clsx(style.heart, { [style.active]: wish })}>
                                <div className={style.heartFlip}></div>
                            </button>
                            {/* {
                                wish ?
                                    <CustomIcon name={"heartFill"} width={17} color={"var(--main-color)"} />
                                    : <CustomIcon name={"heart"} width={17} color={"#282828"} />
                            } */}
                        </div>
                        <div onClick={addCartButtonClick} className={clsx(style.button, style.cartButton)}>
                            <CustomIcon name={"shoppingBag"} width={18} color={"#282828"} />
                        </div>
                    </div>
                    <PaddingWrapper padding={"5% 10% 5% 10%"}>
                        {
                            skeleton ?
                                <Center width={"100%"} textAlign={"left"}>
                                    <SkeletonText width={50} size={16} />
                                    <SkeletonText width={50} size={16} />
                                    <SkeletonText width={50} size={16} />
                                    <Inline>
                                        <SkeletonText width={50} size={10} />
                                        <SkeletonText width={50} size={10} />
                                        <SkeletonText width={50} size={10} />
                                    </Inline>
                                    <SkeletonText width={50} size={10} />
                                    <SkeletonText width={50} size={10} />
                                </Center>
                                :
                                <Center width={"100%"} maxWidth={200} textAlign={"left"}>
                                    <P height={"36px"} ellipsis size={12} weight={"900"}>{data.brandTitle}</P>
                                    <P height={"36px"} ellipsis size={12} weight={"900"}>{data.title}</P>
                                    <HorizontalFlex gap={10} justifyContent={"flex-end"}>
                                        {
                                            data.currentPrice && userName &&
                                            <FlexChild justifyContent={"flex-end"}>
                                                <P textAlign={"right"} size={"14px"} weight={"bold"} color={"red"}>{100 - data.currentPrice / data.price * 100}%</P>
                                            </FlexChild>
                                        }
                                        {/* products로 받을 때 */}
                                        {data && data.variants && data.variants.length > 0 &&
                                            <FlexChild justifyContent={"flex-end"}>
                                                <P textAlign={"right"} size={"14px"} weight={"bold"} color={data.variants[0].prices[0].amount ? "gray" : "var(--main-color)"} textDecoration={data.currentPrice && "line-through"}>&#8361;
                                                    {
                                                        // userName ? 
                                                        addCommas(data.variants[0].prices[0].amount)
                                                        //  : "-"
                                                    }</P>
                                            </FlexChild>
                                        }
                                        {/* variants를 받을 때 */}
                                        {data && data.prices && data.prices.length > 0 &&
                                            <FlexChild justifyContent={"flex-end"}>
                                                <P textAlign={"right"} size={"14px"} weight={"bold"} color={data.prices[0].amount ? "gray" : "var(--main-color)"} textDecoration={data.currentPrice && "line-through"}>&#8361;
                                                    {
                                                        // userName ? 
                                                        addCommas(data.prices[0].amount)
                                                        //  : "-"
                                                    }</P>
                                            </FlexChild>
                                        }
                                    </HorizontalFlex>
                                    {
                                        // data.currentPrice
                                        data && data.variants && data.variants.length > 0 && data.currentPrice
                                            // ? <P textAlign={"right"} size={"14px"} weight={"bold"} color={"var(--main-color)"}>&#8361; {userName ? addCommas(data.variants[0].prices[0].amount) : "-"}</P>
                                            ? <P textAlign={"right"} size={"14px"} weight={"bold"} color={"var(--main-color)"}>&#8361; {addCommas(data.variants[0].prices[0].amount)}</P>
                                            : <P textAlign={"right"} size={"14px"} weight={"bold"} color={"var(--main-color)"}>{" "}</P>
                                    }
                                    {/* <Inline>
                                        <P size={10} color={"var(--main-color)"}>{" ★ "}</P>
                                        <P size={10} color={"#6f6f6f"}>4.7{t("score")}</P>
                                    </Inline>
                                    <P size={10} color={"#6f6f6f"}>{t("freeDelivery")} {t("possible")}</P>
                                    <P size={10} color={"#6f6f6f"}>{t("peach")}{t("flavor")} / 2mg</P> */}
                                </Center>
                        }
                    </PaddingWrapper>
                </FlexChild>
            </VerticalFlex >
        </div>
    );
}

export default NormalProductCard;