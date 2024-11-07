import style from "./OrderSummary.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { useParams, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";
import { useState, useEffect, useContext, forwardRef, useRef, useImperativeHandle } from "react";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { addCommas, between, calculateDeliveryFee, clone, decode, getCurrentLanguageCode, validateInputs } from "shared/utils/Utils";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCreditCard, fas, faYen } from "@fortawesome/free-solid-svg-icons";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import visacard from "resources/img/paymentMethod/visa_logo.png";
import { useDispatch, useSelector } from "react-redux";
import OrderProducttRow from "./OrderProducttRow";
import { ToastContainer, toast } from "react-toastify";
import CIcon from "@coreui/icons-react";
import { cilCreditCard, cilLocationPin } from "@coreui/icons";
import { useTranslation } from "react-i18next";
import { ShoppingProcessType } from "shared/constants/constants";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import ShippingInfomation from "./orderSummary/ShippingInfomation";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import Terms from "modals/member/sign/signUp/Terms";
import clsx from "classnames";
import { AuthContext } from "providers/AuthProvider";
import GiftSelect from "./GiftSelect";
import ShippingInfomationCN from "./orderSummary/ShippingInformationCN";
import InputText from "components/inputs/InputText";
import Inline from "layouts/container/Inline";
import { Radio, RadioGroup } from "@mui/material";

