import { useTranslation } from "react-i18next";
import { useEffect, useState, forwardRef, useImperativeHandle, useRef, useContext } from "react";
import clsx from "classnames";
import style from "./InputPassword.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import ArrowBox from "./modules/ArrowBox";
import { CFormInput } from "@coreui/react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";


const InputPassword = forwardRef((props, ref) => {
  const { isMobile } = useContext(BrowserDetectContext);
  const { confirmVisible, regExp, placeHolder, placeHolderComfirm, label, readOnly, signIn, signUp, targetRef } = props;
  const { t } = useTranslation();
  const input = useRef();
  const [name, setName] = useState(props.name || "");
  const [valuePw, setValuePw] = useState("");
  const [valuePwComfirm, setValuePwComfirm] = useState("");
  const [isMatched, setMatched] = useState(confirmVisible ? false : true);
  const [isValid, setValid] = useState(regExp ? false : true);
  const [isEmptyPw, setEmptyPw] = useState(true);
  const [isEmptyPwConfirm, setEmptyPwConfirm] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [confirmHelperText, setConfirmHelperText] = useState("");
  const [isDefault, setDefault] = useState(false);

  const onChangePw = (e) => {
    let value = e.target.value;
    let noWhiteSpace = value.replace(/ /gi, "");

    if (noWhiteSpace.length > 0) {
      setEmptyPw(false);
    } else {
      setEmptyPw(true);
    }

    setValuePw(noWhiteSpace);
  };

  const onChangePwComfirm = (e) => {
    let value = e.target.value;
    let noWhiteSpace = value.replace(/ /gi, "");

    if (noWhiteSpace.length > 0) {
      setEmptyPwConfirm(false);
    } else {
      setEmptyPwConfirm(true);
    }
    setValuePwComfirm(noWhiteSpace);
  }

  useImperativeHandle(ref, () => ({
    getValue() {
      return valuePw;
    },
    setValue(value) {
      setValuePw(value);
    },
    isValid() {
      return isValid && isMatched;
    },
    empty() {
      setValuePw("");
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

  useEffect(() => {
    if (regExp) {
      let validationResult = true;
      regExp.map((re) => {
        let eachValidationResult = re.exp.test(valuePw);
        if (eachValidationResult === false) {
          validationResult = false;
        }

      });

      setValid(validationResult);
    } else {
      setValid(true);
    }

    if (!isEmptyPw && !isEmptyPwConfirm) {
      if (valuePw === valuePwComfirm) {
        setMatched(true);
      } else {
        setMatched(false);
      }
    }
   
  }, [valuePw, valuePwComfirm]);

  const inputStyle = {
    border: "none",
    boxShadow: "none",
    borderRadius: "0",
    fontSize: "15px",
    padding: "0 20px",
    height: "48px",

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
        signIn &&

        <CFormInput
          onKeyUp={props.onKeyPress}
          style={defaultInputStyle}
          type="password"
          // valid={readOnly ? null : isEmptyPw ? null : isValid}
          // invalid={isEmptyPw ? null : !isValid}
          value={valuePw || ""}
          onChange={onChangePw}
          placeholder={placeHolder}
          label={label}
          ref={input}
          size={props.size}
        />
      }
      {signUp
        &&
        <VerticalFlex gap={10}>
          <FlexChild>
            <CFormInput
              onKeyUp={props.onKeyPress}
              style={defaultInputStyle}
              type="password"
              valid={readOnly ? null : isEmptyPw ? null : isValid}
              invalid={isEmptyPw ? null : !isValid}
              value={valuePw || ""}
              onChange={onChangePw}
              placeholder={placeHolder}
              label={label}
              ref={input}
              size={props.size}
            />
          </FlexChild>
          {confirmVisible
            &&
            <FlexChild>
              <CFormInput
                style={defaultInputStyle}
                type="password"
                valid={readOnly ? null : isEmptyPwConfirm ? null : isMatched}
                invalid={isEmptyPwConfirm ? null : !isMatched}
                value={valuePwComfirm || ""}
                onChange={onChangePwComfirm}
                placeholder={placeHolderComfirm}

              />
            </FlexChild>
          }
        </VerticalFlex>
      }
      {
        props.line
        &&
        <VerticalFlex>
          <FlexChild height={50}>
            <HorizontalFlex justifyContent={"flex-start"}>
              <FlexChild width={isMobile ? "" : "15%"} >
                <div className={clsx(style.wrap, { [style.active]: isValid })}>
                  <CFormInput
                    style={inputStyle}
                    type="password"
                    value={valuePw || ""}
                    onChange={onChangePw}
                    placeHolder={placeHolder}
                    ref={input}
                  // valid={readOnly ? null : isEmptyPw ? "" : isValid}
                  // invalid={isEmptyPw ? "" : !isValid}
                  />
                  {/* <p className={clsx(style.placeHolder, { [style.readOnly]: readOnly }, { [style.active]: passwordActive }, { [style.defaultPlaceHolder]: !passwordActive })}>{props.placeHolder}</p> */}
                </div>

              </FlexChild>
            </HorizontalFlex>
            <div className={style.borderBottom}></div>
          </FlexChild>

          {confirmVisible
            &&
            <FlexChild height={50}>
              <HorizontalFlex justifyContent={"flex-start"}>
                <FlexChild width={isMobile ? "" : "15%"}>
                  {/* <div className={clsx(style.wrap, { [style.active]: isValid && passwordComfirmActive ? !passwordComfirmActive : passwordComfirmActive })}>
                    <CFormInput
                      style={inputStyle}
                      type="password"
                      value={valuePwComfirm || ""}
                      onChange={onChangePwComfirm}
                      valid={readOnly ? null : isEmptyPwConfirm ? "" : isValid}
                      invalid={isEmptyPwConfirm ? "" : !isValid}
                    />
                    <p className={clsx(style.placeHolder, { [style.readOnly]: readOnly }, { [style.active]: passwordComfirmActive }, { [style.defaultPlaceHolder]: !passwordComfirmActive })}>{props.placeHolderComfirm}</p>
                  </div> */}
                </FlexChild>
              </HorizontalFlex>
            </FlexChild>

          }
        </VerticalFlex>
      }
    </>
  );
});


export default InputPassword;
