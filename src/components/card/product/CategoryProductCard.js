
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "classnames";
import Dummy from "components/Dummy";
import P from "components/P";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addCommas } from "shared/utils/Utils";
import style from "./NormalProductCard.module.scss";

function CategoryProductCard(props) {
    const { t } = useTranslation();
    const { data, type } = props;


    const [activeLike, setActiveLike] = useState(false);
    const [activeShopping, setActiveShopping] = useState(false);

    const navigate = useNavigate();
    const onProductClick = () => {
        navigate(`/product/detail/${data.children[0].id}/#`);
    }

    const likeClick = () => {
        if(activeLike === true){
            setActiveLike(false);
        }else{
            setActiveLike(true);
        }
        
    }
    const shoppingClick = () => {
        if(activeShopping === true){
            setActiveShopping(false);
        }else{
            setActiveShopping(true);
        }
    }

    return (
        <div className={clsx(style.wrap, { [style.horizontal]: type === "horizontal" })}>
            {
                type === "horizontal" ?
                    <div className={style.card}>
                        <VerticalFlex>
                            <FlexChild>
                                <div onClick={onProductClick} className={style.titleArea} style={{ backgroundColor: `${data.children[0].bgColor}11` }}>
                                    <PaddingWrapper padding={"5px 10px"}>
                                        {/* <P size={"16px"} weight={"900"}>{t("eLiquid")}</P> */}
                                        <P size={"16px"} weight={"900"}>{data.children[0].brandTitleKr}{data.children[0].titleKr}(30ml)</P>
                                        <P size={"10px"} color={"#6f6f6f"}>{t("freeDelivery")} / {t("peach")}{t("flavor")} / 2mg</P>
                                    </PaddingWrapper>
                                </div>
                            </FlexChild>
                            <FlexChild borderTopRightRadius={"0"} borderTopLeftRadius={"0"} height={"fit-content"} backgroundColor={"white"}>
                                <div className={style.pricaArea} onClick={onProductClick}>
                                    <PaddingWrapper padding={"5px 10px"}>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <Inline >
                                                <P size={"14px"} weight={"bold"} color={"var(--main-color)"}>&#8361; {addCommas(data.children[0].price)}</P>
                                                <Dummy width={20} />
                                                <P size={"10px"} color={"var(--main-color)"}>{" ★ "}</P>
                                                <P size={"10px"} color={"#6f6f6f"}>4.7{t("score")}</P>
                                            </Inline>
                                        </Center>
                                    </PaddingWrapper>
                                </div>
                            </FlexChild>
                            <div className={style.likeWrap} onClick={likeClick}>
                                <div className={clsx(style.like, { [style.horizontal]: type === "horizontal" })}>
                                    <FontAwesomeIcon fontSize={13} icon={faHeart} color={"#ddd"} className={clsx(style.likeIcon ,{[style.activeLike]: activeLike === true})} />
                                </div>
                            </div>
                            <div className={style.shoppingWrap} onClick={shoppingClick}>
                                <div className={ clsx(style.shopping, { [style.horizontal]: type === "horizontal" })}>
                                    <FontAwesomeIcon fontSize={13} icon={faBagShopping} color={"#ddd"} className={clsx(style.shoppingIcon ,{[style.activeShopping]: activeShopping === true})} />
                                </div>
                            </div>
                        </VerticalFlex>
                        <div className={style.thumbnailWrap} >
                            <div className={clsx(style.thumbnail, style.horizontal)}>
                                <img className={style.image} src={data.image} />
                            </div>
                        </div>

                    </div>

                    :
                    <>
                        <VerticalFlex>
                            <FlexChild borderBottomRightRadius={"0"}>
                                <div onClick={onProductClick} className={style.thumbnail} style={{ backgroundColor: `${data.children[0].bgColor}11` }}>
                                    <SquareWrapper>
                                        <PaddingWrapper padding={"10%"}>
                                            <img className={style.image} src={data.children[0].image} />
                                        </PaddingWrapper>
                                    </SquareWrapper>
                                </div>
                            </FlexChild>
                            <FlexChild borderTopRightRadius={"0"} borderTopLeftRadius={"0"} height={"fit-content"} backgroundColor={"white"}>
                                <PaddingWrapper padding={"5% 10% 5% 10%"}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        {/* <P size={"16px"} weight={"900"}>{t("eLiquid")}상</P> */}
                                        <P size={"16px"} weight={"900"}>{data.children[0].brandTitleKr}{data.children[0].titleKr}(30ml)</P>
                                        <P size={"16px"} weight={"900"} color={"var(--main-color)"}>&#8361; {addCommas(data.children[0].price)}</P>

                                        <Inline>
                                            <P size={"10px"} color={"#6f6f6f"}>{t("nextDayDelivery")}</P>
                                            <P size={"10px"} color={"var(--main-color)"}>{" ★ "}</P>
                                            <P size={"10px"} color={"#6f6f6f"}>4.7{t("score")}</P>
                                        </Inline>
                                        <P size={"10px"} color={"#6f6f6f"}>{t("freeDelivery")} {t("possible")}</P>
                                        <P size={"10px"} color={"#6f6f6f"}>{t("peach")}{t("flavor")} / 2mg</P>
                                    </Center>
                                </PaddingWrapper>
                            </FlexChild>

                            <div className={clsx(style.likeWrap, {[style.active]: activeLike === true})} onClick={likeClick}>
                                <div className={ clsx(style.like)}>
                                    <FontAwesomeIcon fontSize={13} icon={faHeart} className={clsx(style.likeIcon ,{[style.activeLike]: activeLike === true})} />
                                </div>
                            </div>
                            <div className={style.shoppingWrap} onClick={shoppingClick}>
                                <div className={ style.shopping}>
                                    <FontAwesomeIcon fontSize={13} icon={faBagShopping} color={"#ddd"} className={clsx(style.shoppingIcon ,{[style.activeShopping]: activeShopping === true})} />
                                </div>
                            </div>
                        </VerticalFlex>

                    </>
            }

        </div>
    );
}

export default CategoryProductCard;