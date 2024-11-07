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
import orderFail from "resources/img/icons/orderFail.svg"

function OrderFail(props) {
    const { id } = useParams();
    const location = useLocation();
    const { t } = useTranslation();
    const { isMobile } = useContext(BrowserDetectContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [orderData, setOrderData] = useState();



    useEffect(() => {
        
        requester.getAllCartProducts((result) => {
            if (result.code === 0) {
                dispatch(CartReducer.actions.refreshCart(result.data));
            } else if (result.code === 401) {

            }
        })
    }, []);


    const onOrderSummaryClick = () => {
        navigate("/shopping/orderSummary");
    }
    const onGoToHomeClick = () => {
        navigate("/");
    }


    return (
        <VerticalFlex height={"initial"} gap={20}>
            <FlexChild>
                <VerticalFlex gap={30}>
                    <FlexChild>
                        <Dummy height={60} />
                    </FlexChild>
                    <FlexChild>
                        <img src={orderFail} width={isMobile ? "20%" :"10%"} />
                    </FlexChild>
                    <FlexChild>
                        <P weight={"bold"} size={"16pt"}>{t("주문에 실패하였습니다.")}</P>
                        {/* <Inline>
                            <P weight={"bold"} size={"14pt"}>{t("orderNumber")}&nbsp;</P>
                            <P color={"var(--main-color)"}>{orderData && orderData.id}</P>
                        </Inline> */}
                    </FlexChild>
                    <FlexChild justifyContent={"center"}>
                        <HorizontalFlex gap={20}>
                            <FlexChild justifyContent={"flex-end"}>
                                <P onClick={onOrderSummaryClick} cursor size={"9pt"} padding={"1px 25px"} border={"1px solid #999"}>{t("다시주문하기")}</P>
                            </FlexChild>
                            <FlexChild>
                                <P onClick={onGoToHomeClick} cursor weight={"bold"} size={"9pt"} padding={"1px 20px"} color={"var(--main-color)"} border={"1px solid var(--main-color)"}>{t("goShopping")}</P>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                </VerticalFlex>
            </FlexChild>
        </VerticalFlex>

    );
}

export default OrderFail;