import { CButton, CCol, CFormInput, CFormLabel, CFormText, CRow } from "@coreui/react";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, Children } from "react";
import clsx from "classnames";
import style from "./InputEmail.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import useAltEffect from "shared/hooks/useAltEffect";
import ArrowBox from "./modules/ArrowBox";
import P from "components/P";
import CustomButton from "components/buttons/CustomButton";
import { requester } from "App";
import { emailFormat } from "InitialData/regExp";
import { toast } from "react-toastify";


const InputEmail = forwardRef((props, ref) => {
    const input = useRef();
    const { regExp, placeHolder, label, labelWidth, targetRef, readOnly } = props;
    const { t } = useTranslation();
    const [name, setName] = useState(props.name || "");
    const [value, setValue] = useState(props.value || "");
    const [isValid, setValid] = useState(regExp ? false : true);
    const [isEmpty, setEmpty] = useState(true);
    const [active, setActive] = useState(false);

    const onChange = (e) => {
        let inputValue = e.target.value;
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
            return isValid;
        },
        setValid(valid) {
            return setValid(valid);
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

    const onDuplicateClick = () => {

        let data = { userName: "" }
        data.userName = input.current.value;

        requester.userDuplicateCheck(data, (result) => {
            let validationResult = true;
            regExp.map((re) => {
                let eachValidationResult = re.exp.test(data.userName);
                if (eachValidationResult === false) {
                    validationResult = false;
                }
            });

            if (validationResult) {
                if (result.data) {
                    toast.error("이미 사용중인 아이디입니다", {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                    input.current.focus();
                    setValid(false);
                    props.callback && props.callback(result.data);
                } else {
                    toast.success(t("available"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                    props.callback && props.callback(result.data);
                }
            } else {
                toast.error("올바른 아이디를 입력해주세요", {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
                input.current.focus();
                setValid(false);
                props.callback && props.callback(result.data);
            }
        })
    }

    const inputStyle = {
        border: "none",
        boxShadow: "none",
        borderRadius: "0",
        fontSize: "15px",
        padding: "0",
        color: "var(--font-color)",
        height: "48px",
        padding: "0 20px",
    }
    const defaultInputStyle = {
        '--cui-invalid-feedback': "none",
        boxShadow: "none",
        borderRadius: "0",
        fontSize: "15px",
        border: "1px solid var(--line-color)",
    }
    const duplicateCheckBtnStyle = {
        backgroundColor: "var(--main-color)",
        borderRadius: "0",
        border: "none",
        padding: "0",
        height: "25px",
        width: "90px",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        position: "absolute",
        top: "10px",
        right: "0",
        color: "white",

    }

    return (
        <div>
            {
                props.lineText
                    ?
                    <div style={{ height: "50px" }} className={clsx(style.wrap, { [style.active]: isValid && active ? !active : active })}>
                        <CFormInput
                            onKeyUp={props.onKeyPress}
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
                        {props.duplicate && <CustomButton onClick={onDuplicateClick} style={duplicateCheckBtnStyle} text={t("duplicateInspection")} />}
                    </div>
                    :
                    <div>
                        <CFormInput
                            onKeyUp={props.onKeyPress}
                            style={defaultInputStyle}
                            type="text"
                            // feedback={isValid ? false : "* 사용이 불가능한 아이디입니다."}
                            placeholder={props.placeHolder}
                            value={value}
                            valid={props.signIn ? null : isEmpty ? null : isValid}
                            invalid={props.signIn ? null : isEmpty ? null : !isValid}
                            onChange={onChange}
                            label={label}
                            ref={input}
                            size={props.size}
                        />
                    </div>

            }
        </div>
    );
});

export default InputEmail;