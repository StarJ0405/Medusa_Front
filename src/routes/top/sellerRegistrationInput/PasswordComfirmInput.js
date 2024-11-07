import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import style from "./PasswordComfirmInput.module.css";
import clsx from "classnames";

const PasswordComfirmInput = forwardRef((props, ref) => {
  const [value, setValue] = useState();
  const [isValid, setValid] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
    
  };

  useEffect(() => {
    setValid(value === props.target);
  }, [value]);

  useEffect(() => {
    setValid(value === props.target);
  }, [props.target]);

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
      {props.passwordComfirmVisible ? (
        <p className={style.inputTitle}>{props.data.confirmPassword}</p>
      ) : null}
      <input
        type="text"
        onChange={onChange}
        className={clsx(style.inputError, { [style.inputSuccess]: isValid })}
        placeholder={"Enter password again"}
      />
      <p className={clsx(style.validMessage, { [style.valid]: isValid })}>
        {isValid
          ? null
          : "The two passwords you entered are inconsistent. Please enter again"}
      </p>
    </div>
  );
});

export default PasswordComfirmInput;
