import style from "./RangeSlider.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import { useState } from "react";

function RangeSlider(props) {
    const { defaultValue, step, dots } = props;
    const [value, setValue] = useState();

    const onChange = (value) => {
        setValue(value);
    }

    const callback = (value) => {
        if (props.callback) {
            if (value) {
                props.callback({
                    from: value[0],
                    to: value[1]
                });
            }
        }
    }

    useEffect(() => {
        callback(value);
    }, [value])

    return (
        <HorizontalFlex height={"initial"}>
            <FlexChild width={"max-content"} padding={"0 10px 0 10px"}>
                <p>{value ? value[0] : defaultValue[0]}</p>
            </FlexChild>
            <FlexChild>
                <Slider allowCross={false} defaultValue={defaultValue} range min={defaultValue[0]} max={defaultValue[1]} onChange={onChange} step={step} dots={dots ? true : false} />
            </FlexChild>
            <FlexChild width={"max-content"} padding={"0 10px 0 10px"}>
                <p>{value ? value[1] : defaultValue[1]}</p>
            </FlexChild>
        </HorizontalFlex>
    );
}

export default RangeSlider;