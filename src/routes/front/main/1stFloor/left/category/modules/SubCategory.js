import style from "../DesktopCategory.module.css";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import CategoryOverlay from "./CategoryOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from "react";
import clsx from "classnames";

function SubCategory(props) {
    const { data } = props;
    const [mouseOver, setMouseOver] = useState();

    const onMouseOver = (e) => {
        setMouseOver(true);
    }

    const onMouseLeave = (e) => {
        setMouseOver(false);
    }

    return (
        <div className={style.categoryRow} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            {
                data ?
                    <>
                        <PaddingWrapper padding={"0px 0px 0px 10px"}>
                            <HorizontalFlex>
                                <FlexChild width={24}>
                                    <VerticalMiddleWrapper>
                                        <span className={clsx(style.categoryIconArea, { [style.active]: mouseOver})}>
                                            {data.icon ? <FontAwesomeIcon icon={fas[data.icon]} color={(mouseOver?"var(--main-color)":null)}/> : null}
                                        </span>
                                    </VerticalMiddleWrapper>
                                </FlexChild>
                                <FlexChild>
                                    <VerticalMiddleWrapper>
                                        <p className={clsx(style.categoryTitle, { [style.active]: mouseOver})}>{data.titleKr}</p>
                                    </VerticalMiddleWrapper>
                                </FlexChild>
                            </HorizontalFlex>
                        </PaddingWrapper>
                        <CategoryOverlay data={data} />
                    </>
                    : null
            }

        </div>
    )
}

export default SubCategory;