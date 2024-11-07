
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "classnames";
import Dummy from "components/Dummy";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import SkeletonImage from "components/skeleton/SkeletonImage";
import SkeletonText from "components/skeleton/SkeletonText";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import CircleWrapper from "layouts/wrapper/CircleWrapper";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import style from "./SimpleProductCard.module.css";
import { ReactComponent as HeartIcon } from "resources/img/icons/heart.svg";
import NiceModal from "@ebay/nice-modal-react";
import { requester } from "App";
import useAltEffect from "shared/hooks/useAltEffect";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import { addCommas, getCurrentLanguageCode } from "shared/utils/Utils";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from 'providers/AuthProvider'

function SimpleProductCard(props) {
    const { data, type, skeleton } = props;
    const {userName} = useContext(AuthContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onProductClick = () => {
        navigate(`/product/detail/${data.id}/#`);
    }

    const GiftSticker = () => {
        return (
            <>
                {
                    data.gift &&
                    <div style={{ width: 30, height: 30, position: "absolute", top: 0, right: 0, zIndex: 100, backgroundColor: "#0a8fff", borderRadius: "100%", padding: "0px 0px" }}>
                        <Center>
                            <P size={10} weight={800} color={"white"}>{`${data.giftStandard} + ${data.gift}`}</P>
                        </Center>
                    </div>
                }
            </>
        );
    }


    return (
        <div className={clsx(style.wrap, { [style.horizontal]: type === "horizontal" })} onClick={onProductClick}>
            {
                data &&
                <VerticalFlex>
                    <FlexChild >
                        {
                            skeleton ?
                                <div className={style.thumbnail} style={{ backgroundColor: "#ebebeb" }}>
                                    <SquareWrapper>
                                        {
                                            skeleton ? <SkeletonImage width={100} />
                                                : <img className={style.image} src={data.image} alt={""} />
                                        }
                                    </SquareWrapper>
                                </div>
                                :
                                <div className={style.thumbnail} >
                                    <GiftSticker />
                                    <SquareWrapper>
                                        <img className={style.image} src={data.image} alt={""} />
                                    </SquareWrapper>
                                </div>
                        }
                    </FlexChild >
                    <FlexChild height={"fit-content"} backgroundColor={"white"}>
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
                                    <Center textAlign={"left"}>
                                        <P ellipsis size={11} weight={"900"}>{data.title}</P>
                                        <P textAlign={"right"} size={"12px"} color={"var(--main-color)"}>&#8361; {userName?addCommas(data.currentPrice ? data.currentPrice : data.price):"-"}</P>
                                    </Center>
                            }
                        </PaddingWrapper>
                    </FlexChild>
                </VerticalFlex>
            }
        </div>
    );
}

export default SimpleProductCard;