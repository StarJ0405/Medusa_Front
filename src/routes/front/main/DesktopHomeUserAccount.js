import style from "./DesktopHomeUserAccount.module.css";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { removeLocalStorage } from "shared/utils/Utils";
import useAltEffect from "shared/hooks/useAltEffect";
import NiceModal from "@ebay/nice-modal-react";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import Seperator from "components/Separator";
import Inline from "layouts/container/Inline";
import Dummy from "components/Dummy";
import P from "components/P";
import visacard from "resources/img/paymentMethod/visa_logo.png";
import mastercard from "resources/img/paymentMethod/mastercard_logo.png";
import alipay from "resources/img/paymentMethod/alipay_logo.jpg";
import wechatpay from "resources/img/paymentMethod/wechatpay_logo.png";
import unionpay from "resources/img/paymentMethod/unionpay_logo.png";
import paypal from "resources/img/paymentMethod/paypal_logo.png";
import Center from "layouts/wrapper/Center";
import Container from "layouts/container/Container";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { AuthContext } from "providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { requester } from "App";
import { useTranslation } from "react-i18next";


function DesktopHomeUserAccount() {
    const { t } = useTranslation();
    const { userName } = useContext(AuthContext);
    const navigate = useNavigate();
    const characteristics = [
        { id: 0, title: t("onlineService"), icon: fas["faBagShopping"] },
        { id: 1, title: t("internationalPayment"), icon: fas["faCreditCard"] },
        { id: 2, title: t("authenticDirectDelivery"), icon: fas["faEarthAsia"] },
        { id: 3, title: t("afterSalesPolicy"), icon: fas["faCoins"] }
    ];

    const paymentMethods = [
        { id: 0, title: "Visa Card", icon: visacard },
        { id: 1, title: "Master Card", icon: mastercard },
        { id: 2, title: "Alipay", icon: alipay },
        { id: 3, title: "Wechatpay", icon: wechatpay },
        { id: 4, title: "Unionpay", icon: unionpay },
        { id: 5, title: "Paypal", icon: paypal }
    ];


    const [isLogin, setLogin] = useState(false);
    const [createCoupon, setCreateCoupon] = useState([
        {
            id: 1,
            name: "[가입혜택] 무료배송 쿠폰",
            image: "/couponImg/coupon1.png",
            term: 1,
            limitTerm: 150,
            type: "FREESHIPPING",
            benefit: 0
        },
        {
            id: 2,
            name: "[가입혜택] 10%할인 쿠폰",
            image: "/couponImg/coupon2.png",
            term: 10,
            limitTerm: 150,
            type: "SALE",
            benefit: 10
        },
        {
            id: 3,
            name: "[가입혜택] 20%할인 쿠폰",
            image: "/couponImg/coupon3.png",
            term: 10,
            limitTerm: 150,
            type: "SALE",
            benefit: 20
        },
    ]);

    const onSignOutClick = () => {
        removeLocalStorage("token");
        window.location.replace("/");
    }

    useAltEffect(() => {
        if (userName) {
            
            setLogin(true);
        }
    }, [userName]);



    const onClickSignIn = () => {
        NiceModal.show("memberSignIn");
    };
    const onClickSignUp = () => {
        NiceModal.show("memberSignTabModal", { width: "60%", height: "800px", overflow: "scroll", initTabIndex: 0 });
    };
    const onOrderClick = () => {
        navigate("/mypage");
    }

    return (
        <Container width={400}>
            <PaddingWrapper padding={"0px 0px 0px 10px"}>
                <VerticalFlex gap={20} padding={"15px 20px"} backgroundColor={"white"}>
                    <FlexChild height={50} padding={"0px 10px"}>
                        <Center>
                            {
                                isLogin ?
                                    <P weight={"bold"} size={15}>{userName} {t("hi")}</P>
                                    : <P weight={"bold"} size={15}>{t("hello")}</P>
                            }
                        </Center>
                    </FlexChild>
                    <FlexChild height={40}>
                        <HorizontalFlex gap={20} >
                            <FlexChild height={"100%"}>
                                {
                                    isLogin ?
                                        <ButtonEclipse backgroundColor={"var(--main-color)"} text={t("order")} fontSize={15} onClick={onOrderClick} />
                                        : <ButtonEclipse backgroundColor={"var(--main-color)"} text={t("signUp")} fontSize={15} onClick={onClickSignUp} />
                                }
                            </FlexChild>
                            <FlexChild height={"100%"}>
                                {
                                    isLogin ?
                                        <ButtonEclipse backgroundColor={"var(--loginButton-color)"} text={t("signOut")} color={"black"} fontSize={15} onClick={onSignOutClick} />
                                        : <ButtonEclipse backgroundColor={"var(--loginButton-color)"} text={t("signIn")} color={"black"} fontSize={15} onClick={onClickSignIn} />
                                }
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild>
                        <Seperator color={"var(--characteristic-color)"} height={"1px"} />
                    </FlexChild>
                    <FlexChild height={80}>
                        <HorizontalFlex gap={0} flexWrap={"wrap"} padding={10}>
                            {
                                characteristics.map((characteristic, index) =>
                                    <FlexChild flexWrap={"wrap"} flex={"1 1 40%"} height={"30px"} key={index}>
                                        <HorizontalFlex gap={5}>
                                            <FlexChild width={"fit-content"}>
                                                <Center>
                                                    <FontAwesomeIcon icon={characteristic.icon} color={"var(--characteristic-color)"} />
                                                </Center>
                                            </FlexChild>
                                            <FlexChild alignItems={"center"}>
                                                <P color={"#5e5e5e"} size={"13px"}>{characteristic.title}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                )
                            }
                        </HorizontalFlex>
                    </FlexChild>
                    {/* <FlexChild>
                        <HorizontalFlex gap={10} flexWrap={"wrap"} alignItems={"stretch"}>
                            {
                                paymentMethods.map((paymentMethod, index) =>
                                    <FlexChild flexWrap={"wrap"} flex={"1 1 30%"} key={index}>
                                        <div className={style.paymentMethodIcon}>
                                            <Center>
                                                <img className={style.image} src={paymentMethod.icon} />
                                            </Center>
                                        </div>

                                    </FlexChild>
                                )
                            }
                        </HorizontalFlex>
                    </FlexChild> */}
                </VerticalFlex>
            </PaddingWrapper>

        </Container>
    );
}

export default DesktopHomeUserAccount;