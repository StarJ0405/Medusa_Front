import Container from "layouts/container/Container";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import EmailAddressSignInInput from "./sellerSigninInput.js/EmailAddressSignInInput";
import PasswordSignInInput from "./sellerSigninInput.js/PasswordSignInInput";
import SellerSignInMessage from "./sellerSigninInput.js/SellerSignInMessage";
import style from "./VendorSignIn.module.css";
import { useEffect, useRef, useState } from "react";
import { requester } from "App";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signIn, goToHome, getAuthToken } from "shared/redux/reducers/auth/AuthReducer";
import { useSelector, useDispatch } from 'react-redux';
import { AuthReducer } from "shared/redux/reducers/auth/AuthReducer";
import { toast, ToastContainer } from "react-toastify";

function VendorSignIn(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailData = [
    {
      id: 1,
      account: "Account:",
    },
  ];

  const passwordData = [
    {
      id: 1,
      password: "Password:",
      forgot: "Forgot Password?",
    },
  ];

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isValid, setValid] = useState(false);
  const [isEmpty, setEmpty] = useState(true);
  const [hasToShow, setShow] = useState(false);

  const callbackEmail = (email) => {
    setEmail(email);
  };

  const callbackPassword = (password) => {
    setPassword(password);
  };

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

  const emailAddressInput = useRef();

  const passwordSignInInput = useRef();

  const onClick = () => {
    let data = { userId: emailAddressInput.current.getValue(), password: passwordSignInInput.current.getValue() };
    requester.userSignIn(data, (result) => {
      if (result.code === -1) {
        if (result.message === "Not found data") {
          //존자하지 않는 아이디
          
          toast.error("존자하지 않는 아이디", {
            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
          });
        } else if (result.message === "Bad credentials") {
          //비번틀림
          
          toast.error("비번틀림", {
            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
          });
        }
      } else if (result.code === 0) {
        let tokenData = result.data;
        dispatch(AuthReducer.actions.setToken(tokenData));
        navigate("/seller/dashboard");
      }
    });
  }




  return (
    <Container width={362} height={290}>
      <HorizontalFlex>
        <VerticalFlex>
          <FlexChild>
            <div className={style.messageTextBox}>
              <p>
                Please login with the seller account (do not use the buyer
                account)
              </p>
            </div>
          </FlexChild>
          <FlexChild>
            <SellerSignInMessage target1={email} target2={password} />
          </FlexChild>

          <FlexChild>
            <VerticalFlex>
              <FlexChild>
                <EmailAddressSignInInput
                  callback={callbackEmail}
                  ref={emailAddressInput}
                  accountVisible={true}
                  data={emailData[0]}
                />
              </FlexChild>
              <FlexChild>
                <PasswordSignInInput
                  callback={callbackPassword}
                  ref={passwordSignInInput}
                  passwordVisible={true}
                  data={passwordData[0]}
                />
              </FlexChild>
            </VerticalFlex>
          </FlexChild>
          <FlexChild>
            <a onClick={onClick} className={style.signInButton}>
              Sign In
            </a>
          </FlexChild>

          <FlexChild>
            <a className={style.sellerRegister}>Join & sell global today!</a>
          </FlexChild>
        </VerticalFlex>
      </HorizontalFlex>
    </Container>
  );
}

export default VendorSignIn;
