import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import style from "./PasswordSignInInput.module.css";

const PasswordSignInInput = forwardRef((props, ref) => {
  const [value, setValue] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (props.callback) {
      props.callback(value);
    }
  }, [value]);
  useImperativeHandle(ref, () => ({
    getValue() {
      return value;
    },
    setValue(v) {
      setValue(v);
    },
  }));

  return (
    <div className={style.inputBox}>
      {props.passwordVisible ? (
        <div className={style.textBox}>
          <p>{props.data.password}</p>
          <a className={style.forgotPassword}>{props.data.forgot}</a>
        </div>
      ) : null}

      <input
        type="password"
        onChange={onChange}
        placeholder="Password"
        className={style.passwordInput}
      />
    </div>
  );
});

export default PasswordSignInInput;
