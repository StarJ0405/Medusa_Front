import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import style from "./ModalBase.module.css"
import { useEffect } from "react";


function ModalBaseHeader({ title, modalClose, headerStyle }) {
    return (
        <div className={style.header} style={headerStyle}>
            <HorizontalFlex>
                <FlexChild width={50}>

                </FlexChild>
                <FlexChild>
                    <VerticalMiddleWrapper>
                        <p>{title}</p>
                    </VerticalMiddleWrapper>
                </FlexChild>
                <FlexChild width={50}>
                    <VerticalMiddleWrapper>
                        <a className={style.headerCloseButton} onClick={modalClose}>
                            {' '}&times;{' '}
                        </a>
                    </VerticalMiddleWrapper>
                </FlexChild>
            </HorizontalFlex>



        </div>
    );
}

export default ModalBaseHeader;