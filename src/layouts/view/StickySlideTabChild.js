import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./StickySlideTab.module.scss";

function StickySlideTabChild(props) {
    return (
        <VerticalFlex>
            <FlexChild padding={30} borderBottom={"2px solid black"}>
                <P size={20} weight={1000}>{props.title}</P>
                
            </FlexChild>
            <FlexChild>
                {props.children}
            </FlexChild>

        </VerticalFlex>
    );
}

export default StickySlideTabChild;