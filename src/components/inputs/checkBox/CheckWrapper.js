import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import CheckCircle from "./CheckCircle";
import style from "./CheckWrapper.module.css"
import Center from "layouts/wrapper/Center";

const CheckWrapper = forwardRef((props, ref) => {
    const [isChecked, setChecked] = useState(false);
    const [checkedData, setCheckedData] = useState();
    const [testData, setTestData] = useState([]);
    const input = useRef();

    const callback = (index, state) => {
        if (props.callback) {
            props.callback(index, state);

        }
    }

    useImperativeHandle(ref, () => ({
        isChecked() {
            return isChecked;
        },
        setChecked(value) {
            input.current.setChecked(value);
        },
        isCheckedVaild() {
            return input.current.isChecked();
        }
    }));

    useEffect(() => {
        if (props.data) {
            setCheckedData(props.data)
        }
    }, [props.data]);

    useEffect(() => {
        if (props.checkedIndex && props.checkedIndex.includes(props.index)) {
            input.current.setChecked(true);
        } else {
            input.current.setChecked(false);
        }
    }, [props.checkedIndex]);

    return (
        <div className={style.container} style={{ padding: props.padding, backgroundColor: props.backgroundColor, borderTop: props.borderTop, borderBottom: props.borderBottom }}>
            <HorizontalFlex gap={props.headerGap} flexStart={props.flexStart} justifyContent={props.justifyContent}>
                <FlexChild width={props.labelWidth}>
                    <CheckCircle ref={input} callback={callback} index={props.index} label={props.label} checkedData={checkedData} />
                </FlexChild>
                {
                    props.header && props.header.map((col, index) =>
                        <FlexChild key={index} width={col.width} justifyContent={col.justifyContent ? col.justifyContent : "flex-start"}>
                            <P lineHeight={props.lineHeight} weight={col.weight} onClick={col.onClick} color={"#666"}>{col.text}</P>
                        </FlexChild>
                    )
                }

            </HorizontalFlex>

            {props.children}
        </div>
    );
});

export default CheckWrapper;