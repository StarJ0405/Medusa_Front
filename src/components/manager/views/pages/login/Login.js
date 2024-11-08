import NiceModal from "@ebay/nice-modal-react";
import { requester, medusaRequester } from "App";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import InputEmail from "components/inputs/InputEmail";
import InputPassword from "components/inputs/InputPassword";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import ModalBase from "modals/base/ModalBase";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AuthReducer } from "shared/redux/reducers/auth/AuthReducer";
import { validateInputs } from "shared/utils/Utils";
import style from "./Login.module.css"
import logoCircle from "resources/img/logoCircle.png"
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo4 } from "resources/img/logo/03.svg";
import { emailFormat, mobileNoFormat, passwordFormat } from "InitialData/regExp";
import { ToastContainer, toast } from "react-toastify";
import WorldvapeLogo from "resources/img/logo/worldvape_logo.png";
import Center from "layouts/wrapper/Center";
import medusaClient from "shared/MedusaClient";
import { getOrSetCart, logIn, setCookie } from "shared/medusa/action";

function Login(props) {
  const { t } = useTranslation();
  const inputsSignIn = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMobile } = useContext(BrowserDetectContext);
  const [hasCookie, setHasCookie] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const onSignInClick = () => {
    signIn();
  }
  const onSignUpClick = () => {
    NiceModal.show("memberSignTabModal");
  }

  const signIn = async () => {
    let data = { email: "", password: "" };
    // validateInputs(inputsSignIn.current).then((result) => {

    //   if (result.isValid) {
    //     data.userId = inputsSignIn.current[0].getValue();
    //     data.password = inputsSignIn.current[1].getValue();

    //     requester.userSignIn(data, (result) => {
    //       console.log("loginResult", result);
    //       if (result.code === -1) {
    //         if (result.message === "Not found data") {
    //           //존자하지 않는 아이디
    //           toast.error(t("noUserName"), {
    //             autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
    //           });
    //         } else if (result.message === "Bad credentials") {
    //           //비번틀림
    //           toast.error(t("noPassword"), {
    //             autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
    //           });
    //         }
    //       } else if (result.code === 0) {
    //         let tokenData = result.data.token;
    //         dispatch(AuthReducer.actions.setToken(tokenData));
    //         navigate("/");
    //         if (props.callback) {
    //           props.callback(true);
    //         }
    //       }
    //     });
    //   } else {
    //     toast.error(t("pleaseCheckedLoginInfo"), {
    //       autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
    //     });
    //   }
    // });
    data.email = inputsSignIn.current[0].getValue();
    data.password = inputsSignIn.current[1].getValue();



    if (data.email !== "" && data.password !== "") {

      // logIn(data);


      // medusaRequester.customerSignIn(data, (result) => {
      //   console.log("로그인 데이터 : ", data)
      //   console.log("로그인 성공했냐? : ", result)
      //   // setList(result.product_category.products);
      // });
      // try {
      //   const response = await medusa.auth.createSession({
      //     email : data.email,
      //     password : data.password,
      //   });

      //   // 로그인 성공 시, 토큰을 쿠키에 저장
      //   const token = response.accessToken;

      //   // 쿠키에 토큰 저장 (예시: expires: 1일 후 만료)
      //   Cookies.set("medusa_token", token, {
      //     expires: 1, // 만료 기간 (1일)
      //     secure: process.env.NODE_ENV === "production", // HTTPS 환경에서만 사용
      //     sameSite: "strict", // SameSite 정책 설정
      //   });

      //   alert("로그인 성공");
      // } catch (error) {
      //   console.error("로그인 오류:", error);
      //   alert("로그인 실패");
      // }
      // medusaClient.auth.authenticate({
      //   email: data.email,
      //   password: data.password
      // })
      //   .then(({ customer }) => {
      //     console.log(customer.id)
      //   })




      medusaClient.auth.getToken({
        email: data.email,
        password: data.password
      })
        .then(({ access_token }) => {
          setCookie("_medusa_jwt", access_token, 1);
          setHasCookie(true);
        })
    }
  }

  useEffect(() => {
    if (hasCookie) {
      medusaClient.auth.getSession()
        .then(({ customer }) => {
          console.log("userInfo : ", customer);
          setCurrentCustomer(customer);
        })
    }
  }, [hasCookie])

  useEffect(() => {
    if (currentCustomer !== null) {
      getOrSetCart('kr');
      navigate("/");
    }
  }, [currentCustomer])

  const onKeyPress = (event) => {
    if (event.keyCode === 13) {
      signIn();
    }
  }

  const buttonStyle = {
    // width: "150px",
    '--cui-btn-line-height': '23px',
    '--cui-btn-color': 'black',
    backgroundColor: "white",
    color: "var(--font-color)",
  }

  return (
    <div className={style.wrap}>
      <VerticalFlex gap={10}>
        <FlexChild />
        <FlexChild height={70}>
          <Center width={"70%"}>
            <img src={WorldvapeLogo} width={"100%"} />
          </Center>
        </FlexChild>
        <FlexChild height={30}>
          <div className={style.dummy}></div>
        </FlexChild>
        <FlexChild alignItems={"flex-start"}>
          <InputEmail onKeyPress={onKeyPress} size={"lg"} signIn ref={el => (inputsSignIn.current[0] = el)} placeHolder={"아이디"} />
        </FlexChild>
        <FlexChild >
          <InputPassword onKeyPress={onKeyPress} size={"lg"} signIn ref={el => (inputsSignIn.current[1] = el)} placeHolder={t("password")} confirmVisible={false} />
        </FlexChild>
        <FlexChild height={150}>
          <div className={style.dummy}></div>
        </FlexChild>
        <FlexChild>
          <HorizontalFlex justifyContent={"center"} gap={15}>
            <FlexChild height={40}>
              <ButtonEclipse fontSize={"19px"} backgroundColor={"var(--main-color)"} text={t("signIn")} onClick={onSignInClick} />
            </FlexChild>
            <FlexChild height={40}>
              <ButtonEclipse fontSize={"19px"} color={"black"} border={"1px solid black"} text={t("signUp")} onClick={onSignUpClick} />
            </FlexChild>
          </HorizontalFlex>
        </FlexChild>
        <FlexChild />
      </VerticalFlex>
    </div>
  );
}

export default Login;