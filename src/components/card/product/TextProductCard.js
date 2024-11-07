
import clsx from "classnames";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addCommas } from "shared/utils/Utils";
import style from "./TextProductCard.module.css";

function TextProductCard(props) {
    const { data } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const onProductClick = () => {
        navigate(`/product/detail/${data.id}/#`);
    }

    return (
        <div className={style.wrap} onClick={onProductClick}>
            <VerticalFlex>
                <FlexChild height={"fit-content"}>
                    <PaddingWrapper padding={"5% 10% 5% 10%"}>
                        <Center textAlign={"left"}>
                            <P ellipsis size={11} weight={"900"} color={"white"}>{data.brandTitle}</P>
                            <P ellipsis size={11} weight={"900"} color={"white"}>{data.title}</P>
                            <P textAlign={"right"} size={"15px"} color={"white"}>&#8361; {addCommas(data.price)}</P>
                        </Center>
                    </PaddingWrapper>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default TextProductCard;