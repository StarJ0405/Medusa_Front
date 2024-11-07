import ProductCard from "components/card/product/ProductCard";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect } from "react";
import style from "./CartProduct.module.css";

function CartProduct(props) {
  const { data } = props;
  


  return (
    <div className={style.cartProductContainer}>
      <VerticalFlex>
        <FlexChild>
          <HorizontalFlex>
            <FlexChild>
              <div className={style.seller}>
                <input type={"checkbox"} className={style.allCheckBox} />
                <p className={style.sellerName}>HANSONG 3C Store</p>
                <a className={style.sellerContact}>연락처</a>
              </div>
            </FlexChild>
            <FlexChild>
              <a className={style.coupon}>쿠폰 받기</a>
            </FlexChild>
          </HorizontalFlex>
        </FlexChild>
        <FlexChild>
          <div className={style.border}></div>

        </FlexChild>
        <FlexChild>
          <HorizontalFlex flexStart={true}>
            <FlexChild width={35}>
              <input type={"checkbox"} className={style.inputBox} />
            </FlexChild>
            <FlexChild width={120} height={120}>
              {/* <ProductCard template="basic" data={data.product} /> */}
            </FlexChild>
            <FlexChild>
              <div className={style.titleWrap}>
                {/* <a className={style.productName}>{data.titleKr}</a> */}

                <div className={style.option}>
                  <p className={style.optionTitle}>Color :</p>
                  <p className={style.optionContent}>Salmon</p>
                  <span className={style.color}></span>
                  <p className={style.optionTitle}>Size :</p>
                  <p className={style.optionContent}>iPad Air4 Air5 10.9</p>
                </div>
                <p className={style.price}>₩ 5,664</p>
                <div className={style.priceForm}>
                  <p className={style.realPrice}>₩ 20,230</p>
                  <span className={style.sale}>-72%</span>
                </div>
                <div className={style.deliveryForm}>
                  <p className={style.deliveryPrice}>배송:₩3,294 </p>
                  <p className={style.deliveryMessage}>
                    통하다 Cainiao Standard For Special Goods 5 월 22일에 배송
                    예정 {">"}
                  </p>
                </div>

                </div>
              </FlexChild>
              <FlexChild width={120}>
                <div className={style.iconForm}>
                  <p className={style.deleteIcon}>□</p>
                  <p className={style.wishIcon}>♡</p>
                </div>
                
              </FlexChild>
            </HorizontalFlex>
          </FlexChild>
          <FlexChild>
            <div className={style.buttonContainer}>
              <span className={style.button}>이 판매자로부터 모두 구매</span>
            </div>
          </FlexChild>
        </VerticalFlex>
      </div>
    

  );
}

export default CartProduct;
