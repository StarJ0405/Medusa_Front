import style from "./OrderProducttRow.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import InputNumber from "components/inputs/InputNumber";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { clone, getCurrentLanguageCode } from "shared/utils/Utils";
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

function GiftSelect(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const { data } = props;
    const { t } = useTranslation();
    const inputs = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [giftTargetList, setGiftTargetList] = useState();
    const { products } = useSelector((state) => ({
        products: state.orderInfo.products,
    }));

    useEffect(() => {
        if(data){
            data.map((product) => {
                
            });
        }
    }, [data]);

    const Row = (props) => {
        const { product } = props;
        const onProductClick = () => {
            navigate(`/product/detail/${product.product.id}`);
        }

        const onQuantityChange = (value) => {
            let changedList = products.map((orderProduct) => {
                let changedOrderProduct = clone(orderProduct);
                if (changedOrderProduct.product.id === product.product.id) {
                    changedOrderProduct.quantity = value;
                }
                return changedOrderProduct;
            });
        }

        return (
            <div className={style.productWrap}>
                {
                    isMobile ?
                        <HorizontalFlex gap={10}>
                            <FlexChild width={"max-content"} >
                                <div className={style.imgWrap} >
                                    <img src={product.product.image} className={style.img} />
                                </div>
                            </FlexChild>
                            <FlexChild width={"65%"}>
                                <VerticalFlex>
                                    <FlexChild>
                                        <div className={style.contentWrap}>
                                            <p className={style.title} onClick={onProductClick} >{product.product.brandTitle}{product.product.title}</p>
                                        </div>
                                    </FlexChild>
                                    <FlexChild>
                                        <HorizontalFlex gap={5}>
                                            <FlexChild >
                                                {
                                                    props.readOnly ?
                                                        <PaddingWrapper padding={"0px 10px"}>
                                                            <P>{`${t("orderQuantity")} : ${product ? data.quantity : 0}`}</P>
                                                        </PaddingWrapper>
                                                        : <InputNumber ref={el => (inputs.current[0] = el)} min={1} height={30} value={product ? data.quantity : 0} onChange={onQuantityChange} />
                                                }
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                        :
                        <HorizontalFlex gap={10}>
                            <FlexChild width={110} >
                                <div className={style.imgWrap} >
                                    <img src={product.product.image} className={style.img} />
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div className={style.contentWrap}>
                                    <p className={style.title} onClick={onProductClick} >{product.product.brandTitle} {product.product.title}</p>
                                    <p className={style.tag}>{product.product.hashTag}</p>
                                </div>
                            </FlexChild>
                            <FlexChild width={150}>
                                {
                                    props.readOnly ?
                                        <Center>
                                            <P>{product ? product.quantity : 0}</P>
                                        </Center>

                                        : <InputNumber ref={el => (inputs.current[0] = el)} min={1} height={30} value={product ? product.quantity : 0} onChange={onQuantityChange} />
                                }
                            </FlexChild>
                        </HorizontalFlex>
                }
            </div>
        );
    };

    return (
        <VerticalFlex>
            {
                data && data.map((giftProduct) => <Row product={giftProduct} />)
            }
        </VerticalFlex>
    );
}


export default GiftSelect;

