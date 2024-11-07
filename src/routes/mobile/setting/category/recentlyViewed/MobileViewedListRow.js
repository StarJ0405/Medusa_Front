import SlideToggle from "components/buttons/SlideToggle/SlideToggle";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./MobileViewedListRow.module.css"

function MobileViewedListRow(props) {
    const { row } = props;

    return (
        <FlexChild>
            <HorizontalFlex>
                <FlexChild>
                    <p className={style.list}>{row.list}</p>
                </FlexChild>
                <FlexChild width={50}>
                    <SlideToggle />
                </FlexChild>
            </HorizontalFlex>
        </FlexChild>
    );
}

export default MobileViewedListRow;