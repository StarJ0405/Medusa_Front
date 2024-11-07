import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import style from "./PasswordInput.module.css";
import clsx from "classnames";

const PasswordInput = forwardRef((props, ref) => {
  const [value, setValue] = useState();
  const [isValid, setValid] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
    
  };

  useEffect(() => {
    
    if (props.callback) {
      props.callback(value);
    }
  }, [value, isValid]);

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
      {props.passwordVisible ? (
        <p className={style.inputTitle}>{props.data.loginPassword}</p>
      ) : null}
      <input
        type="password"
        onChange={onChange}
        className={style.inputError}
        placeholder={"Enter password"}
      />
    </div>
  );
});
export default PasswordInput;
