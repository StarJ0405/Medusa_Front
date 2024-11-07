import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import style from "./EmailAddressInput.module.css";
import clsx from "classnames";

const EmailAddressInput = forwardRef((props, ref) => {
  const [value, setValue] = useState();
  const [isValid, setValid] = useState(false);
  const [isEmpty, setEmpty] = useState(true);
  const [hasToShow, setShow] = useState(false);

  const onChange = (e) => {
    if (props.emailCheck) {
      setValid(props.emailCheck.test(e.target.value));
    }
    setValue(e.target.value);
    
  };

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

  useEffect(() => {
    
    if (props.callback) {
      props.callback(value);
    }
    if (value && value.length > 0) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [value, isValid]);

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
    
  }, [isEmpty, isValid]);

  return (
    <div className={style.inputBox}>
      {props.emailAdressVisible ? (
        <p className={style.inputTitle}>{props.data.email}</p>
      ) : null}
      <input
        className={
          hasToShow
            ? clsx(style.inputError, { [style.inputSuccess]: isValid })
            : clsx(style.validMessage, style.inputSuccess)
        }
        type="email"
        onChange={onChange}
        placeholder={"Please set the email as the login name"}
      />

      {hasToShow ? (
        <p
          className={clsx(
            style.requestMessage,
            { [style.valid]: isValid },
            { [style.invalid]: !isValid }
          )}
        >
          The format of the email address is incorrect. Please fill in again
        </p>
      ) : null}
    </div>
  );
});

export default EmailAddressInput;
