import style from "./OrderProducttRow.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import InputNumber from "components/inputs/InputNumber";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { addCommas, clone, getCurrentLanguageCode } from "shared/utils/Utils";
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
import { OrderInfoReducer } from "shared/redux/reducers/shopping/OrderInfoReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderProducttRow = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { data } = props;
    const { t } = useTranslation();
    const inputs = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector((state) => ({
        products: state.orderInfo.products,
    }));

    const onProductClick = () => {
        navigate(`/product/detail/${data.product.id}`);
    }

    const onQuantityChange = (value) => {
        let changedList = products.map((orderProduct) => {
            let changedOrderProduct = clone(orderProduct);
            if (changedOrderProduct.product.id === data.product.id) {
                changedOrderProduct.quantity = value;
            }
            return changedOrderProduct;
        });
        dispatch(OrderInfoReducer.actions.refreshOrderProducts(changedList));

    }

    const callback = (index, state) => {
        if (props.callback) {
            props.callback(index, state);
        }
    }

    return (
        <div className={style.productWrap}>
            {
                isMobile ?
                    <HorizontalFlex gap={10}>
                        <FlexChild width={"20%"} >
                            <div className={style.imgWrap} >
                                <img src={data.product.image} className={style.img} />
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <div className={style.contentWrap}>
                                        <p className={style.title} onClick={onProductClick} >{data.product.brandTitle}{data.product.title}</p>
                                        <p className={style.tag}>{data.product.hashTag}</p>
                                    </div>
                                </FlexChild>
                                <FlexChild alignItems={"flex-end"}>
                                    {
                                        data.product.currentPrice &&
                                        <P color={"#c4c4c4"} weight={"500"} size={14} verticalAlign={"bottom"} textDecoration={"line-through"}>
                                            &#8361;{addCommas(data.product.price * data.quantity)}
                                        </P>
                                    }
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex gap={5}>
                                        <FlexChild width={"60%"}>
                                            {
                                                props.readOnly ?
                                                    <PaddingWrapper padding={"0px 10px"}>
                                                        <P>{`${t("orderQuantity")} : ${data ? data.quantity : 0}`}</P>
                                                    </PaddingWrapper>

                                                    : <InputNumber ref={el => (inputs.current[0] = el)} min={1} height={30} value={data ? data.quantity : 0} onChange={onQuantityChange} />
                                            }

                                        </FlexChild>
                                        <FlexChild width={"max-content"} justifyContent={"flex-end"}>
                                            <P color={"var(--main-color)"} weight={"800"} size={15} verticalAlign={"bottom"}>
                                                &#8361;{addCommas(data.quantity * (data.product.currentPrice ? data.product.currentPrice : data.product.price))}
                                            </P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                    </HorizontalFlex>
                    :
                    <HorizontalFlex gap={10}>
                        <FlexChild width={70} >
                            <div className={style.imgWrap} >
                                <img src={data.product.image} className={style.img} />
                            </div>
                        </FlexChild>
                        <FlexChild>
                            <div className={style.contentWrap}>
                                <p className={style.title} onClick={onProductClick} >{data.product.brandTitle}{data.product.title}</p>
                                <p className={style.tag}>{data.product.hashTag}</p>
                            </div>
                        </FlexChild>
                        <FlexChild width={150}>
                            {
                                props.readOnly ?
                                    <Center>
                                        <P>{data ? data.quantity : 0}</P>
                                    </Center>

                                    : <InputNumber ref={el => (inputs.current[0] = el)} min={1} height={30} value={data ? data.quantity : 0} onChange={onQuantityChange} />
                            }

                        </FlexChild>
                        <FlexChild width={120}>
                            <VerticalFlex>
                                <FlexChild>
                                    {
                                        data.product.currentPrice &&
                                        <P color={"#c4c4c4"} weight={"500"} size={15} verticalAlign={"bottom"} textDecoration={"line-through"}>
                                            &#8361;{addCommas(data.product.price * data.quantity)}
                                        </P>
                                    }
                                </FlexChild>
                                <FlexChild>
                                    <P color={"var(--main-color)"} weight={"800"} size={15} verticalAlign={"bottom"}>
                                        &#8361;{addCommas(data.quantity * (data.product.currentPrice ? data.product.currentPrice : data.product.price))}
                                    </P>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                    </HorizontalFlex>
            }
        </div>
    );
});

export default OrderProducttRow;

