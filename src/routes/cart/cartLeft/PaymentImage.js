import style from "./PaymentImage.module.css";
import payment from "resources/img/payment.png";
import alipay_logo from "resources/img/paymentMethod/alipay_logo.jpg";
import mastercard_logo from "resources/img/paymentMethod/mastercard_logo.png";
import paypal_logo from "resources/img/paymentMethod/paypal_logo.png";
import unionpay_logo from "resources/img/paymentMethod/unionpay_logo.png";
import visa_logo from "resources/img/paymentMethod/visa_logo.png";
import wechatpay_logo from "resources/img/paymentMethod/wechatpay_logo.png";
function PaymentImage(props) {
  const {image} = props;

  return (
    <div className={style.paymentImage}>
      <img src={image} className={style.img} />
    </div>
  );
}
export default PaymentImage;
