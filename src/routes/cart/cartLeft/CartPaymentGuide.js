import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import style from "./CartPaymentGuide.module.css";
import PaymentImage from "./PaymentImage";
import alipay_logo from "resources/img/paymentMethod/alipay_logo.jpg";
import mastercard_logo from "resources/img/paymentMethod/mastercard_logo.png";
import paypal_logo from "resources/img/paymentMethod/paypal_logo.png";
import unionpay_logo from "resources/img/paymentMethod/unionpay_logo.png";
import visa_logo from "resources/img/paymentMethod/visa_logo.png";
import wechatpay_logo from "resources/img/paymentMethod/wechatpay_logo.png";

function CartPaymentGuide() {
  const imgData = [alipay_logo, mastercard_logo, paypal_logo, unionpay_logo, visa_logo, wechatpay_logo]

  return (
    <div className={style.paymentGuideContainer}>
      <HorizontalFlex flexStart={true}>
        <FlexChild>
          <div>
            <p className={style.payment}>결제방법</p>
            <div className={style.paymentImageForm}>
              {imgData ? imgData.map((data, index) => (
                <PaymentImage image={data} key={index} />
              )): null}
              
            </div>
          </div>
        </FlexChild>
        <FlexChild width={20}>
          <div className={style.border}></div>
        </FlexChild>
        <FlexChild>
          <div className={style.protectContainer}>
            <p className={style.protect}>※ 구매자 보호</p>
            <p className={style.protectMessage}>
              상품이 설명과 다르거나 상품을 받지 못한 경우 환불을 받으실 수
              있습니다.
            </p>
          </div>
        </FlexChild>
      </HorizontalFlex>
    </div>
  );
}

export default CartPaymentGuide;
