import EmailAddressInput from "./sellerRegistrationInput/EmailAddressInput";
import MobileNumberInput from "./sellerRegistrationInput/MobileNumberInput";
import PasswordInput from "./sellerRegistrationInput/PasswordInput";
import PasswordComfirmInput from "./sellerRegistrationInput/PasswordComfirmInput";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./VendorSignUp.module.css";
import { faStaylinked } from "@fortawesome/free-brands-svg-icons";
import clsx from "classnames";
import { useEffect, useRef, useState } from "react";
import Container from "layouts/container/Container";
import { requester } from "App";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VendorSignUp(props) {
  const emailData = [
    {
      id: 1,
      email: "Email Address",
    },
  ];

  const mobileData = [
    {
      id: 1,
      mobileNumber: "MobileNumber",
    },
  ];

  const passwordData = [
    {
      id: 1,
      loginPassword: "Login Password",
    },
  ];

  const passwordComfirmData = [
    {
      id: 1,
      confirmPassword: "Confirm Password",
    },
  ];

  const emailCheck =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  const mobileNumberCheck = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  const passwordComfirmInput = useRef();
  const passwordInput = useRef();
  const emailAddressInput = useRef();
  const mobileNumberInput = useRef();

  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  const [passwordComfirm, setPasswordComfirm] = useState();
  const navigate = useNavigate();

  const callbackEmail = (a) => {
    setEmail(a);
    emailAddressInput.current.getValue();
    
  };

  const callbackMobile = (b) => {
    setMobile(b);
    mobileNumberInput.current.getValue();
    
  };

  const callbackPassword = (c) => {
    setPassword(c);
    passwordComfirmInput.current.getValue();
    
  };

  const callbackPasswordComfirm = (d) => {
    setPasswordComfirm(d);
    passwordInput.current.getValue();
    
  };

  const onSignUpButtonClick = () => {
    let data = {
      userName: emailAddressInput.current.getValue(),
      password: passwordInput.current.getValue(),
      mobileNo: mobileNumberInput.current.getValue(),
    };
    
    requester.userSignUp(data, (result) => {
    
      if (result.code === 0) {
        toast.success("가입되었습니다", {
          autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER, onClose: () => {
            navigate("/seller/signIn");
          }
        });
        navigate("/seller/signIn");
      } else {
        toast.error("중복된 아이디", {
          autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
        });
      }

    });
  };

  return (
    <Container width={600}>
      <HorizontalFlex>
        <VerticalFlex>
          <FlexChild>
            <VerticalFlex>
              <FlexChild>
                <EmailAddressInput data={emailData[0]} emailAdressVisible={true} emailCheck={emailCheck} ref={emailAddressInput} callback={callbackEmail} />
              </FlexChild>
              <FlexChild>
                <MobileNumberInput data={mobileData[0]} moblieVisible={true} moblieCheck={mobileNumberCheck} ref={mobileNumberInput} callback={callbackMobile} />
              </FlexChild>
              <FlexChild>
                <PasswordInput data={passwordData[0]} ref={passwordInput} passwordVisible={true} target={passwordComfirm} callback={callbackPassword} />
              </FlexChild>
              <FlexChild>
                <PasswordComfirmInput data={passwordComfirmData[0]} ref={passwordComfirmInput} passwordComfirmVisible={true} target={password} callback={callbackPasswordComfirm} />
              </FlexChild>
              <FlexChild>
                <a className={style.buttonEclipse} onClick={onSignUpButtonClick} >가입</a>
              </FlexChild>
            </VerticalFlex>
          </FlexChild>
        </VerticalFlex>
      </HorizontalFlex>
    </Container>
  );
}

export default VendorSignUp;
