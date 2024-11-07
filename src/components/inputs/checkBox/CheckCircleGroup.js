import { cloneElement, Children, useState, useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import React from "react";
import CheckWrapper from "./CheckWrapper";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { t } from "i18next";

const CheckCircleGroup = forwardRef((props, ref) => {
    const [checkedIndex, setCheckedIndex] = useState([]);
    const [isCheckedAll, setCheckedAll] = useState(false);
    const [value, setValue] = useState([]);
    const checkAllInput = useRef();

    const callback = (index, isChecked, data) => {
        if (isChecked) {
            setCheckedIndex((before) => [...before, index]);
            setValue((before) => [...before, data]);
        }
        else {
            setCheckedIndex((before) => before.filter((row) => row !== index));
            setValue((before) => before.filter((row) => row !== data));
        }

    }

    const callbackCheckAll = (index, checkAll) => {
        if (checkAll) {
            if (isCheckedAll) {

            } else {
                let checkedArray = [];
                for (let i = 0; i < props.children.length; i++) {
                    checkedArray.push(i);
                }
                setCheckedIndex(checkedArray);
            }
        } else {
            if (isCheckedAll) {
                setCheckedIndex([]);
            } else {

            }
        }
    }

    useEffect(() => {
        let set = new Set(checkedIndex);
        let uniqArray = [...set];

        if (props.children && props.children.length === uniqArray.length) {
            if (uniqArray.length > 0) {
                checkAllInput.current.setChecked(true);
                setCheckedAll(true);
            } else {
                checkAllInput.current.setChecked(false);
                setCheckedAll(false);
            }
        } else {
            checkAllInput.current.setChecked(false);
            setCheckedAll(false);
        }

        if (props.callback) {
            props.callback(uniqArray, value);
        }
    }, [checkedIndex]);

    useEffect(() => {
        if (props.children) {
            setCheckedIndex([]);
        }
    }, [props.children?.length]);

    useImperativeHandle(ref, () => ({
        isValid() {
            return "";
        },
        getCheckedIndex() {
            return checkedIndex;
        }
    }));


    const childrenWithProps = Children.map(props.children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { callback: callback, checkedIndex: checkedIndex });
        }
        return child;
    });

    return (
        <div style={props.style}>
            <VerticalFlex gap={props.gap}>
                <FlexChild>
                    <CheckWrapper lineHeight={props.lineHeight} justifyContent={props.justifyContent} flexStart={props.flexStart} ref={checkAllInput} callback={callbackCheckAll} label={props.label} padding={props.padding} backgroundColor={props.backgroundColor} borderTop={props.borderTop} borderBottom={props.borderBottom} header={props.header} labelWidth={props.labelWidth} headerGap={props.headerGap} />
                </FlexChild>
                {
                    childrenWithProps && childrenWithProps.map((row, index) =>
                        <FlexChild key={index} flexStart justifyContent={props.justifyContent}>
                            {row}
                        </FlexChild>
                    )
                }
            </VerticalFlex>
        </div>
    );
})

export default CheckCircleGroup;