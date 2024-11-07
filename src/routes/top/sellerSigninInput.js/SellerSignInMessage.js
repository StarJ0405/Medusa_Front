import { useEffect, useState } from "react";
import { requester } from "App";
import style from "./SellerSignInMessage.module.css";

function SellerSignInMessage() {
  const [vendor, setvendor] = useState();

  //   useEffect(() => {
  //     let data = {};
  //     requester.getVendorList(data).then((result) => {
  //       setvendor(result);
  //     });
  //   }, []);

  return (
    <div className={style.color}>
      <p>(x)Your account name or password is incorrect</p>
      <p>(x)please enter your email address or member ID.</p>
      <p>(x)Please enter your password.</p>
    </div>
  );
}

export default SellerSignInMessage;
