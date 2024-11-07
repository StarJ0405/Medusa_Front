import { requester } from "App";
import clsx from "classnames";
import Dummy from "components/Dummy";
import P from "components/P";
import SkeletonImage from "components/skeleton/SkeletonImage";
import SkeletonText from "components/skeleton/SkeletonText";
import Inline from "layouts/container/Inline";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import CircleWrapper from "layouts/wrapper/CircleWrapper";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAltEffect from "shared/hooks/useAltEffect";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import style from "./CategoryCard.module.css";

function CategoryCard(props) {
    const { index, data, active, setActiveIndex, skeleton } = props;
    const navigate = useNavigate();
    const { isMobile } = useContext(BrowserDetectContext);

    useEffect(() => {
        if (active === true) {
            navigate(`/productList/category/${data.id}`, { replace: true });
        }
    }, [active]);

    const onCategoryClick = () => {
        setActiveIndex(index);
    }

    return (
        <>
            {
                isMobile &&
                <div className={style.card} onClick={onCategoryClick}>
                    <VerticalFlex>
                        {/* <FlexChild>
                    <div className={style.thumbnail} style={{ backgroundColor: active ? `${data.bgColor}22` : "transparent" }}>
                        <CircleWrapper>
                            <PaddingWrapper padding={"10%"}>
                                {
                                    skeleton ?
                                        <Center>
                                            <SkeletonImage width={50} />
                                        </Center>
                                        : <img className={style.image} src={data.icon} />
                                }

                            </PaddingWrapper>
                        </CircleWrapper>
                    </div>
                </FlexChild> */}
                        <FlexChild height={"fit-content"}>
                            {
                                skeleton ?
                                    <Center>
                                        <SkeletonText width={50} size={10} />
                                    </Center>
                                    : <P size={"13px"} color={active ? "var(--main-color)" : "black"} weight={"bold"}>{data.title}</P>
                            }

                        </FlexChild>
                    </VerticalFlex>
                </div>
            }

        </>
    );
}

export default CategoryCard;