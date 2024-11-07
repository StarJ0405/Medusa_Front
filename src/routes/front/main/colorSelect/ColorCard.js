import { faStaylinked } from "@fortawesome/free-brands-svg-icons";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ColorCard.module.css";
import {useState} from "react";

function ColorCard(props) {
    const [colorSetNo, setColorSetNo] = useState(props.index);
    const [colorOrderNo, setColorOrderNo] = useState();
    const onColorClick = (e) => {
        let colors = props.colorSet;
        let color = e.target.getAttribute("color");
        setColorOrderNo(parseInt(e.target.getAttribute("index")));

        callback("color", colorSetNo, parseInt(e.target.getAttribute("index")), colors, color);
    }

    const onColorSetClick = (e) => {
        let colors = props.colorSet;
        callback("colors", colorSetNo, colorOrderNo, colors, null);
    }

    const callback = (type, colorSetNo, colorOrderNo, colors, color) => {
        props.callback(type, colorSetNo+1, colorOrderNo+1, colors, color);
    }

    return (
        <HorizontalFlex>
            <FlexChild width={30}>
                <a className={style.panelNo} onClick={onColorSetClick}>{props.index + 1}</a>
            </FlexChild>
            <FlexChild>
                <VerticalFlex>
                    {
                        props.colorSet.map((color, index) =>
                            <FlexChild key={index}>
                                <div index={index} className={style.colorCard} style={{ backgroundColor: "#" + color }} color={"#"+color} onClick={onColorClick}></div>
                            </FlexChild>
                        )
                    }

                </VerticalFlex>
            </FlexChild>
        </HorizontalFlex>
    )


}

export default ColorCard;