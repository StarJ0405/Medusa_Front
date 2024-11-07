import { requester } from "App";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import InputNumber from "components/inputs/InputNumber";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { AuthContext } from "providers/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import { OrderInfoReducer } from "shared/redux/reducers/shopping/OrderInfoReducer";
import { addCommas, calculateDeliveryFee, validateInputs } from "shared/utils/Utils";
import style from "./ProductDetailOrderSummary.module.css";
import NiceModal from "@ebay/nice-modal-react";

function ProductDetailOrderSummary(props) {
    const { t } = useTranslation();
    const { product } = props;
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState(0);
    const [productTotalPrice, setProductTotalPrice] = useState(0);
    const [deli, setDeli] = useState(0);
    const [productVat, setProductVat] = useState(0);
    const inputs = useRef([]);
    const dispatch = useDispatch();
    const { userName } = useContext(AuthContext);
    const navigate = useNavigate();

    const onQuantityChange = (quantity) => {
        setQuantity(quantity);
    }

    const onAddCartClick = () => {
        validateInputs(inputs.current).then((result) => {
            if (result.isValid) {
                let quantity = inputs.current[0].getValue();
                let data = { productId: product.id, quantity: quantity };
                requester.addCart(data, (result) => {
                    if (result.code === 0) {
                        dispatch(CartReducer.actions.refreshCart(result.data));
                        toast.success(t("putInAShoppingCart"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    } else if (result.code === 401) {
                        NiceModal.show("memberSignIn");
                        // toast.error(t("pleaseLogin"), {
                        //     autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        // });
                    }

                });
            } else {
                toast.error(t("pleaseCheckTheQuantity"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        });
    }

    const onPurchaseClick = () => {
        if (userName) {
            validateInputs(inputs.current).then((result) => {
                if (result.isValid) {
                    let quantity = inputs.current[0].getValue();
                    let data = { product: product, quantity: quantity };
                    let orderProductList = [];
                    orderProductList.push(data);
                    dispatch(OrderInfoReducer.actions.refreshOrderProducts(orderProductList));
                    navigate("/shopping/orderSummary");
                } else {
                    toast.error(t("pleaseCheckTheQuantity"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            });
        } else {
            NiceModal.show("memberSignIn");
            // toast.error(t("pleaseLogin"), {
            //     autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            // });
        }
    }

    useEffect(() => {
        if (product) {
            let sum = 0;
            let sumQuantity = 0;
            sum += quantity * (product.currentPrice ? product.currentPrice : product.price);
            sumQuantity += quantity;

            let deliveryFee = calculateDeliveryFee(sum, sumQuantity);

            let totalPrice = sum;
            setProductTotalPrice(totalPrice);
            let vat = Math.floor(sum * 0.1);
            setProductVat(vat);

            setDeli(deliveryFee);
            let amount = (sum + vat + deliveryFee);
            setAmount(amount);
        }
    }, [quantity]);

    return (
        <div>
            {
                product &&
                <VerticalFlex gap={10}>
                    <FlexChild>
                        <Center textAlign={"left"} width={"100%"}>
                            <P weight={"bold"} size={"16pt"}>{t("amountOfPayment")}</P>
                        </Center>
                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex>
                            <P>{t("product")}{t("totalAmount")}</P>
                            <P weight={"bold"}>{addCommas(productTotalPrice)}&#8361;</P>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex>
                            <P>{t("deliveryFee")}</P>
                            <P>{addCommas(deli)}&#8361;</P>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex>
                            <P>{t("vat")}</P>
                            <P>{addCommas(productVat)}&#8361;</P>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild padding={"10px 0"}>
                        <div className={style.line}></div>
                    </FlexChild>
                    <FlexChild>
                        <HorizontalFlex>
                            <P>{t("totalAmount")}</P>
                            <P weight={"bold"} color={"var(--main-color)"}>{addCommas(amount)}&#8361;</P>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild padding={"10px 0"}>
                        <div className={style.line}></div>
                    </FlexChild>
                    <FlexChild>
                        <P>{t("quantity")}</P>
                    </FlexChild>
                    <FlexChild>
                        <InputNumber ref={el => (inputs.current[0] = el)} min={0} max={100} required={true} onChange={onQuantityChange} />
                    </FlexChild>
                    <FlexChild>
                        <ButtonEclipse height={38} text={t("buyNow")} onClick={onPurchaseClick} borderRadius={5} backgroundColor={"white"} fontWeight={"bold"} color={"var(--main-color)"} border={"2px solid var(--main-color)"} />
                    </FlexChild>
                    <FlexChild>
                        <ButtonEclipse height={38} text={t("cart")} onClick={onAddCartClick} borderRadius={5} backgroundColor={"var(--main-color)"} fontWeight={"bold"} />
                    </FlexChild>
                    {/* <FlexChild>
                <CheckCircleGroup callback={onCheckGroupCallback}
                    flexStart
                    padding={"0 15px"}
                    header={
                        [
                            { width: "90%", text: t("agreeToTheTermsBelow"), alignItems: "center" },
                        ]
                    }
                >
                    {
                        rowIndex &&
                        rowIndex.map((data, index) => (
                            <Terms orderSummary data={data} key={index} index={index} />
                        ))
                    }
                </CheckCircleGroup>
            </FlexChild>
            <FlexChild padding={"10px 0 0 0"}>
                <ButtonEclipse onClick={onOrderButtonClick} lineHeight={"44px"} fontWeight={"bold"} fontSize={"14pt"} height={44} backgroundColor={"var(--main-color)"} currencySymbol text={`${amount} ${t("makeAPayment")} `} />

            </FlexChild> */}
                </VerticalFlex>
            }

        </div>

    );
}

export default ProductDetailOrderSummary;