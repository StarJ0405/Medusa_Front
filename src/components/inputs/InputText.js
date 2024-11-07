import { useTranslation } from "react-i18next";
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, Children } from "react";
import clsx from "classnames";
import style from "./InputText.module.css";
import useAltEffect from "shared/hooks/useAltEffect";

import { CFormInput } from "@coreui/react";

const InputText = forwardRef((props, ref) => {
    const input = useRef();
    const { regExp, placeHolder, label, labelWidth, targetRef, readOnly, numberOnly } = props;
    const { t } = useTranslation();
    const [name, setName] = useState(props.name || "");
    const [value, setValue] = useState(props.value || "");
    const [isValid, setValid] = useState(regExp ? false : true);
    const [isEmpty, setEmpty] = useState(true);
    const [active, setActive] = useState(false);

    const onChange = (e) => {
        let inputValue = e.target.value;
        let onlyNumber = inputValue.replace(/\D/g, "");
        if (numberOnly) {
            inputValue = onlyNumber;
        }

        setValue(inputValue);
        if (e.target.value.length > 0) {
            setActive(true);
        }
        else {
            setActive(false);
        }
    }

    useAltEffect(() => {
        setValue(props.value || "");
    }, [props.value]);


    useEffect(() => {
        if (regExp) {
            let validationResult = true;
            regExp.map((re) => {
                let eachValidationResult = re.exp.test(value);
                if (eachValidationResult === false) {
                    validationResult = false;
                }
            });

            setValid(validationResult);

        } else {
            setValid(true);
        }

        if (value && value.length > 0) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }

        if (props.onChange) {
            props.onChange(value);
        }
    }, [value]);

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
            console.log(isValid);
            return isValid;
        },
        empty() {
            setValue("");
        },
        focus() {
            input.current.scrollTo(0, input.current.offsetTop);
            if (props.hidden) {
                targetRef.current.focus();
            } else {
                input.current.focus();
            }
        }
    }));

    const inputStyle = {
        border: "none",
        boxShadow: "none",
        borderRadius: "0",
        fontSize: "15px",
        padding: "0 20px",
        color: "var(--font-color)",
        height: "50px",
    }
    const defaultInputStyle = {
        '--cui-invalid-feedback': "none",
        boxShadow: "none",
        borderRadius: "0",
        fontSize: "15px",
        border: "1px solid var(--line-color)",
    }

    return (
        <>
            {
                props.lineText
                    ?
                    <div className={clsx(style.wrap, { [style.active]: isValid && active ? !active : active })}>
                        <CFormInput

                            style={inputStyle}
                            type="text"
                            // feedback={isValid ? false : "잘 입력좀해주세요"}
                            // placeholder={placeHolder}
                            value={value}
                            valid={readOnly ? null : isEmpty ? null : isValid}
                            invalid={isEmpty ? null : !isValid}
                            onChange={onChange}
                            label={label}
                            ref={input}
                            size={props.size ? props.size : null}
                            disabled={props.disabled ? props.disabled : null}
                            readOnly={readOnly}
                        />
                        <p className={clsx(style.placeHolder, { [style.readOnly]: readOnly }, { [style.active]: active }, { [style.defaultPlaceHolder]: !active })}>{props.placeHolder}</p>
                    </div>
                    :
                    <div className={style.wrap}>
                        <CFormInput

                            style={defaultInputStyle}
                            type={props.hidden ? "hidden" : "text"}
                            feedback={isValid ? false : t("pleaseCheckNumber")}
                            placeholder={placeHolder}
                            value={value}
                            valid={isEmpty ? null : isValid}
                            invalid={isEmpty ? null : !isValid}
                            onChange={onChange}
                            label={label}
                            ref={input}
                            size={props.size ? props.size : null}
                            disabled={props.disabled ? props.disabled : null}
                            readOnly={readOnly}
                        />
                    </div>

            }
        </>

    );
})

export default InputText;
