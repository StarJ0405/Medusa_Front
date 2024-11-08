import style from "./CartRow.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import InputNumber from "components/inputs/InputNumber";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { addCommas, clone, getCurrentLanguageCode, validateInputs } from "shared/utils/Utils";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useDispatch } from "react-redux";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import CheckCircle from "components/inputs/checkBox/CheckCircle";
import { useNavigate } from "react-router-dom";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import CustomButton from "components/buttons/CustomButton";


const CartRow = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { data } = props;
    const { t } = useTranslation();
    const [isChecked, setChecked] = useState(false);
    const [checkedData, setCheckedData] = useState();
    const [wish, setWish] = useState();
    const input = useRef();
    const [helperText, setHelperText] = useState("");
    const inputs = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);

    const wishButtonClick = (e) => {
        e.stopPropagation();
        let wishProductData = { productId: data.product.id, wishYn: !wish };
        requester.updateProductWish(wishProductData, (result) => {
            if (result.code === 0) {
                dispatch(WishReducer.actions.refreshProducts(result.data));
            }
        })
    }

    const onProductClick = () => {
        navigate(`/product/detail/${data.product.id}`);
    }

    const onQuantityChange = (value) => {
        let requestData = { id: data.id, productId: data.product.id, quantity: value };
        requester.updateCart(requestData, result => {
            if (result.code === 0) {
                dispatch(CartReducer.actions.refreshCart(result.data));
            }
        });
    }

    const onDeleteClick = () => {
        const onDeleteClick = () => {
            let requestData = { id: data.id };
            requester.deleteCart(requestData, result => {
                if (result.code === 0) {
                    dispatch(CartReducer.actions.refreshCart(result.data));
                }
            });
        }

        const onCancelClick = () => {

        }

        NiceModal.show("confirm", {
            message: t("confirmCartProductDelete"),
            confirmText: t("delete"),
            cancelText: t("cancel"),
            onConfirm: onDeleteClick,
            onCancel: onCancelClick
        });
    }

    const callback = (index, state) => {
        if (props.callback) {
            props.callback(index, state);
        }
    }



    useEffect(() => {
        if (props.data) {
            setCheckedData(props.data)
        }
    }, [props.data]);

    useEffect(() => {
        if (props.checkedIndex && props.checkedIndex.includes(props.index)) {
            input.current.setChecked(true);
        } else {
            input.current.setChecked(false);
        }
    }, [props.checkedIndex]);

    useImperativeHandle(ref, () => ({
        isChecked() {
            return isChecked;
        },
        setChecked(value) {
            input.current.setChecked(value);
        },
        isCheckedVaild() {
            return input.current.isChecked();
        }
    }));

    const btnStyle = {
        height: "24px",
        backgroundColor: "white",
        color: "var(--font-faint-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "var(--font-size)",
        borderRadius: "3px",
        border: "1px solid var(--line-color)"
    }
    const mainColorBtnStyle = {
        height: "24px",
        backgroundColor: "white",
        color: "var(--main-color)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "var(--font-size)",
        borderRadius: "3px",
        border: "1px solid var(--main-color)",



    }

    useEffect(() => {
        console.log("cartItems : ", checkedData)
    }, [checkedData])

    return (
        <div className={style.productWrap}>
            {
                isMobile &&
                <div className={style.buttonWrap} onClick={onDeleteClick}>
                    <Center>
                        <FontAwesomeIcon icon={fas["faXmark"]} />
                        {/* <P size={25} weight={0} color={"lightgray"}>{' '}&times;{' '}</P> */}
                    </Center>
                </div>
            }
            {
                isMobile ?
                    <HorizontalFlex gap={10} alignItems={"flex-start"} justifyContent={"flex-start"} >
                        <FlexChild width={22} >
                            <div className={style.checkboxArea}>
                                <CheckCircle ref={input} callback={callback} index={props.index} label={props.label} checkedData={checkedData} />
                            </div>
                        </FlexChild>
                        <FlexChild width={110} >
                            <div className={style.imgWrap} onClick={onProductClick}>
                                <img src={data.thumbnail} className={style.img} />
                            </div>
                        </FlexChild>
                        <FlexChild >
                            <VerticalFlex gap={5}>
                                <FlexChild>
                                    <div className={style.contentWrap}>
                                        {/* font-size: 15px;
                                        font-weight: bold;
                                        cursor: pointer;
                                        width: 100%;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis; */}
                                        <P size={12}>
                                            {data.description}
                                        </P>
                                        <P size={12}>
                                            {data.title}
                                        </P>
                                        {/* <p className={style.title} onClick={onProductClick} >{data.product.brandTitle}</p>
                                        <p className={style.title} onClick={onProductClick} >{data.product.title}</p>
                                        <p className={style.tag}>{data.product.hashTag}</p> */}
                                    </div>
                                </FlexChild>
                                <FlexChild alignItems={"flex-end"}>

                                </FlexChild>
                                <FlexChild justifyContent={"flex-end"}>
                                    <HorizontalFlex gap={5} justifyContent={"flex-end"} alignItems={"flex-end"}>
                                        <FlexChild justifyContent={"flex-end"} alignItems={"flex-end"}>
                                            {
                                                data.product.currentPrice &&
                                                <Center width={"100%"} textAlign={"right"}>
                                                    <P color={"#c4c4c4"} weight={"500"} size={15} verticalAlign={"bottom"} textDecoration={"line-through"}>
                                                        &#8361;{addCommas(data.product.price * data.quantity)}
                                                    </P>
                                                </Center>
                                            }
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-end"}>
                                            <P color={"var(--main-color)"} weight={"800"} size={15} verticalAlign={"bottom"}>
                                                &#8361;{addCommas(data.quantity * (data.product.currentPrice ? data.product.currentPrice : data.product.price))}
                                            </P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex justifyContent={"flex-end"} alignItems={"flex-end"}>
                                        <FlexChild >
                                            <InputNumber ref={el => (inputs.current[0] = el)} min={0} helperText={helperText} height={30} value={data ? data.quantity : 0} onChange={onQuantityChange} />
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                    </HorizontalFlex>
                    :
                    <HorizontalFlex gap={10}>
                        <FlexChild width={30} >
                            <div className={style.checkboxArea}>
                                <CheckCircle ref={input} callback={callback} index={props.index} label={props.label} checkedData={checkedData} />
                            </div>
                        </FlexChild>
                        <FlexChild width={110} >
                            <div className={style.imgWrap} onClick={onProductClick}>
                                <img src={data.thumbnail} className={style.img} />
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.contentWrap}>
                                <p className={style.title} onClick={onProductClick} >
                                    {/* {data.brandTitle} */}
                                    {data.title}
                                </p>
                                <p className={style.tag}>
                                    {data.description}
                                </p>
                            </div>
                        </FlexChild>

                        <FlexChild width={"15%"}>
                            <InputNumber ref={el => (inputs.current[0] = el)} min={0} helperText={helperText} height={30} value={data ? data.quantity : 0} onChange={onQuantityChange} />
                        </FlexChild>
                        <FlexChild width={"7%"} justifyContent={"center"}>
                            <VerticalFlex>
                                <FlexChild>
                                    <P color={data.subtotal ? "gray" : "var(--main-color)"} weight={"800"} size={15} verticalAlign={"bottom"} textDecoration={data.currentPrice && "line-through"}>
                                        &#8361;{addCommas(data.quantity * data.subtotal)}
                                    </P>
                                </FlexChild>
                                {/* {
                                    data.product.currentPrice &&
                                    <FlexChild>
                                        <P color={"var(--main-color)"} weight={"800"} size={15} verticalAlign={"bottom"}>
                                            &#8361;{addCommas(data.quantity * (data.product.currentPrice ? data.product.currentPrice : data.product.price))}
                                        </P>
                                    </FlexChild>
                                } */}
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild width={"12%"}>
                            <Center>
                                <P>&#8361;0</P>
                            </Center>
                        </FlexChild>
                        <FlexChild width={"15%"}>
                            <VerticalFlex gap={5}>
                                <FlexChild>
                                    <Center width={"100%"}>
                                        <CustomButton onClick={wishButtonClick} style={mainColorBtnStyle} text={t("wishList") + t("add")} />
                                    </Center>
                                </FlexChild>
                                <FlexChild>
                                    <Center width={"100%"}>
                                        <CustomButton onClick={onDeleteClick} style={btnStyle} text={t("delete")} />
                                    </Center>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                    </HorizontalFlex>
            }
        </div>
    );
});

export default CartRow;

