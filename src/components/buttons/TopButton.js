import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import style from "./TopButton.module.css";

function TopButton() {
    const { width, isMobile, languageCode } = useContext(BrowserDetectContext);
 
    const onTopButtonClick = () => {
        window.scrollTo(0, window.offsetTop);
    }
    
    return (
        <div className={style.topButton} style={{ transform: `translateX(${width / 3}px)` }} onClick={onTopButtonClick}>
            <Center>
                <VerticalFlex>
                    <FlexChild height={"initial"}>
                        <Center>
                            <FontAwesomeIcon icon={fas["faArrowUp"]} fontSize={20} color={"#b4da5d"} />
                        </Center>
                    </FlexChild>
                    <FlexChild height={"initial"}>
                        <Center>
                            <P size={12} color={"#666"}>TOP</P>
                        </Center>
                    </FlexChild>
                </VerticalFlex>
            </Center>
        </div>
    );
}

export default TopButton;