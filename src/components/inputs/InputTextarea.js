import { useTranslation } from "react-i18next";
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, Children, useContext } from "react";
import clsx from "classnames";
import style from "./Input.module.scss";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import useAltEffect from "shared/hooks/useAltEffect";
import ArrowBox from "./modules/ArrowBox";
import { CFormInput, CFormTextarea } from "@coreui/react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";

const InputTextarea = forwardRef((props, ref) => {
  const { isMobile } = useContext(BrowserDetectContext);
  const input = useRef();
  const { regExp, placeholder, label, labelWidth, targetRef } = props;
  const { t } = useTranslation();
  const [name, setName] = useState(props.name || "");
  const [value, setValue] = useState(props.value || "");
  const [isValid, setValid] = useState(regExp ? false : true);
  const [isEmpty, setEmpty] = useState(true);

  const onChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
    
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

  const mobileTextAreaStyle = {
    border: "none",
    boxShadow: "none",
    borderRadius: "0",
    fontSize: "15px",
    padding: "0 20px",
    color: "var(--font-color)",
    height: "50px",
    resize: "none"
  }


  const textAreaStyle = {
    
    boxShadow: "none",
    borderRadius: "0",
    fontSize: "15px",
    resize: "none",
    color: "var(--font-color)",
    
  }
  
  return (
    
    <CFormTextarea
      
      style={isMobile ? mobileTextAreaStyle : textAreaStyle}
      type="text"
      feedback={isValid ? false : "잘 입력좀해주세요"}
      rows={props.rows}
      placeholder={placeholder}
      value={value}
      valid={isEmpty ? "" : isValid}
      invalid={isEmpty ? "" : !isValid}
      onChange={onChange}
      label={label}
      ref={input}
      
      
    />
    
  );
})

export default InputTextarea;
