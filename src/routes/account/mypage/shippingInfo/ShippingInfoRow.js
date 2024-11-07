import style from "./ShippingInfoRow.module.css"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import InputNumber from "components/inputs/InputNumber";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { clone, getCurrentLanguageCode, validateInputs } from "shared/utils/Utils";
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
import { ToastContainer, toast } from "react-toastify";
import { WishReducer } from "shared/redux/reducers/shopping/WishReducer";
import CustomButton from "components/buttons/CustomButton";


const ShippingInfoRow = forwardRef((props, ref) => {
    const { isMobile } = useContext(BrowserDetectContext);
    const { shippingInfo, index } = props;
    const { t } = useTranslation();
    const [isChecked, setChecked] = useState(false);
    const [checkedData, setCheckedData] = useState();
    const [wish, setWish] = useState();
    const input = useRef();
    const [helperText, setHelperText] = useState("");
    const inputs = useRef([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const wishButtonClick = (e) => {
    //     e.stopPropagation();
    //     let wishProductData = { productId: data.product.id, wishYn: !wish };
    //     requester.updateProductWish(wishProductData, (result) => {
    //         if (result.code === 0) {
    //             dispatch(WishReducer.actions.refreshProducts(result.data));
    //             // Toast.
    //         }
    //     })
    // }

    // const onProductClick = () => {
    //     navigate(`/product/detail/${data.product.id}`);
    // }

    // const onQuantityChange = (value) => {
    //     let requestData = { id: data.id, productId: data.product.id, quantity: value };
    //     requester.updateCart(requestData, result => {
    //         if (result.code === 0) {
    //             dispatch(CartReducer.actions.refreshCart(result.data));
    //         }
    //     });
    // }

    const onDeleteClick = () => {
        const onDeleteClick = () => {
            let requestData = [{ id: shippingInfo.id }];
            
            
                requester.deleteShippingInfo(requestData, (result) => {
                    console.log(result.data);
                    props.shippingInfoCallback(result.data);
                })
          
            

            // requester.deleteShippingInfo(requestData, result => {
            //     if (result.code === 0) {
            //         dispatch(CartReducer.actions.refreshCart(result.data));
            //     }
            // });


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
        console.log("체크서클 콜백")
        if (props.callback) {
            props.callback(index, state, shippingInfo);
        }
    }

    // const addShippingInfoClick = () => {
    //     NiceModal.show("shippingInfoAddModal");
    // }



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



    const onModifyClick = (id) => {
        console.log(id);
        console.log(shippingInfo.id);
        NiceModal.show("shippingInfoEditModal", { data: shippingInfo, callback: onEditModalClose });
    }

    const onEditModalClose = (value) => {
        console.log(value);
        if (props.shippingInfoEditCallback) {
            props.shippingInfoEditCallback(value);
        }

    }


    return (
        <VerticalFlex>
            <FlexChild key={index} padding={"15px 10px"}>
                <HorizontalFlex>
                    <FlexChild width={70} >
                        <div className={style.checkboxArea}>
                            <CheckCircle ref={input} callback={callback} index={props.index} label={props.label} checkedData={checkedData} />
                        </div>
                    </FlexChild>
                    {
                        !isMobile &&
                        <FlexChild width={"10%"} justifyContent={"center"}>
                            <P>{shippingInfo && shippingInfo.receiverName}</P>
                        </FlexChild>
                    }
                    <FlexChild justifyContent={"center"}>
                        <VerticalFlex>
                            <FlexChild alignItems={"center"}>
                                <P>{`${shippingInfo && shippingInfo.provinceLabelCn} ${shippingInfo && shippingInfo.cityLabelCn} ${shippingInfo && shippingInfo.postalCodeLabel}`}</P>
                            </FlexChild>
                            <FlexChild alignItems={"center"}>
                                <P>{shippingInfo && shippingInfo.addressDetail}</P>
                            </FlexChild>
                        </VerticalFlex>
                    </FlexChild>
                    {
                        !isMobile &&
                        <FlexChild width={"150px"} justifyContent={"center"}>
                            <P>{shippingInfo && shippingInfo.mobileNo}</P>
                        </FlexChild>
                    }

                    {
                        !isMobile ?
                            <FlexChild width={"120px"} justifyContent={"center"} >
                                <P onClick={onModifyClick} cursor borderRadius={"3px"} size={"10pt"} border={"1px solid #999"} padding={"2px 20px"}>수정</P>
                                <P onClick={() => onDeleteClick(index)} color={"white"} backgroundColor={"var(--main-color)"} cursor borderRadius={"3px"} size={"10pt"} border={"1px solid transperent"} padding={"2px 20px"}>삭제</P>
                            </FlexChild>
                            :
                            <FlexChild width={"120px"}>
                                <VerticalFlex gap={5} >
                                    <FlexChild alignItems={"flex-end"}>
                                        <P onClick={onModifyClick} cursor borderRadius={"3px"} size={"10pt"} border={"1px solid #999"} padding={"2px 20px"}>수정</P>
                                    </FlexChild>
                                    <FlexChild alignItems={"flex-end"}>
                                        <P onClick={() => onDeleteClick(index)} color={"white"} backgroundColor={"var(--main-color)"} cursor borderRadius={"3px"} size={"10pt"} border={"1px solid transperent"} padding={"2px 20px"}>삭제</P>
                                    </FlexChild>
                                </VerticalFlex>

                            </FlexChild>
                    }

                </HorizontalFlex>
            </FlexChild>
        </VerticalFlex>
    );
});

export default ShippingInfoRow;

