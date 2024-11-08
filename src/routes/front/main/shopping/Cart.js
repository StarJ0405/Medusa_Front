import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { useContext, useEffect, useRef, useState } from "react";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { Provider, useSelector, useDispatch } from "react-redux";
import useAltEffect from "shared/hooks/useAltEffect";
import { requester, medusaRequester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import Inline from "layouts/container/Inline";
import Center from "layouts/wrapper/Center";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import P from "components/P";
import NiceModal from "@ebay/nice-modal-react";
import { OrderInfoReducer } from "shared/redux/reducers/shopping/OrderInfoReducer";
import CartRow from "./CartRow";
import CircleWrapper from "layouts/wrapper/CircleWrapper";
import { ShoppingProcessType } from "shared/constants/constants";
import AccordionWrapper from "components/accordion/AccordionWrapper";
import style from "./ShoppingLayout.module.css";
import AccordionText from "components/accordion/AccordionText";
import CustomButton from "components/buttons/CustomButton";
import { addCommas, calculateDeliveryFee } from "shared/utils/Utils";
import { getOrSetCart } from "shared/medusa/action";

function Cart(props) {
    const { t } = useTranslation();
    const { setViewData } = useOutletContext();
    const title = t("cart");
    const footterButtonText = t("placeOrder");
    const currentProcess = ShoppingProcessType.CART;
    const { isMobile } = useContext(BrowserDetectContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => ({
        products: state.cart.products,
    }));

    const [selectedList, setSelectedList] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [selectedCount, setSelectedCount] = useState();
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [selectedDeliveryFee, setSelectedDeliveryFee] = useState(0);

    const [medusaCart, setMedusaCart] = useState();
    const [cartItems, setCartItems] = useState([]);

    const fetchMedusaCart = async () => {
        try {
            const cart = await getOrSetCart("kr");
            setMedusaCart(cart);
        } catch (error) {
            console.error("Failed to fetch Medusa cart:", error);
        }
    };

    useAltEffect(() => {
        requester.getAllCartProducts((result) => {
            if (result.code === 0) {
                dispatch(CartReducer.actions.refreshCart(result.data));
            } else if (result.code === 401) {
                // NiceModal.show("memberSignIn");
            }
        })
    }, []);

    useEffect(() => {
        fetchMedusaCart();
    }, [])

    useEffect(() => {
        console.log("medusaCart : ", medusaCart)
        if (medusaCart) {
            setCartItems(medusaCart.items)
        }
    }, [medusaCart])

    const findSelectedProductById = (id) => {
        const key = Object.keys(products).find(product => products[product].id === id);
        return products[key];
    }

    useEffect(() => {
        let data = {
            title: title,
            footterButtonText: footterButtonText,
            currentProcess: currentProcess,
            totalCount: totalCount,
            selectedCount: selectedCount,
            priceSum: selectedAmount,
            vat: Math.floor(selectedAmount * 0.1),
            deliveryFee: selectedDeliveryFee,
            discountSum: 0,
            totalAmount: selectedAmount,
            onDeleteSelectedProductsClick: onDeleteAllClick,
            onSubmitButtonClick: onPurchaseClick
        }
        setViewData(data);
    }, [totalCount, selectedCount, selectedAmount]);

    useEffect(() => {
        if (products) {
            setTotalCount(products.length);
        }
        if (selectedList) {
            let tempList = [];
            selectedList.map((row) => {
                if (row && row.id) {
                    let selectedRow = findSelectedProductById(row.id);
                    tempList.push(selectedRow);
                }
            });
            setSelectedList(tempList);
        }
    }, [products]);

    useEffect(() => {

        if (selectedList) {
            let sum = 0;
            let sumQuantity = 0;
            selectedList.map((row) => {
                if (row) {
                    sum += row.quantity * (row.product.currentPrice ? row.product.currentPrice : row.product.price);
                    sumQuantity += row.quantity;
                } else {

                }
            });
            setSelectedCount(selectedList.length);
            setSelectedAmount(sum);
            setSelectedQuantity(sumQuantity);
            setSelectedDeliveryFee(calculateDeliveryFee(sum, sumQuantity))
        }
        else {
            setSelectedCount(0);
            setSelectedAmount(0);
        }

    }, [selectedList]);

    const onPurchaseClick = () => {
        if (selectedList && selectedList.length > 0) {
            let quantity = 0;
            selectedList.map((product) => {
                quantity += product.quantity;
            });
            if (quantity > 0) {
                dispatch(OrderInfoReducer.actions.refreshOrderProducts(selectedList));
                navigate("/shopping/orderSummary");
            } else {
                toast.error(t("pleaseCheckTheQuantity"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } else {
            toast.error(t("selectProduct"), {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    const onDeleteAllClick = () => {
        if (selectedList && selectedList.length > 0) {
            NiceModal.show("confirm", {
                message: t("confirmCartProductDelete"),
                confirmText: t("delete"),
                cancelText: t("cancel"),
                onConfirm: () => {
                    let requestData = selectedList;
                    requester.deleteCarts(requestData, result => {
                        if (result.code === 0) {
                            dispatch(CartReducer.actions.refreshCart(result.data));
                        }
                    });
                }
            });
        } else {
            toast.error(t("selectProduct"), {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    const onCheckGroupCallback = (checkedIndex) => {
        let selectedProducts = [];
        checkedIndex && checkedIndex.map((index) => {
            selectedProducts.push(products[index]);
        });
        setSelectedList(selectedProducts);
    }

    const accordionStyle = {
        '--cui-accordion-bg': "white",
        '--cui-accordion-active-color': "var(--font-color)",
        '--cui-accordion-border-color': "none",
        '--cui-accordion-color': "var(--font-color)",
        '--cui-accordion-active-bg': "white",
        '--cui-accordion-btn-focus-border-color': "none",
        '--cui-accordion-btn-focus-box-shadow': "none",
        borderBottom: "1px solid var(--line-color)",
    }

    const btnStyle = {
        backgroundColor: 'var(--main-color)',
        color: 'white',
        border: 0,
        width: '130px',

    }

    const mobileBtnStyle = {
        backgroundColor: 'var(--main-color)',
        color: 'white',
        border: 0,
        width: '100px',
    }


    return (
        <VerticalFlex gap={10}>
            <FlexChild>
                <CheckCircleGroup callback={onCheckGroupCallback} padding={10} backgroundColor={"#f5f5f5"} labelWidth={110} borderTop={"1px solid #ddd"} borderBottom={"1px solid #ddd"}
                    headerGap={10} header={!isMobile &&
                        [
                            { width: null, text: t("product"), alignItems: "center" },
                            { width: 80, text: t("quantity"), alignItems: "center" },
                            { width: 150, text: t("price"), alignItems: "flex-start" },
                            { width: 120, text: t("deliveryFee"), alignItems: "flex-start" },
                            { width: 150, text: t("etc"), alignItems: "flex-start" }
                        ]
                    }>
                    {cartItems && cartItems.length > 0 && cartItems.map((item, index) => (
                        <CartRow key={index} index={index} data={item} />
                    ))}
                </CheckCircleGroup>
            </FlexChild>
            <FlexChild>
                <VerticalFlex>
                    <FlexChild>
                        <AccordionWrapper style={accordionStyle}>
                            <AccordionText header={
                                <Center width={"100%"} textAlign={isMobile ? "left" : "right"} padding={" 0 10px 0 0"}>
                                    <Inline>
                                        <P padding={"0 15px 0 0"}>{t("totalAmount")}</P>
                                        <P padding={"0 15px 0 0"} color={"var(--main-color)"} size={isMobile ? 18 : 23} weight={1000}>&#8361;{addCommas(selectedAmount + (Math.floor(selectedAmount * 0.1)) + selectedDeliveryFee)}</P>
                                        <CustomButton style={isMobile ? mobileBtnStyle : btnStyle} text={t("order")} onClick={onPurchaseClick} />
                                    </Inline>
                                </Center>
                            } >
                                {
                                    isMobile
                                        ?
                                        <FlexChild padding={"10px"}>
                                            <VerticalFlex>
                                                <FlexChild>
                                                    <HorizontalFlex gap={5}>
                                                        <FlexChild width={"initial"}>
                                                            <P color={"#666"} size={16}>{t("productAmountSum")}</P>
                                                        </FlexChild>
                                                        <FlexChild width={"initial"} justifyContent={"flex-end"}>
                                                            <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(selectedAmount)}</P>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                                <FlexChild padding={"10px 0"}>
                                                    <div className={style.horizontalLine}>
                                                        <div className={style.circleWrap}>
                                                            <CircleWrapper maxWidth={20} backgroundColor={"#c6c6c6"} borderColor={"#ddd"}>
                                                                <div className={style.mobileCircle}>
                                                                    <FontAwesomeIcon size="xs" icon={fas["faPlus"]} color={"#eee"} />
                                                                    {/* <div className={style.topMinusLine}></div> */}
                                                                    {/* <div className={style.bottomMinusLine}></div> */}
                                                                </div>
                                                            </CircleWrapper>
                                                        </div>

                                                    </div>
                                                </FlexChild>
                                                <FlexChild>
                                                    <VerticalFlex gap={5}>
                                                        <FlexChild>
                                                            <HorizontalFlex>
                                                                <FlexChild width={"initial"}>
                                                                    <P color={"#666"} size={16}>{t("vat")}</P>
                                                                </FlexChild>
                                                                <FlexChild width={"initial"}>
                                                                    <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(Math.floor(selectedAmount * 0.1))}</P>
                                                                </FlexChild>
                                                            </HorizontalFlex>
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <HorizontalFlex>
                                                                <FlexChild width={"initial"}>
                                                                    <P color={"#666"} size={16}>{t("deliveryFee")}</P>
                                                                </FlexChild>
                                                                <FlexChild width={"initial"}>
                                                                    <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(selectedDeliveryFee)}</P>
                                                                </FlexChild>
                                                            </HorizontalFlex>
                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </FlexChild>
                                                <FlexChild padding={"10px 0"}>
                                                    <div className={style.horizontalLine}>
                                                        <div className={style.circleWrap}>
                                                            <CircleWrapper maxWidth={20} backgroundColor={"#c6c6c6"} borderColor={"#ddd"}>
                                                                <div className={style.mobileCircle}>
                                                                    <FontAwesomeIcon size="xs" icon={fas["faPlus"]} color={"#eee"} />
                                                                    {/* <div className={style.topMinusLine}></div> */}
                                                                    {/* <div className={style.bottomMinusLine}></div> */}
                                                                </div>
                                                            </CircleWrapper>
                                                        </div>
                                                    </div>
                                                </FlexChild>
                                                <FlexChild>
                                                    <HorizontalFlex gap={15}>
                                                        <FlexChild width={"initial"}>
                                                            <P color={"#666"} size={16}>{t("totalAmount")}</P>
                                                        </FlexChild>
                                                        <FlexChild width={"initial"}>
                                                            <P color={"#141414"} size={23} weight={1000}>&#8361;{addCommas(selectedAmount + (Math.floor(selectedAmount * 0.1)) + selectedDeliveryFee)}</P>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            </VerticalFlex>
                                        </FlexChild>
                                        :
                                        <FlexChild>
                                            <div className={style.summaryWrap}>
                                                <HorizontalFlex>
                                                    <FlexChild width={"initial"}>
                                                        <VerticalFlex>
                                                            <FlexChild>
                                                                <VerticalFlex gap={5}>
                                                                    <FlexChild width={"initial"}>
                                                                        <P color={"#666"} size={16}>{t("productAmountSum")}</P>
                                                                    </FlexChild>
                                                                    <FlexChild width={"initial"}>
                                                                        <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(selectedAmount)}</P>
                                                                    </FlexChild>
                                                                </VerticalFlex>
                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </FlexChild>
                                                    <FlexChild width={20}>
                                                        <CircleWrapper backgroundColor={"#c6c6c6"} borderColor={"#ddd"}>
                                                            <div className={style.circle}>
                                                                <FontAwesomeIcon size="xs" icon={fas["faPlus"]} color={"#eee"} />
                                                                <div className={style.topMinusLine}></div>
                                                                <div className={style.bottomMinusLine}></div>
                                                            </div>
                                                        </CircleWrapper>
                                                    </FlexChild>
                                                    <FlexChild width={"initial"}>
                                                        <VerticalFlex gap={5}>
                                                            <FlexChild>
                                                                <HorizontalFlex>
                                                                    <FlexChild width={"initial"}>
                                                                        <P color={"#666"} size={16}>{t("vat")}</P>
                                                                    </FlexChild>
                                                                    <FlexChild width={"initial"}>
                                                                        <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(Math.floor(selectedAmount * 0.1))}</P>
                                                                    </FlexChild>
                                                                </HorizontalFlex>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <HorizontalFlex>
                                                                    <FlexChild width={"initial"}>
                                                                        <P color={"#666"} size={16}>{t("deliveryFee")}</P>
                                                                    </FlexChild>
                                                                    <FlexChild width={"initial"}>
                                                                        <P color={"var(--main-color)"} size={23} weight={1000}>&#8361;{addCommas(selectedDeliveryFee)}</P>
                                                                    </FlexChild>
                                                                </HorizontalFlex>
                                                            </FlexChild>
                                                        </VerticalFlex>
                                                    </FlexChild>
                                                    <FlexChild width={20}>
                                                        <CircleWrapper backgroundColor={"#c6c6c6"} borderColor={"#ddd"}>
                                                            <div className={style.circle}>
                                                                <FontAwesomeIcon size="xs" icon={fas["faPlus"]} color={"#eee"} />
                                                                <div className={style.topMinusLine}></div>
                                                                <div className={style.bottomMinusLine}></div>
                                                            </div>
                                                        </CircleWrapper>
                                                    </FlexChild>
                                                    <FlexChild width={"initial"}>
                                                        <HorizontalFlex gap={15}>
                                                            <FlexChild width={"initial"}>
                                                                <P color={"#666"} size={16}>{t("totalAmount")}</P>
                                                            </FlexChild>
                                                            <FlexChild width={"initial"}>
                                                                <P color={"#141414"} size={23} weight={1000}>&#8361;{addCommas(selectedAmount + (Math.floor(selectedAmount * 0.1)) + selectedDeliveryFee)}</P>
                                                            </FlexChild>
                                                        </HorizontalFlex>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </div>

                                        </FlexChild>

                                }

                            </AccordionText>
                        </AccordionWrapper>
                    </FlexChild>
                </VerticalFlex>
            </FlexChild>
        </VerticalFlex>
    );
}

export default Cart;