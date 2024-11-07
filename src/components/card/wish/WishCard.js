import P from "components/P";
import SkeletonText from "components/skeleton/SkeletonText";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./WishCard.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { requester } from "App";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import clsx from "classnames";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import { addCommas, getCurrentLanguageCode } from "shared/utils/Utils";
import Inline from "layouts/container/Inline";
import Dummy from "components/Dummy";
import SkeletonImage from "components/skeleton/SkeletonImage";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { clone } from "shared/utils/Utils";

function WishCard(props) {
    const { data, type, skeleton } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [product, setProduct] = useState();

    useEffect(() => {
        let searchCondition = clone(initialSearchCondition);
        searchCondition.productId = data.productId;

        if (data) {
            requester.searchProducts(searchCondition, (result) => {
                setProduct(result.data);

            })
        }
    }, [])

    const onProductClick = () => {
        navigate(`/product/detail/${product.id}/#`);
    }

    return (
        <div className={style.wrap} onClick={onProductClick}>
            {
                product
                &&
                <VerticalFlex>
                    <FlexChild borderBottomRightRadius={"0"}>
                        {
                            skeleton ?
                                <div className={style.thumbnail} style={{ backgroundColor: "#ebebeb" }}>
                                    <SquareWrapper>
                                        {
                                            skeleton ? <SkeletonImage width={100} />
                                                : <img className={style.image} src={product.image} alt={""} />
                                        }
                                    </SquareWrapper>
                                </div>
                                :
                                <div onClick={onProductClick} className={style.thumbnail}>
                                    <SquareWrapper>
                                        <img className={style.image} src={product.image} alt={""} />
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
                                    <Center width={"100%"} textAlign={"left"}>
                                        {/* <P size={15} weight={"900"}>{t("eLiquid")}</P> */}
                                        <P size={15} weight={"900"}>{product.brandTitle} {product.title}</P>
                                        <P size={15} weight={"900"} color={"var(--main-color)"}>&#8361; {addCommas(product.price)}</P>
                                        <Inline>
                                            {/* <P size={10} color={"#6f6f6f"}>{t("nextDayDelivery")}</P> */}
                                            {/* <P size={10} color={"var(--main-color)"}>{" ★ "}</P> */}
                                            {/* <P size={10} color={"#6f6f6f"}>4.7{t("score")}</P> */}
                                        </Inline>
                                        {/* <P size={10} color={"#6f6f6f"}>{t("freeDelivery")} {t("possible")}</P> */}
                                        {/* <P size={10} color={"#6f6f6f"}>{t("peach")}{t("flavor")} / 2mg</P> */}
                                    </Center>
                            }
                        </PaddingWrapper>
                    </FlexChild>
                </VerticalFlex >
            }
        </div>
    );
}

export default WishCard;