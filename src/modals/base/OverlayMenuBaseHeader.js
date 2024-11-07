import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import style from "./OverlayMenu.module.css"

function OverlayMenuBaseHeader({ title, modalClose, backgroundColor }) {
    return (
        <div className={style.header} style={{backgroundColor: backgroundColor && backgroundColor}}>
            <HorizontalFlex>
                <FlexChild width={50}>
                    <VerticalMiddleWrapper>
                        <a className={style.headerCloseButton} onClick={modalClose}>
                            {' '}&times;{' '}
                        </a>
                    </VerticalMiddleWrapper>
                </FlexChild>
                <FlexChild>
                    <VerticalMiddleWrapper>
                        <p className={style.headerTitle}>{title}</p>
                    </VerticalMiddleWrapper>
                </FlexChild>
            </HorizontalFlex>
        </div>
    );
}

export default OverlayMenuBaseHeader;