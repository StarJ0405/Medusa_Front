
import NiceModal from "@ebay/nice-modal-react";
import FlexChild from "layouts/flex/FlexChild";
import ModalBase from "modals/base/ModalBase";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import style from "./ShippingInfoUpdateModal.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import InputNumber from "components/inputs/InputNumber";
import { requester } from "App";
import { CButton } from "@coreui/react";


const ShippingInfoUpdateModal = NiceModal.create(
    (props) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, true];
        const [width, height] = ["min(95%, 500px)", "initial"];
        const withCloseButton = true;
        const modal = useRef();
        const clickOutsideToClose = true;
        const title = "수정하기";
        const buttonText = t("close");
        const [orderProducts, setOrderProducts] = useState([]);
        const { data } = props;

        useEffect(() => {
            if (data) {
                setOrderProducts(data.orderProducts);
            }
        }, [data])


        const handleQuantityChange = (index, quantity) => {
            const updatedOrderProducts = [...orderProducts];
            updatedOrderProducts[index].quantity = parseInt(quantity);
            setOrderProducts(updatedOrderProducts);
        };

        const onUpdateClick = () => {
            console.log(data.id);

            let shippingInfoData = {
                purchaseOrderId: data.id,
                orderProductUpdates: orderProducts
            }
            console.log(orderProducts);
            requester.updatePurchaseOrder(shippingInfoData, (result) => {
                if (result.code === 401) {
                    toast.error(t("ERROR"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
                else if (result.code === 0) {
                    toast.success(t("수정되었습니다"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER, onClose: () => {
                            if (modal.current) {
                                modal.current.close();
                            }
                        }
                    });

                } 
                else {
                    toast.error(t("ERROR"), {
                        autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            })
        }


        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} overflow={"visible"}>
                <div className={style.wrap}>
                    <VerticalFlex gap={15}>

                        <FlexChild>
                            <HorizontalFlex>
                                <FlexChild justifyContent={"center"}>
                                    <P weight={"bold"}>상품명</P>
                                </FlexChild>
                                <FlexChild justifyContent={"center"}>
                                    <P weight={"bold"}>수량</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild padding={15}>
                            <VerticalFlex>
                                {
                                    orderProducts &&
                                    orderProducts.map((row, index) => {

                                        return (
                                            <FlexChild key={index}>

                                                <HorizontalFlex>
                                                    <FlexChild>
                                                        <P>{row.product.brandTitle} {row.product.title}</P>
                                                    </FlexChild>
                                                    <FlexChild justifyContent={"center"}>
                                                        <InputNumber
                                                            value={row.quantity}
                                                            onChange={(newValue) => handleQuantityChange(index, newValue)}
                                                        />
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        );
                                    })
                                }
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild>
                            <CButton onClick={onUpdateClick}>수정하기</CButton>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </ModalBase>
        );
    }
);

export default ShippingInfoUpdateModal;