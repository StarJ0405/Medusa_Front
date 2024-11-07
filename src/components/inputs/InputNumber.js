import { useTranslation } from "react-i18next";
import { useEffect, useState, forwardRef, useImperativeHandle, useRef, useContext } from "react";
import clsx from "classnames";
import style from "./Input.module.scss";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import useAltEffect from "shared/hooks/useAltEffect";
import ArrowBox from "./modules/ArrowBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";

const InputNumber = forwardRef((props, ref) => {
    const input = useRef();
    const { min, max, placeHolder, label, labelWidth, clearButton, disabled, required } = props;
    const { t } = useTranslation();
    const [name, setName] = useState(props.name || "");
    const [value, setValue] = useState(props.value ? props.value : 0);
    const [isValid, setValid] = useState(required ? false : true);
    const [helperText, setHelperText] = useState("");
    const [isEmpty, setEmpty] = useState(true);
    const [block, setBlock] = useState(false);
    const {isMobile} = useContext(BrowserDetectContext);

    useEffect(() => {
        const handleWheel = (event) => {
            event.stopPropagation();
            event.preventDefault();
          };
      
          // 모든 input 태그에 대해 이벤트 리스너 추가
          const inputElements = document.querySelectorAll('input');
          inputElements.forEach((input) => {
            input.addEventListener('wheel', handleWheel);
          });
      
          // 컴포넌트 언마운트 시 이벤트 리스너 제거
          return () => {
            inputElements.forEach((input) => {
              input.removeEventListener('wheel', handleWheel);
            });
          };
    }, []);


    const changeValue = (v) => {
        let changedValue = Math.max(min ? min : 0, Math.min(max ? max : 99999, v));
        if (props.onChange) {
            props.onChange(changedValue);
        }
        setValue(changedValue);
    }

    const onChange = (e) => {
        let inputValue = Number(e.target.value);
        if (isEmpty) {
            setEmpty(false);
        }
        changeValue(inputValue);
    }

    const onClearButtonClick = () => {
        setValue(0);
    }
    const onPlusClick = (e) => {
        e.stopPropagation();
        if (isEmpty) {
            setEmpty(false);
        }
        changeValue(value + 1);
    }
    const onMinusClick = (e) => {
        e.stopPropagation();
        if (isEmpty) {
            setEmpty(false);
        }
        changeValue(value - 1);
    }

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
            if (isValid) {
                setHelperText("");
            } else {
                setHelperText("수량을 입력해주세요");
            }
            input.current.scrollTo(0, input.current.offsetTop);
        }
    }));

    useAltEffect(() => {
        if (props.value) {
            setValue(props.value);
        }
    }, [props.value]);

    useAltEffect(() => {
        if (required) {
            if (value > 0) {
                setValid(true);
            } else {
                setValid(false);
            }
        }

        if (value <= min) {
            setBlock(true)
        } else {
            setBlock(false)
        }
    }, [value]);

    useEffect(() => {
        if (isValid) {
            setHelperText("");
        } else {
            if (!isEmpty) {
                setHelperText("수량을 입력해주세요");
            }
        }
    }, [isValid, isEmpty]);

    return (
        <VerticalFlex>
            <FlexChild height={props.height}>
                <HorizontalFlex>
                    {
                        label ?
                            <FlexChild width={labelWidth || "max-content"}>
                                <p>{label}</p>
                            </FlexChild>
                            : null
                    }
                    <FlexChild width={"initial"}>
                        <span onClick={onMinusClick} className={clsx(style.leftArrow, { [style.active]: block })}>
                            <Center>
                                <FontAwesomeIcon icon={faMinus} />
                            </Center>
                        </span>
                    </FlexChild>
                    <FlexChild>
                        <div ref={input} className={style.wrap}>
                            <input type="number" name={name} className={clsx(style.input, { [style.withPlaceHolder]: placeHolder ? true : false })}
                                onChange={onChange} value={Number(value || 0).toString()} disabled={disabled ? true : null}
                            />
                            {
                                placeHolder ?
                                    <div className={style.placeHolderArea}>
                                        <VerticalMiddleWrapper>
                                            <span className={clsx(style.placeHolder, { [style.moveUp]: value && value.length > 0 })} >{props.placeHolder}</span>
                                        </VerticalMiddleWrapper>
                                    </div>
                                    : null
                            }
                            {clearButton ?
                                <div className={style.buttonArea}>
                                    <span className={style.clearButton} onClick={onClearButtonClick}>&times; </span>
                                </div>
                                : null
                            }
                        </div>
                    </FlexChild>
                    <FlexChild width={"initial"}>
                        <span onClick={onPlusClick} className={style.rightArrow}>
                            <Center>
                                <FontAwesomeIcon icon={faPlus} />
                            </Center>
                        </span>
                    </FlexChild>
                </HorizontalFlex>
                {/* <ArrowBox visible={helperText.length > 0}><p>{helperText}</p></ArrowBox> */}
            </FlexChild>
        </VerticalFlex >
    );
});

export default InputNumber;