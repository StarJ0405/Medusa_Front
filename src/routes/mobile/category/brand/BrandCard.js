import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import clsx from "classnames";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import style from "./BrandCard.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ArchWrapper from "layouts/wrapper/ArchWrapper";
import { useNavigate } from "react-router-dom";
import SkeletonImage from "components/skeleton/SkeletonImage";
import SkeletonText from "components/skeleton/SkeletonText";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { clone, getCurrentLanguageCode } from "shared/utils/Utils";
import { useEffect } from "react";

function BrandCard(props) {
    const { index, data, active, setActiveIndex, skeleton } = props;
    const navigate = useNavigate();

    useEffect(() => {
        if (active === true) {
            navigate(`/productList/brand/${data.id}`, { replace: true });
        }
    }, [active]);

    const onBrandClick = () => {
        setActiveIndex(index);
    }

    return (
        <div className={style.card} onClick={onBrandClick}>
            <VerticalFlex gap={5} width={"initial"}>
                <FlexChild>
                    {
                        skeleton ?
                            <SkeletonImage width={150} />
                            : <img className={style.image} src={data.image} alt={""} />
                    }
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default BrandCard;