import style from "./AddCartCountModal.module.css"
import NiceModal from "@ebay/nice-modal-react";
import ModalBase from "modals/base/ModalBase";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { getCurrentLanguageCode, validateInputs } from "shared/utils/Utils";
import { useDispatch } from "react-redux";
import { requester } from "App";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import InputNumber from "components/inputs/InputNumber";

import { ToastContainer, toast } from "react-toastify";
import SquareWrapper from "layouts/wrapper/SquareWrapper";
import P from "components/P";

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
            validateInputs(inputs.current).then((result) => {
                if (result.isValid) {
                    let quantity = inputs.current[0].getValue();
                    let data = { productId: product.id, quantity: quantity };
                    requester.addCart(data, (result) => {
                        if (result.code === 401) {
                            NiceModal.show("memberSignIn");
                            // toast.error(t("pleaseLogin"), {
                            //     autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER, onClose: () => {
                            //         if (modal.current) {
                            //             modal.current.close();
                            //         }
                            //     }
                            // });
                        }
                        if (result.code === 0) {
                            dispatch(CartReducer.actions.refreshCart(result.data));
                            toast.success(t("putInAShoppingCart"), {
                                autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER, onClose: () => {
                                    if (modal.current) {
                                        modal.current.close();
                                    }
                                }
                            });
                        }
                    });
                } else {
                    toast.error(t("pleaseCheckTheQuantity"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            });
        }

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} >
                <PaddingWrapper padding={"10px 20px"}>
                    <VerticalFlex gap={10}>
                        <FlexChild alignItems={"flex-start"}>
                            <P>{product.brandTitle}</P>
                            <P>{product.title}</P>
                        </FlexChild>
                        <FlexChild>
                            <SquareWrapper>
                                <img src={product.image} className={style.image} />
                            </SquareWrapper>

                        </FlexChild>
                        <FlexChild>
                            <InputNumber ref={el => (inputs.current[0] = el)} min={0} max={100} required={true} height={50} />
                        </FlexChild>
                        <FlexChild>
                            <ButtonEclipse text={t("addToBasket")} onClick={onAddCartClick} borderRadius={5} height={44} backgroundImage={"linear-gradient(239deg,#ffac2d 7%,#ff8219)"} fontWeight={"bold"} />
                        </FlexChild>
                    </VerticalFlex>
                </PaddingWrapper>
            </ModalBase>
        );
    }
);

export default AddCartCountModal;