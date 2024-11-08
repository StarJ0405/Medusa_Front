import style from "./AddCartCountModal.module.css"
import NiceModal from "@ebay/nice-modal-react";
import ModalBase from "modals/base/ModalBase";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { getCurrentLanguageCode, validateInputs } from "shared/utils/Utils";
import { useDispatch } from "react-redux";
import { requester } from "App";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import InputNumber from "components/inputs/InputNumber";

import { ToastContainer, toast } from "react-toastify";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import P from "components/P";
import { addItem, getCookie } from "shared/medusa/action";

const AddCartCountModal = NiceModal.create(
    (props, ref) => {
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(80%, 500px)", "fit-content"];
        const withCloseButton = false;
        const clickOutsideToClose = true;
        const buttonText = t("close");
        const modal = useRef();
        const inputs = useRef([]);
        const dispatch = useDispatch();
        const { product } = props;
        const title = "장바구니 담기";


        const onAddCartClick = () => {
            let medusaCartId = getCookie("_medusa_cart_id");
            console.log(medusaCartId);


            validateInputs(inputs.current).then((result) => {
                if (result.isValid) {
                    let quantity = inputs.current[0].getValue();
                    try {
                        // 현재 장바구니에 lineItem 추가
                        addItem({
                            cartId: medusaCartId,
                            variantId: product.id,
                            quantity: quantity,
                            free: false,
                            isLong: false,
                            items: null
                        })
                        toast.success(t("putInAShoppingCart"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER, onClose: () => {
                                if (modal.current) {
                                    modal.current.close();
                                }
                            }
                        });
                    }
                    catch {
                        toast.error(t("unexpected Error"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    }
                } else {
                    toast.error(t("pleaseCheckTheQuantity"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            });
        }

        useEffect(() => {
            console.log("모달 : ", product)
        }, [product])

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <PaddingWrapper padding={"10px 20px"}>
                    {product.variants && product.variants.length > 0
                        ?
                        // variant를 모달로 받을 때
                        <>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {product.variants && product.variants.length > 0 &&
                                    product.variants.map((item, index) => (
                                        <VerticalFlex key={index} gap={10} margin={'10px'}>
                                            <FlexChild alignItems={"flex-start"}>
                                                <P>{product.title}</P>
                                                <P>{item.title}</P>
                                            </FlexChild>
                                            <FlexChild>
                                                <SquareWrapper>
                                                    <img src={item.thumbnail} className={style.image} />
                                                </SquareWrapper>

                                            </FlexChild>
                                            <FlexChild>
                                                <InputNumber ref={el => (inputs.current[0] = el)} min={0} max={100} required={true} height={50} />
                                            </FlexChild>
                                        </VerticalFlex>
                                    ))}
                            </div>
                            <FlexChild>
                                <ButtonEclipse text={t("addToBasket")} onClick={onAddCartClick} borderRadius={5} height={44} backgroundImage={"linear-gradient(239deg,#ffac2d 7%,#ff8219)"} fontWeight={"bold"} />
                            </FlexChild>
                        </>
                        :
                        // product를 모달로 받을 때
                        <VerticalFlex gap={10}>
                            <FlexChild alignItems={"flex-start"}>
                                <P>{product.title}</P>
                                <P>{product.description}</P>
                            </FlexChild>
                            <FlexChild>
                                <SquareWrapper>
                                    <img src={product.thumbnail} className={style.image} />
                                </SquareWrapper>

                            </FlexChild>
                            <FlexChild>
                                <InputNumber ref={el => (inputs.current[0] = el)} min={0} max={100} required={true} height={50} />
                            </FlexChild>
                            <FlexChild>
                                <ButtonEclipse text={t("addToBasket")} onClick={onAddCartClick} borderRadius={5} height={44} backgroundImage={"linear-gradient(239deg,#ffac2d 7%,#ff8219)"} fontWeight={"bold"} />
                            </FlexChild>
                        </VerticalFlex>
                    }
                </PaddingWrapper>
            </ModalBase>
        );
    }
);

export default AddCartCountModal;