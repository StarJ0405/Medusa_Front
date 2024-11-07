import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import style from "./MobileNumberInput.module.css";
import clsx from "classnames";

const MobileNumberInput = forwardRef((props, ref) => {
  const [value, setValue] = useState();
  const [isValid, setValid] = useState(false);
  const [isEmpty, setEmpty] = useState(true);
  const [hasToShow, setShow] = useState(false);

  const onChange = (e) => {
    if (props.moblieCheck) {
      setValid(props.moblieCheck.test(e.target.value));
    }
    setValue(e.target.value);
    
  };

  useEffect(() => {
    
    if (props.callback) {
      props.callback(value);
    }
    if (value && value.length > 0) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [value, isValid, isEmpty]);

  useEffect(() => {
    
    if (isValid) {
      if (isEmpty) {
        setShow(false);
      } else {
        setShow(false);
      }
    } else {
      if (isEmpty) {
        setShow(false);
      } else {
        setShow(true);
      }
    }
  }, [isValid, isEmpty]);

  useImperativeHandle(ref, () => ({
    getValue() {
      return value;
    },
    setValue(v) {
      setValue(v);
    },
    isValid() {
      return isValid;
    },
  }));
  return (
    <div className={style.inputBox}>
      {props.moblieVisible ? (
        <p className={style.inputTitle}>{props.data.mobileNumber}</p>
      ) : null}
      <input
        type="tel"
        onChange={onChange}
        className={
          hasToShow
            ? clsx(style.inputError, { [style.inputSuccess]: isValid })
            : clsx(style.validMessage, style.inputSuccess)
        }
        placeholder={"Please enter your mobile number"}
      />
      <p className={clsx(style.requestMessage, { [style.valid]: isValid })}>
        {hasToShow ? "Please enter your mobile number" : null}
      </p>
    </div>
  );
});

export default MobileNumberInput;
