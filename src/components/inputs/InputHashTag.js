import style from "./Input.module.scss"
import Container from "layouts/container/Container";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import InputHashTagRow from "./hashTag/InputHashTagRow";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import clsx from "classnames";
import useAltEffect from "shared/hooks/useAltEffect";
import VerticalFlex from "layouts/flex/VerticalFlex";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import InputLabel from "./InputLabel";

const InputHashTag = forwardRef((props, ref) => {
    const [tags, setTags] = useState([]);
    const [value, setValue] = useState();
    const [name, setName] = useState(props.name || "");
    const [tagValue, setTagValue] = useState();
    const [isValid, setValid] = useState(true);
    const [valueCondition, setValueCondition] = useState();
    const [isEmpty, setEmpty] = useState(true);
    const [helperText, setHelperText] = useState("");

    useImperativeHandle(ref, () => ({
        getName() {
            return name;
        },
        getValue() {
            return value;
        },
        setValue(value) {
            setValue(value);
        },
        isValid() {
            return isValid;
        },
        focus() {
        }
    }));

    const addTag = (tag) => {
        if (tag === undefined || tag === "" || tag === "#") {
            return;
        } else {
            setTags((before) => [...new Set([...before, tag])]);
        }

    }
    const checkTag = (el) => {
        if (el === undefined) {
            return; // undifined 엔터입력시 오류방지 
        } else {
            let splitted = el.split("#");
            splitted.map((tag) => {
                addTag("#" + tag.replace(/[\s,]/g, ""));
            });
        }
    }

    const removeTag = (id) => {
        setTags(tags.filter(tag => tag !== id));
    }
    const onKeyUp = (e) => {
        if (e.key == 'Enter' || e.key == ',' || e.key == ' ') {
            checkTag(tagValue);
            setTagValue(""); // value의 값을 초기화 시켜야 등록 후 바로 버튼을 눌렀을 때 데이터가 남아있지 않는다 
            setValueCondition("");
        }
    }
    const onClick = () => {
        checkTag(tagValue);
        setValueCondition("");
    }
    const onRemove = (id) => {
        removeTag(id);
    }
    const onChange = (e) => {
        setTagValue(e.target.value); //input text의 값을 저장
        setValueCondition(e.target.value); // value의 초기화 상태 유무를 담음 
    }

    useEffect(() => {
        let tagsString = "";
        tags.map((tag) => {
            tagsString += tag;
        });
        setValue(tagsString);
    }, [tags]);

    useAltEffect(() => {
        setTags([]);
        if (props.value === undefined || props.value === "") {

        } else {
            checkTag(props.value);
        }

        setValue(props.value || "");
    }, [props.value]);


    useEffect(() => {
        if (isValid) {
            setHelperText("");
        } else {
            if (value.length === 0) {
                setHelperText("");
            } else {
                setHelperText("올바르지 않은 " + (props.placeHolder || props.label || "입력값") + " 입니다");
            }
        }

        if (value && value.length > 0) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }
    }, [value]);


    return (
        <div>
            <InputLabel text={props.label} />
            <FlexChild>
                <VerticalFlex>
                    <FlexChild height={50}>
                        <div className={style.wrap}>
                            <input type="text" className={clsx(style.input, { [style.withPlaceHolder]: props.placeHolder ? true : false }, { [style.invalid]: !isValid }, { [style.valid]: isValid }, { [style.empty]: isEmpty })}
                                onKeyUp={onKeyUp} onChange={onChange} value={valueCondition || ""}
                            />
                            {
                                props.placeHolder ?
                                    <div className={style.placeHolderArea}>
                                        <VerticalMiddleWrapper>
                                            <span className={clsx(style.placeHolder, { [style.moveUp]: value && value.length > 0 })} >{props.placeHolder}</span>
                                        </VerticalMiddleWrapper>
                                    </div>
                                    : null
                            }
                        </div>
                    </FlexChild>
                    <FlexChild>
                        <div className={style.tagContainer}>
                            {
                                tags && tags.map((data, index) => (
                                    <InputHashTagRow data={data} key={index} onRemove={onRemove} />
                                ))
                            }
                        </div>
                    </FlexChild>
                </VerticalFlex>
            </FlexChild>
        </div>
    );
})

export default InputHashTag;