import clsx from "clsx";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addCommas, getCurrentLanguageCode } from "shared/utils/Utils";
import style from "./SuperDealCard.module.css";

function SuperDealCard(props) {
    const { data } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onProductClick = () => {
        navigate(`/product/detail/${data.id}/#`);
    }

    // let brandTitle = data.brandTitle
    // let productTitle = data.title;
    // let maxLen = Math.max(brandTitle.length, productTitle.length);
    // brandTitle = brandTitle.padEnd(maxLen);
    // productTitle = productTitle.padEnd(maxLen);

    return (
        <div className={style.wrap} >
            <div className={style.card} onClick={onProductClick} style={{ border: props.border }}>
                <VerticalFlex>
                    <FlexChild>
                        <div className={style.thumbnail}>
                            <SquareWrapper>
                                <img className={style.image} src={data.image} />
                            </SquareWrapper>
                        </div>
                    </FlexChild>
                    <FlexChild height={70}>
                        <Center width={"90%"} textAlign={"center"}>
                            <P ellipsis size={11} weight={"bold"}>{data.brandTitle}</P>
                            <P ellipsis size={11} weight={"bold"}>{data.title}</P>
                            <P size={"10px"} color={"#9a9a9a"}>25%{t("salePrice")}</P>
                        </Center>
                    </FlexChild>
          
                    <FlexChild height={25}>
                        <div className={style.priceTag}>
                            <HorizontalFlex height={"100%"}>
                                <FlexChild width={"40%"} height={"100%"} backgroundColor={"#ffffff"}>
                                    <div className={style.beforePriceArea}>
                                        <Center>
                                            <P textDecoration={"line-through"} size={"12px"} color={"gray"}>&#8361; {addCommas(data.price)}</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild >
                                    <div className={style.currentPriceArea}>
                                        <Center>
                                            <P size={"15px"} color={"white"}>&#8361; {addCommas(data.price)}</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                            </HorizontalFlex>
                        </div>
                    </FlexChild>
                    <FlexChild height={10}>
                    </FlexChild>
                </VerticalFlex>
            </div>
        </div>
    );
}

export default SuperDealCard;