function OrderSummary(props) {
    const { t } = useTranslation();
    const { userName } = useContext(AuthContext);
    const { setViewData } = useOutletContext();
    const title = t("orderHistory");
    const footterButtonText = t("makeAPayment");
    const currentProcess = ShoppingProcessType.ORDER;
    const { isMobile, languageCode } = useContext(BrowserDetectContext);
    const navigate = useNavigate();
    const shippingInfoRef = useRef();
    const messageRef = useRef();
    const paymentMethods = [
        { id: 1, title: "가상계좌", icon: null },
        // { id: 2, title: "CARD", icon: visacard },
        // { id: 3, title: "Alipay", icon: alipay },
        // { id: 4, title: "Wechatpay", icon: wechatpay },
        // { id: 5, title: "Unionpay", icon: unionpay },
        // { id: 6, title: "Paypal", icon: paypal }
    ];
    const [amount, setAmount] = useState(0);
    const [productTotalPrice, setProductTotalPrice] = useState(0);
    const [deli, setDeli] = useState(0);
    const [productVat, setProductVat] = useState(0);
    const [newShippingInfo, setNewShippingInfo] = useState();
    const [shippingInfo, setShippingInfo] = useState();
    const [selectedShippingInfo, setselectedShippingInfo] = useState();
    const [shippingType, setShippingType] = useState("NEW");
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
    const [agreeSelectedList, setAgreeSelectedList] = useState([]);
    const [agree, setAgree] = useState(false);
    const [hasGift, setHasGift] = useState();
    const [giftList, setGiftList] = useState();
    const [user, setUser] = useState();
    const { products } = useSelector((state) => ({
        products: state.orderInfo.products,
    }));

    const rowIndex = [
        {
            id: 1,
            accent: true,
            text: t("consentToCollectionOfPersonalInformation"),
        },
        {
            id: 2,
            accent: true,
            privacy: true,
            text: t("consentToPaymentAgency"),
        }
    ];

    const onPaymentMethodClick = () => {
        // NiceModal.show("paymentMethodSelectModal", { initialId: paymentMethod.id, onSelect: onPaymentMethodModalSelect });
    }

    const onPaymentMethodModalSelect = (paymentMethod) => {
        setPaymentMethod(paymentMethod);
    }

    const onOrderButtonClick = () => {
        if (paymentMethod.id === 0) {
            toast.error(t("결제수단을 선택해주세요"), {
                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
            });
        } else {
            if (shippingType === "NEW") {
                console.log("여기까지 왔음")
                if (agree) {
                    validateInputs(shippingInfoRef.current).then((result) => {
                        if (result.isValid) {
                            let shippingData = shippingInfoRef.current.getData();
                            console.log(shippingData);

                            if (shippingInfoRef.current.getData().addressDetail.length > 1) {
                                if (shippingInfoRef.current.getData().mobileNo.length > 10) {
                                    requester.saveNewShippingInfo(shippingData, (result) => {
                                        if (result.code === 0) {
                                            console.log(result.data[0]);
                                            setShippingInfo(result.data[0]);
                                        } else {
                                            toast.error(t("deliveryComfirm"), {
                                                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                                            });
                                        }
                                    });
                                } else {
                                    toast.error(t("pleaseCheckNumber"), {
                                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                                    });
                                }
                            } else {
                                if (shippingInfoRef.current.getData().mobileNo.length > 1) {
                                    toast.error(t("addressComfirm"), {
                                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                                    });
                                } else {
                                    toast.error(t("addressComfirm"), {
                                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                                    });
                                }
                            }
                        }
                    });
                } else {
                    toast.error(t("agreeToTheTerms"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            } else if (shippingType === "EXISTING") {
                let orderProducts = products.filter((orderProduct) => orderProduct.quantity > 0);
                let data = {
                    shippingInfo: selectedShippingInfo,
                    orderProducts: orderProducts,
                    message: messageRef.current.getValue()
                }

                if (agree) {
                    console.log("orderData", data);
                    requester.orderProducts(data, (result) => {
                        if (result.code === 0) {
                            toast.success(t("orderCompleted"), {
                                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                            });
                            navigate("/shopping/orderComplete");
                        } else if (result.code === -1) {
                            toast.error(t("재고가 부족합니다"), {
                                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                            });
                        }
                    });
                } else {
                    toast.error(t("agreeToTheTerms"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            }
        }
    };

    useEffect(() => {
        if (shippingInfo) {
            let orderProducts = products.filter((orderProduct) => orderProduct.quantity > 0);
            let data = {
                shippingInfo: shippingInfo,
                orderProducts: orderProducts,
                message: messageRef.current.getValue()
            }
            if (orderProducts.length > 0) {

                if (shippingType === "NEW") {
                    requester.orderProducts(data, (result) => {
                        if (result.code === 0) {
                            toast.success(t("orderCompleted"), {
                                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                            });
                            navigate("/shopping/orderComplete");
                        } else if (result.code === -1) {
                            toast.error(t("재고가 부족합니다"), {
                                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                            });
                        }
                    });
                }

            } else {
                toast.error(t("pleaseCheckTheQuantity"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } else {
        }
    }, [shippingInfo])

    const shippingCallback = (value, type) => {
        console.log(value)
        console.log(type);
        setselectedShippingInfo(value);
        setShippingType(type);
        if (shippingType === "NEW") {
            setNewShippingInfo(shippingInfoRef.current.getData([]));
        }
    };

    const onCheckGroupCallback = (checkedIndex) => {
        let selectedProducts = [];
        checkedIndex && checkedIndex.map((index) => {
            selectedProducts.push(rowIndex[index]);
        });
        setAgreeSelectedList(selectedProducts);
    }

    useEffect(() => {
        let sum = 0;
        let sumQuantity = 0;
        if (products && products.length > 0) {
            products.map((orderProduct) => {
                sum += orderProduct.quantity * (orderProduct.product.currentPrice ? orderProduct.product.currentPrice : orderProduct.product.price);
                sumQuantity += orderProduct.quantity;
            });
        }
        let deliveryFee = calculateDeliveryFee(sum, sumQuantity);

        let totalPrice = sum;
        setProductTotalPrice(totalPrice);
        let vat = Math.floor(sum * 0.1);
        setProductVat(vat);

        setDeli(deliveryFee);
        let amount = (sum + vat + deliveryFee);
        setAmount(amount);

        let data = {
            title: title,
            footterButtonText: footterButtonText,
            currentProcess: currentProcess,
            totalCount: products && products.length,
            selectedCount: products && products.length,
            priceSum: totalPrice,
            vat: Math.floor(totalPrice * 0.1),
            deliveryFee: deliveryFee,
            discountSum: 0,
            totalAmount: amount,
            onDeleteSelectedProductsClick: null,
            onSubmitButtonClick: onOrderButtonClick
        }

        setViewData(data);
    }, [products]);

    useEffect(() => {
        agreeSelectedList.map((data, index) => {
            if (data.accent && agreeSelectedList.length >= 2) {
                setAgree(true);
            } else {
                setAgree(false);
            }
            if (agreeSelectedList.length >= 3) {
                setAgree(true);
            }
        })
    }, [agreeSelectedList]);

    useEffect(() => {
        requester.findSelf((result) => {
            console.log("asd", result.data);
            setUser(result.data);
        });
    }, [paymentMethod, userName]);

    return (
        <div>
            {
                isMobile
                    ?
                    <VerticalFlex height={"initial"} gap={20}>
                        <FlexChild>
                            <VerticalFlex gap={10} padding={"0px 10px"}>
                                <FlexChild>
                                    {
                                        languageCode === "CN" ?
                                            <ShippingInfomationCN ref={shippingInfoRef} callback={shippingCallback} />
                                            : <ShippingInfomation ref={shippingInfoRef} callback={shippingCallback} />
                                    }
                                </FlexChild>
                                <FlexChild>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P size={16} weight={"bold"}>
                                            {t("배송 요청사항")}
                                        </P>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <InputText ref={messageRef} placeHolder={"배송 메세지를 입력하세요."} />
                                </FlexChild>
                                <FlexChild padding={"20px 0 5px 0"}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P weight={"bold"} size={"18pt"}>{t("selectPaymentMethod")}</P>
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <div className={style.paymentMethodArea} onClick={onPaymentMethodClick}>
                                        <HorizontalFlex backgroundColor={"white"} padding={5} gap={10}>
                                            <FlexChild width={30} backgroundColor={"white"} >
                                                <Center>
                                                    <CIcon icon={cilCreditCard} size={"lg"} />
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex gap={10}>
                                                    {/* <FlexChild width={"initial"}>
                                                        <PaddingWrapper padding={"5px 0px"}>
                                                            <img className={style.paymentMethodIcon} src={paymentMethod.icon} />
                                                        </PaddingWrapper>
                                                    </FlexChild> */}
                                                    <FlexChild>
                                                        <P>{paymentMethod.title}</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P>{user && user.accountNo}</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            {/* <FlexChild width={30}>
                                                <Center height={"100%"}>
                                                    <FontAwesomeIcon icon={fas["faChevronRight"]} />
                                                </Center>
                                            </FlexChild> */}
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                                <FlexChild>
                                    <VerticalFlex gap={10}>
                                        <FlexChild padding={"20px 0 5px 0"}>
                                            <Center width={"100%"} textAlign={"left"}>
                                                <P weight={"bold"} size={"14pt"}>{t("주문상품")}</P>
                                            </Center>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.orderListContainer}>
                                                <VerticalFlex>

                                                    {
                                                        products ?
                                                            products.map((data, index) =>
                                                                <FlexChild key={index}>
                                                                    <OrderProducttRow key={index} index={index} data={data} />
                                                                </FlexChild>)
                                                            : null
                                                    }
                                                </VerticalFlex>
                                            </div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                {
                                    giftList &&
                                    <FlexChild>
                                        <div className={style.orderListContainer}>
                                            <VerticalFlex>
                                                <FlexChild padding={"20px 0 5px 0"}>
                                                    <Center width={"100%"} textAlign={"left"}>
                                                        <P weight={"bold"} size={"18pt"}>{"사은품"}</P>
                                                    </Center>
                                                </FlexChild>
                                                <FlexChild>
                                                    <GiftSelect />
                                                </FlexChild>

                                            </VerticalFlex>
                                        </div>
                                    </FlexChild>
                                }
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.fixedPaymentWrap}>
                                <VerticalFlex>
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
                                        <CheckCircleGroup lineHeight={"28px"} callback={onCheckGroupCallback}
                                            flexStart
                                            padding={"7px 15px"}
                                            header={[{ width: "90%", text: t("agreeToTheTermsBelow"), alignItems: "center" }]}>
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

                                    </FlexChild>
                                </VerticalFlex>
                            </div>
                        </FlexChild>
                    </VerticalFlex>
                    :
                    <div className={style.contentArea}>
                        <VerticalFlex height={"initial"} gap={20}>
                            <FlexChild>
                                <VerticalFlex gap={20} padding={"0px 10px"}>
                                    <FlexChild>
                                        {
                                            languageCode === "CN" ?
                                                <ShippingInfomationCN ref={shippingInfoRef} callback={shippingCallback} />
                                                : <ShippingInfomation ref={shippingInfoRef} callback={shippingCallback} />
                                        }
                                    </FlexChild>
                                    <FlexChild>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <P size={16} weight={"bold"}>
                                                {t("배송 요청사항")}
                                            </P>
                                        </Center>
                                    </FlexChild>
                                    <FlexChild>
                                        <div style={{ height: "1px", backgroundColor: "#4d4f56" }} />
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex gap={30} padding={15}>
                                            <FlexChild width={"max-content"}>
                                                <P weight={"bold"}>배송 메세지</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <InputText ref={messageRef} placeHolder={"배송 메세지를 입력하세요."} />
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                    <FlexChild padding={"20px 0 5px 0"}>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <P weight={"bold"} size={"18pt"}>{t("주문상품")}</P>
                                        </Center>
                                    </FlexChild>
                                    <FlexChild>
                                        <div style={{ height: "1px", backgroundColor: "#4d4f56" }} />
                                    </FlexChild>
                                    <FlexChild>
                                        <div>
                                            <VerticalFlex>
                                                <FlexChild>

                                                    {
                                                        isMobile ?
                                                            <HorizontalFlex gap={10}>
                                                                <FlexChild justifyContent={"center"}>
                                                                    <P color={"#666"}>{"상품목록"}</P>
                                                                </FlexChild>
                                                            </HorizontalFlex>
                                                            :
                                                            null
                                                        // <div className={style.tableBorder}>
                                                        //     <HorizontalFlex gap={10}>
                                                        //         <FlexChild width={110} justifyContent={"center"}>

                                                        //         </FlexChild>
                                                        //         <FlexChild justifyContent={"center"}>
                                                        //             <P weight={"bold"} color={"#666"}>{t("product")}</P>
                                                        //         </FlexChild>
                                                        //         <FlexChild width={80} justifyContent={"center"}>
                                                        //             <P weight={"bold"} color={"#666"}>{t("price")}</P>
                                                        //         </FlexChild>
                                                        //         <FlexChild width={150} justifyContent={"center"}>
                                                        //             <P weight={"bold"} color={"#666"}>{t("quantity")}</P>
                                                        //         </FlexChild>
                                                        //         <FlexChild width={120} justifyContent={"center"}>
                                                        //             <P weight={"bold"} color={"#666"}>{t("totalAmount")}</P>
                                                        //         </FlexChild>
                                                        //     </HorizontalFlex>
                                                        // </div>
                                                    }

                                                </FlexChild>

                                                {
                                                    products ?
                                                        products.map((data, index) =>
                                                            <FlexChild key={index}>
                                                                <OrderProducttRow key={index} index={index} data={data} />
                                                            </FlexChild>)
                                                        : null
                                                }
                                                {
                                                    giftList &&
                                                    <FlexChild>
                                                        <div className={style.orderListContainer}>
                                                            <VerticalFlex>
                                                                <FlexChild padding={"20px 0 5px 0"}>
                                                                    <Center width={"100%"} textAlign={"left"}>
                                                                        <P weight={"bold"} size={"18pt"}>{"사은품"}</P>
                                                                    </Center>
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <GiftSelect />
                                                                </FlexChild>

                                                            </VerticalFlex>
                                                        </div>
                                                    </FlexChild>
                                                }

                                            </VerticalFlex>
                                        </div>
                                    </FlexChild>
                                    {
                                        hasGift &&
                                        <FlexChild>
                                            <div className={style.orderListContainer}>
                                                <VerticalFlex>
                                                    <FlexChild padding={"20px 0 5px 0"}>
                                                        <Center width={"100%"} textAlign={"left"}>
                                                            <P weight={"bold"} size={"18pt"}>{t("product")}</P>
                                                        </Center>
                                                    </FlexChild>
                                                    <FlexChild height={50} backgroundColor={"#f5f5f5"} border={"1px solid #ddd"}>

                                                        {
                                                            isMobile ?
                                                                <HorizontalFlex gap={10}>
                                                                    <FlexChild justifyContent={"center"}>
                                                                        <P color={"#666"}>{"상품목록"}</P>
                                                                    </FlexChild>
                                                                </HorizontalFlex>
                                                                :
                                                                <div className={style.tableBorder}>
                                                                    <HorizontalFlex gap={10}>
                                                                        <FlexChild width={110} justifyContent={"center"}>

                                                                        </FlexChild>
                                                                        <FlexChild justifyContent={"center"}>
                                                                            <P weight={"bold"} color={"#666"}>{t("product")}</P>
                                                                        </FlexChild>
                                                                        <FlexChild width={80} justifyContent={"center"}>
                                                                            <P weight={"bold"} color={"#666"}>{t("price")}</P>
                                                                        </FlexChild>
                                                                        <FlexChild width={150} justifyContent={"center"}>
                                                                            <P weight={"bold"} color={"#666"}>{t("quantity")}</P>
                                                                        </FlexChild>
                                                                        <FlexChild width={120} justifyContent={"center"}>
                                                                            <P weight={"bold"} color={"#666"}>{t("totalAmount")}</P>
                                                                        </FlexChild>
                                                                    </HorizontalFlex>
                                                                </div>
                                                        }

                                                    </FlexChild>

                                                    {
                                                        products ?
                                                            products.map((data, index) =>
                                                                <FlexChild key={index}>
                                                                    <OrderProducttRow key={index} index={index} data={data} />
                                                                </FlexChild>)
                                                            : null
                                                    }

                                                </VerticalFlex>
                                            </div>
                                        </FlexChild>
                                    }
                                    <FlexChild padding={"20px 0 5px 0"}>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <P weight={"bold"} size={"14pt"}>{t("결제수단")}</P>
                                        </Center>
                                    </FlexChild>
                                    <FlexChild>
                                        <div style={{ height: "1px", backgroundColor: "#4d4f56" }} />
                                    </FlexChild>

                                    <FlexChild >
                                        <HorizontalFlex alignItems={"flex-start"}>
                                            <FlexChild width={"25%"}>
                                                <PaddingWrapper padding={"8px 0px"}>
                                                    <P weight={"bold"}>{t("selectPaymentMethod")}</P>
                                                </PaddingWrapper>

                                            </FlexChild>
                                            <FlexChild>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <RadioGroup value={"TRUE"} >
                                                            <HorizontalFlex gap={30}>
                                                                <FlexChild width={"max-content"}>
                                                                    {/* 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default', */}
                                                                    <Radio name="productDisplay" value="TRUE" color={"primary"} size={"small"} />
                                                                    <P size={15} color={"black"}>가상계좌</P>
                                                                </FlexChild>
                                                            </HorizontalFlex>
                                                        </RadioGroup>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <div className={style.paymentMethodArea} onClick={onPaymentMethodClick}>
                                                            <HorizontalFlex backgroundColor={"white"} padding={5} gap={10}>
                                                                {/* <FlexChild>
                                                            <PaddingWrapper padding={"5px 0px"}>
                                                                <img className={style.paymentMethodIcon} src={paymentMethod.icon} />
                                                            </PaddingWrapper>
                                                        </FlexChild> */}
                                                                <FlexChild>
                                                                    {/* <Center> */}
                                                                    <HorizontalFlex alignItems={"flex-start"} justifyContent={"flex-start"}>
                                                                        <FlexChild width={5} />

                                                                        <FlexChild width={30}>
                                                                            <CIcon icon={cilCreditCard} size={"lg"} />
                                                                        </FlexChild>
                                                                        <FlexChild width={"initial"}>
                                                                            <P>{"국민은행"}</P>
                                                                        </FlexChild>
                                                                        <FlexChild width={30} />
                                                                        <FlexChild width={"initial"}>
                                                                            {/* <P>{paymentMethod.title}</P> */}
                                                                            <P>{"예금주 : 월드인터네셔널"}</P>
                                                                        </FlexChild>
                                                                        <FlexChild width={30} />
                                                                        <FlexChild>
                                                                            <P>{user && user.accountNo}</P>
                                                                        </FlexChild>
                                                                    </HorizontalFlex>
                                                                    {/* </Center> */}
                                                                </FlexChild>
                                                            </HorizontalFlex>
                                                        </div>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </VerticalFlex>

                        <div className={style.sidePanel}>
                            <VerticalFlex>
                                <FlexChild>
                                    <div className={style.dummy}></div>
                                </FlexChild>
                                <FlexChild>
                                    <div className={clsx(style.fixedPaymentWrap)}>
                                        <VerticalFlex>
                                            <FlexChild>
                                                <Center textAlign={"left"} width={"100%"}>
                                                    <P weight={"bold"} size={"16pt"}>{t("amountOfPayment")}</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <P>{t("product")}{t("price")}</P>
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
                                                <CheckCircleGroup lineHeight={"28px"} callback={onCheckGroupCallback} flexStart padding={"7px 15px"} header={[{ width: "100%", text: t("agreeToTheTermsBelow"), alignItems: "center" },]}>
                                                    {
                                                        rowIndex &&
                                                        rowIndex.map((data, index) => (
                                                            <Terms orderSummary data={data} key={index} index={index} />
                                                        ))
                                                    }
                                                </CheckCircleGroup>
                                            </FlexChild>
                                            <FlexChild padding={"10px 0 0 0"}>
                                                <ButtonEclipse onClick={onOrderButtonClick} lineHeight={"44px"} fontWeight={"bold"} fontSize={"14pt"} height={44} backgroundColor={"var(--main-color)"} currencySymbol text={`${amount} ${t("makeAPayment")}`} />
                                            </FlexChild>
                                        </VerticalFlex>
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </div>
                    </div>
            }
        </div >
    );
}

export default OrderSummary;