import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import style from "./EmailAddressSignInInput.module.css";

const EmailAddressSignInInput = forwardRef((props, ref) => {
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
    <div className={style.emailAdressBox}>
      {props.accountVisible ? (
        <p className={style.account}>{props.data.account}</p>
      ) : null}

      <input
        type="email"
        onChange={onChange}
        placeholder="Email address or member ID"
        className={style.emailAddressInput}
      />
    </div>
  );
});

export default EmailAddressSignInInput;
