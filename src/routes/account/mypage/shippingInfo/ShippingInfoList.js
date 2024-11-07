import { useContext, useEffect, useRef, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import useAltEffect from "shared/hooks/useAltEffect";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { CartReducer } from "shared/redux/reducers/shopping/CartReducer";
import CheckCircleGroup from "components/inputs/checkBox/CheckCircleGroup";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import P from "components/P";
import NiceModal from "@ebay/nice-modal-react";
import { OrderInfoReducer } from "shared/redux/reducers/shopping/OrderInfoReducer";
import style from "./ShippingInfoList.module.css";
import { ShoppingProcessType } from "shared/constants/constants";
import CartRow from "routes/front/main/shopping/CartRow";
import FlexChild from "layouts/flex/FlexChild";
import { calculateDeliveryFee } from "shared/utils/Utils";
import Dummy from "components/Dummy";
import ShippingInfoRow from "./ShippingInfoRow";
import { Versions } from "@stomp/stompjs";
import VerticalFlex from "layouts/flex/VerticalFlex";
import CustomButton from "components/buttons/CustomButton";

function ShippingInfoList(props) {
    const { t } = useTranslation();
    // const { setViewData } = useOutletContext();

    const { isMobile } = useContext(BrowserDetectContext);
    const { shippingInfos } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => ({
        products: state.cart.products,
    }));

    const [selectedList, setSelectedList] = useState([]);
    const [selectedShippingList, setSelectedShippingList] = useState([]);
    const [shippingList, setShippingList] = useState([]);


    useAltEffect(() => {
        // window.scrollTo(0, 0);
        requester.getAllCartProducts((result) => {
            if (result.code === 0) {
                dispatch(CartReducer.actions.refreshCart(result.data));
            } else if (result.code === 401) {
                // NiceModal.show("memberSignIn");
            }
        })

    }, []);
    useEffect(() => {
        if (shippingInfos) {
            setShippingList(shippingInfos);
        }
    }, [shippingInfos])

    const findSelectedProductById = (id) => {
        const key = Object.keys(products).find(product => products[product].id === id);
        return products[key];
    }

    const onDeleteClick = () => {
        const onDeleteClick = () => {
            let requestData = selectedShippingList.map(item => ({ id: item.id }));
            console.log(requestData);
            if(requestData.length > 0){
                requester.deleteShippingInfo(requestData, (result) => {
                    console.log(result.data);
                    setShippingList(result.data);
                })
            }else{
                toast.error(t("NotDefined"), {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }
            

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

    const onCheckGroupCallback = (checkedIndex, value) => {
        console.log(checkedIndex);
        console.log(value);
        setSelectedShippingList(value);
        console.log("여기로 도착함");
        let selectedProducts = [];
        checkedIndex && checkedIndex.map((index) => {
            selectedProducts.push(products[index]);
        });
        setSelectedList(selectedProducts);
    }

    const deleteBtnStyle = {
        backgroundColor: "var(--main-color)",
        borderRadius: "3px",
        border: "1px solid white",
        padding: "10px",
        height: "30px",
        width: "auto",
        fontSize: "var(--font-size)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold"
    }
    const shippingInfoCallback = (callback) => {
        setShippingList(callback);
    }
    const shippingInfoEditCallback = (callback) => {
        console.log(callback);
        setShippingList(callback);
    }
    const onShippingInfoAddClick = () => {
        NiceModal.show("shippingInfoAddModal", { callback: addShippingInfoCallback });
    }
    const addShippingInfoCallback = (value) => {
        console.log(value);
        setShippingList((prevShippingList) => [...prevShippingList, value[0]]);
    }

    return (
        <FlexChild>
            <VerticalFlex>
                <FlexChild alignItems={"flex-end"} padding={"10px 0 0 0 "}>
                    <CustomButton text={"신규등록"} style={deleteBtnStyle} onClick={onShippingInfoAddClick} />
                </FlexChild>
                <FlexChild>
                    <CheckCircleGroup callback={onCheckGroupCallback} padding={10} backgroundColor={"#f5f5f5"} labelWidth={70} borderTop={"1px solid #ddd"} borderBottom={"1px solid #ddd"}
                        headerGap={10} header={!isMobile ?
                            [
                                { width: "10%", text: t("name"), alignItems: "center" },
                                { width: null, text: t("address"), alignItems: "center" },
                                // { width: "7%", text: t("address"), alignItems: "flex-start" },
                                { width: "12%", text: t("phoneNumber"), alignItems: "center" },
                                { width: "15%", text: t("management"), alignItems: "flex-start" }
                            ]
                            :
                            [
                                // { width: "10%", text: t("name"), alignItems: "center" },
                                { width: null, text: t("detail"), alignItems: "center", justifyContent: "center" },
                                // { width: "7%", text: t("address"), alignItems: "flex-start" },
                                // { width: "12%", text: t("phoneNumber"), alignItems: "center" },
                                { width: "20%", text: t("management"), alignItems: "flex-end" }
                            ]

                        }>
                        {shippingList ? shippingList.map((row, index) => (
                            <ShippingInfoRow key={index} index={index} shippingInfo={row} shippingInfoCallback={shippingInfoCallback} shippingInfoEditCallback={shippingInfoEditCallback} />
                        )) : null}
                    </CheckCircleGroup>
                </FlexChild>
                <FlexChild alignItems={"flex-Start"}>
                    <CustomButton text={"선택삭제"} style={deleteBtnStyle} onClick={onDeleteClick} />
                </FlexChild>
            </VerticalFlex>

            <Dummy height={60} />
        </FlexChild>
    );
}

export default ShippingInfoList;