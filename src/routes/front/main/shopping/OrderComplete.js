import style from "./OrderSummary.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { useParams, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";
import { useState, useEffect, useContext, useRef } from "react";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import CartProduct from "routes/cart/cartLeft/CartProduct";
import SingleSummary from "routes/order/summary/SingleSummary";
import OrderSummaryGuide from "routes/order/summary/OrderSummaryGuide";
import useAltEffect from "shared/hooks/useAltEffect";
import { between, calculateDeliveryFee, clone, decode } from "shared/utils/Utils";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCreditCard, fas } from "@fortawesome/free-solid-svg-icons";
import Inline from "layouts/container/Inline";
import { t } from "i18next";
import FixedHeader from "layouts/container/FIxedHeader";
import BackButton from "components/buttons/BackButton";
import Center from "layouts/wrapper/Center";
import Dummy from "components/Dummy";
import P from "components/P";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import FixedFooter from "layouts/container/FixedFooter";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import visacard from "resources/img/paymentMethod/visa_logo.png";
import mastercard from "resources/img/paymentMethod/mastercard_logo.png";
import alipay from "resources/img/paymentMethod/alipay_logo.jpg";
import wechatpay from "resources/img/paymentMethod/wechatpay_logo.png";
import unionpay from "resources/img/paymentMethod/unionpay_logo.png";
import paypal from "resources/img/paymentMethod/paypal_logo.png";
import { useSelector } from "react-redux";
import OrderProducttRow from "./OrderProducttRow";
import Container from "layouts/container/Container";
import { ToastContainer } from "react-toastify";
import CircleWrapper from "layouts/wrapper/CircleWrapper";
import CIcon from "@coreui/icons-react";
import { cilCreditCard, cilLocationPin } from "@coreui/icons";
import { stubFalse } from "lodash-es";
import { useTranslation } from "react-i18next";
import { ShoppingProcessType } from "shared/constants/constants";
import ShippingInfo from "./ShippingInfo";
import { useDispatch } from "react-redux";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import checkMark from "resources/img/icons/checkMark.png"
import { AuthContext } from "providers/AuthProvider";
import AccountNo from "../productList/AccountNo";

