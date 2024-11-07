import InputText from "components/inputs/InputText";
import style from "./CartSummary.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import { requester } from "App";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function CartSummary(props) {
    const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    
    const { userId } = useSelector((state) => ({ userId: state.auth.userId }));
    const location = useLocation();

    const result = location.state.result;
    const productList = location.state.productList;
    
    const onClick = () => {
        let data = {orderProducts : productList, quantity: quantity , total: amount}
        requester.orderProducts(data, (result) => {
            
        })
    }

    useEffect(() => {
        let sum = 0;
        let sumQuantity = 0;
        if (productList && productList.length > 0) {
            
            productList.map((row) => {
                sum += row.quantity * row.product.price;
                sumQuantity += row.quantity;
            });
        }
        setAmount(sum);
        setQuantity(sumQuantity);
    }, [productList]);




    return (
        <>

            <div className={style.container}>
                <FlexChild>
                    <p className={style.title}>주문 내역 요약</p>
                    <HorizontalFlex>
                        <p className={style.coupon}>
                            <FontAwesomeIcon icon={faCreditCard} /> 셀렉트 쿠폰
                        </p>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex>
                        <p className={style.coupon}>
                            <FontAwesomeIcon icon={faCreditCard} /> AliExporess 쿠폰
                        </p>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </HorizontalFlex>
                </FlexChild>
                <FlexChild>
                    <div>
                        <p className={style.codeTitle}>프로모션 코드</p>
                        <div className={style.codeWrap}>
                            <input type="text" placeholder="" className={style.code} />
                            <p className={style.codeButton}>적용</p>
                        </div>

                        <div className={style.border}></div>

                        <FlexChild>
                            <HorizontalFlex>
                                <p className={style.priceTitle}>총액</p>
                                <p className={style.price}>{result}</p>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild>
                            <p className={style.button} onClick={onClick}>주문</p>
                        </FlexChild>

                    </div>
                </FlexChild>

            </div>


        </>
    );
}

export default CartSummary;