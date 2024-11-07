import style from "./CartButton.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalMiddleWrapper from "layouts/wrapper/VerticalMiddleWrapper";
import Dummy from "components/Dummy";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import CIcon from "@coreui/icons-react";
import { cilCart } from "@coreui/icons";

function CartButton(props) {
  const url = "/shopping/cart";
  const { products } = useSelector((state) => ({
    products: state.cart.products,
  }));
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (products) {
      let sum = 0;
      products.map((product) => {
        sum += product.quantity;
      });
      setQuantity(sum);
    }
  }, [products]);

  return (
    <Link to={url}>
      <div className={style.cart}>
        <div className={style.icon}>
          {/* <CIcon icon={cilCart} width={props.width} color={props.color} /> */}
          <CustomIcon name={props.icon || "shoppingBag"} width={props.width} color={props.color} notification={quantity > 0} />
        </div>
      </div>
    </Link>
  );
}

export default CartButton;