function OrderComplete(props) {
    const { id } = useParams();
    const location = useLocation();
    const { userName } = useContext(AuthContext);
    const { t } = useTranslation();
    const { setViewData } = useOutletContext();
    const title = t("orderComplete");
    const footterButtonText = t("goToHome");
    const currentProcess = ShoppingProcessType.ORDER_COMPLETE;
    console.log(currentProcess);
    const { isMobile } = useContext(BrowserDetectContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [shippingInfo, setShippingInfo] = useState();
    const paymentMethods = [
        { id: 0, title: "Visa Card", icon: visacard },
        { id: 1, title: "Master Card", icon: mastercard },
        { id: 2, title: "Alipay", icon: alipay },
        { id: 3, title: "Wechatpay", icon: wechatpay },
        { id: 4, title: "Unionpay", icon: unionpay },
        { id: 5, title: "Paypal", icon: paypal }
    ];
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
    const [orderData, setOrderData] = useState();
    const [user, setUser] = useState();



    useEffect(() => {

        requester.getAllCartProducts((result) => {
            if (result.code === 0) {
                dispatch(CartReducer.actions.refreshCart(result.data));
            } else if (result.code === 401) {

            }
        })
    }, []);


    useEffect(() => {
        requester.findSelf((result) => {
            setUser(result.data);
        });
    }, [userName]);


    useEffect(() => {

        if (orderData) {
            let shippingInfo = {
                receiverName: orderData.receiverName,
                mobileNo: orderData.mobileNo,
                postalCodeLabel: orderData.postalCodeLabel,
                provinceLabelCn: orderData.provinceLabelCn,
                cityLabelCn: orderData.cityLabelCn,
                addressDetail: orderData.addressDetail
            };


            let sum = 0;

            orderData.orderProducts.map((row) => {
                sum += row.quantity * (row.product.currentPrice ? row.product.currentPrice : row.product.price);
            });

            let totalPrice = sum;
            let vat = orderData.vat;
            let deliveryFee = orderData.deliveryFee;
            let amount = sum + vat + deliveryFee;


            let data = {
                title: title,
                footterButtonText: footterButtonText,
                currentProcess: currentProcess,
                totalCount: orderData.orderProducts.length,
                selectedCount: orderData.orderProducts.length,
                priceSum: totalPrice,
                vat: Math.floor(totalPrice * 0.1),
                deliveryFee: deliveryFee,
                discountSum: 0,
                totalAmount: amount,
                onDeleteSelectedProductsClick: null,
                onSubmitButtonClick: null
            }
            setViewData(data);
        }
    }, [orderData]);

    useEffect(() => {
        if (location && location.state) {
            let orderData = location.state.orderData;
            let paymentMethod = location.state.paymentMethod;

            setOrderData(orderData);
            setPaymentMethod(paymentMethod);
        }
        let data = {
            title: title,
            footterButtonText: footterButtonText,
            currentProcess: currentProcess,
            totalCount: null,
            selectedCount: null,
            priceSum: null,
            vat: null,
            deliveryFee: null,
            discountSum: 0,
            totalAmount: null,
            onDeleteSelectedProductsClick: null,
            onSubmitButtonClick: null
        }
        setViewData(data);
    }, [location]);


    const onOrderDetailClick = () => {
        navigate("/mypage/trackOrder");
    }
    const onGoToHomeClick = () => {
        navigate("/");
    }


    return (
        <VerticalFlex height={"initial"} gap={20}>
            <FlexChild>
                <VerticalFlex gap={30}>
                    <FlexChild>
                        <img src={checkMark} width={"10%"} />
                    </FlexChild>
                    <FlexChild>
                        <Container maxWidth={500}>
                            <div style={{ border: "10px solid #ddd", borderRadius: "20px" }}>
                                <PaddingWrapper padding={20}>
                                    <VerticalFlex gap={15}>
                                        <FlexChild>
                                            <P weight={"bold"} size={23}>{t("orderComplete")}</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <P size={15}>{"아래의 계좌로 입급해주시면 결제가 완료됩니다"}</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <Container maxWidth={500}>
                                                <div style={{ borderTop: "2px solid #ddd" }}>
                                                    <VerticalFlex>
                                                        <FlexChild>
                                                            <AccountNo />
                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </div>
                                            </Container>
                                        </FlexChild>
                                    </VerticalFlex>
                                </PaddingWrapper>
                            </div>
                        </Container>
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                        <HorizontalFlex gap={20}>
                            <FlexChild justifyContent={"flex-end"}>
                                <P onClick={onOrderDetailClick} cursor size={"9pt"} padding={"1px 25px"} border={"1px solid #999"}>{t("orderHistory")}</P>
                            </FlexChild>
                            <FlexChild>
                                <P onClick={onGoToHomeClick} cursor weight={"bold"} size={"9pt"} padding={"1px 20px"} color={"var(--main-color)"} border={"1px solid var(--main-color)"}>{t("goShopping")}</P>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    {/* {
                        isMobile
                            ?
                            <FlexChild>
                                <VerticalFlex gap={30}>
                                    <FlexChild>
                                        <VerticalFlex>
                                            <FlexChild padding={"0 0 10px 0"}>
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P size={24} weight={"bold"}>{t("shippingInfo")}</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.titleLine}></div>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"initial"} padding={"15px"} backgroundColor={"#eee"}>
                                                        <P>{t("name")}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P> {orderData && orderData.receiverName}</P>
                                                    </FlexChild>

                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"initial"} padding={"15px"} backgroundColor={"#eee"}>
                                                        <P>{t("address")}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P> {orderData && orderData.provinceLabel + orderData.cityLabel + orderData.addressDetail + `(${orderData.postalCodeLabel})`}</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.longLine}></div>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <VerticalFlex>
                                            <FlexChild padding={"0 0 10px 0"}>
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P size={24} weight={"bold"}>{t("paymentInfo")}</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.titleLine}></div>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex gap={10}>
                                                    <FlexChild width={"initial"} padding={"15px"} backgroundColor={"#eee"}>
                                                        <P>{t("amountOfPayment")}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P size={"14pt"} weight={"bold"} color={"var(--main-color)"}> {orderData && orderData.vat + orderData.price + orderData.deliveryFee}&#8361;</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"initial"} padding={" 40px 15px"} backgroundColor={"#eee"}>
                                                        <P>{t("paymentMethod")}</P>
                                                    </FlexChild>
                                                    <FlexChild padding={"15px"}>
                                                        <P>{paymentMethod.title}</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.longLine}></div>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                            :
                            <FlexChild>
                                <HorizontalFlex gap={70} alignItems={"flex-start"}>
                                    <FlexChild width={"40%"}>
                                        <VerticalFlex>
                                            <FlexChild padding={"0 0 10px 0"}>
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P size={24} weight={"bold"}>{t("shippingInfo")}</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.titleLine}></div>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"initial"} padding={"15px"} backgroundColor={"#eee"}>
                                                        <P>{t("name")}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P> {orderData && orderData.receiverName}</P>
                                                    </FlexChild>

                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"initial"} padding={"15px"} backgroundColor={"#eee"}>
                                                        <P>{t("address")}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P> {orderData && orderData.provinceLabel + orderData.cityLabel + orderData.addressDetail + `(${orderData.postalCodeLabel})`}</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.longLine}></div>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                    <FlexChild>
                                        <VerticalFlex>
                                            <FlexChild padding={"0 0 10px 0"}>
                                                <Center width={"100%"} textAlign={"left"}>
                                                    <P size={24} weight={"bold"}>{t("paymentInfo")}</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.titleLine}></div>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex gap={10}>
                                                    <FlexChild width={"initial"} padding={"15px"} backgroundColor={"#eee"}>
                                                        <P>{t("amountOfPayment")}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P size={"14pt"} weight={"bold"} color={"var(--main-color)"}> {orderData && orderData.vat + orderData.price + orderData.deliveryFee}&#8361;</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild width={"initial"} padding={" 40px 15px"} backgroundColor={"#eee"}>
                                                        <P>{t("paymentMethod")}</P>
                                                    </FlexChild>
                                                    <FlexChild padding={"15px"}>
                                                        <P>{paymentMethod.title}</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <div className={style.longLine}></div>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                    } */}
                </VerticalFlex>
            </FlexChild>
        </VerticalFlex>

    );
}

export default OrderComplete;