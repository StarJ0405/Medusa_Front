import ModalBase from "modals/base/ModalBase";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import OrderListRow from "routes/account/mypage/order/OrderListRow";
import Dummy from "components/Dummy";
import style from "./PurchaseOrderModal.module.css";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Inline from "layouts/container/Inline";
import AdminOrderListRow from "routes/account/mypage/order/AdminOrderListRow";
import CustomButton from "components/buttons/CustomButton";
import { requester } from "App";
import { CFormSelect } from "@coreui/react";
import InputNumber from "components/inputs/InputNumber";
import { toast } from "react-toastify";

const AdminPurchaseOrderModal = NiceModal.create(
    (props, ref) => {
        const modal = useRef();
        const addNumberInput = useRef();
        const [withHeader, withFooter] = [true, false];
        const { isMobile } = useContext(BrowserDetectContext);
        const { t } = useTranslation();
        const [width, height] = [isMobile ? "100%" : "900px", "65vh"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = t("주문목록");
        const { data, status } = props;
        const [list, setList] = useState();
        const [updateList, setUpdateList] = useState(false);
        const [addList, setAddList] = useState();
        const buttonText = "close";
        const [value, setValue] = useState();
        const [vendors, setVendors] = useState();
        const [brands, setBrands] = useState();
        const [products, setProducts] = useState();
        const [updateListData, setUpdateListData] = useState();
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
            setMounted(true);
        }, [])

        useEffect(() => {
            setList(data);
        }, [data])

        useEffect(() => {
            if (mounted) {
                requester.getAllVendors((result) => {
                    setVendors(result.data);
                });

                requester.getAllBrandsForAdmin((result) => {
                    setBrands(result.data);

                });
            }
        }, [mounted])
        const onVendorChange = (e) => {
            const value = e.target.value;
            if (value) {
                let data = { vendorAccountId: value }
                requester.findProductsByVendorId(data, (result) => {
                    setProducts(result.data);
                })
            }


        }
        const productsRef = useRef();
        const onProductChange = (e) => {
            console.log(e.target.value);
        }
        const callback = (e) => {
            console.log(e);
            setValue(e);
            setList(e);
        }
        const addOrderProductClick = () => {

            let newProduct = list.orderProducts[0];
            setAddList(newProduct);
        }

        useEffect(() => {
            if (props.onClose) {
                props.onClose(value)
            }
        }, [value])

        useEffect(() => {
            if (updateList) {
                console.log("업데이트 시작")
                requester.updatePurchaseOrder(updateList, (result) => {
                    if (result.code === 401) {
                        toast.error(t("ERROR"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    }
                    else if (result.code === 0) {
                        toast.success(t("수정되었습니다"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                        setList(updateList);
                        if (props.onClose) {
                            props.onClose(result.data)
                        }
                    }
                    else {
                        toast.error(t("ERROR"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    }
                })
            }
        }, [updateList]);

        useEffect(() => {
            if (updateListData) {
                const updatedOrderProducts = [...list.orderProducts];
                updatedOrderProducts.push(updateListData);
                const totalPrice = updatedOrderProducts.reduce((acc, product) => acc + product.amount, 0);
                const vat = totalPrice * 0.1;
                const listData = list;

                setUpdateList(prevState => ({
                    ...listData,
                    orderProducts: updatedOrderProducts,
                    price: totalPrice,
                    vat: vat
                }))
                setAddList();
            }
        }, [updateListData]);

        const onAddOrderProductClick = () => {
            console.log("po", list);
            const selectedProductId = productsRef.current.value; // 선택된 상품의 ID
            const productQuantity = addNumberInput.current.getValue();

            let filteredArray = list.orderProducts.filter((row) => row.product.id === selectedProductId);
            if (filteredArray.length === 0) {
                let orderProduct =
                {
                    id: "",
                    purchaseOrderId: list.id,
                    productId: selectedProductId,
                    quantity: productQuantity
                }

                requester.createOrderProduct(orderProduct, (result) => {
                    if (result.code === 401) {
                        toast.error(t("ERROR"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    }
                    else if (result.code === 0) {
                        toast.success(t("수정되었습니다"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                        setList(result.data);
                        setAddList();
                        if (props.onClose) {
                            props.onClose(result.data)
                        }
                    }
                    else {
                        toast.error(t("ERROR"), {
                            autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                        });
                    }
                })

            } else {
                toast.error("중복된 품목입니다", {
                    autoClose: 1000, position: toast.POSITION.BOTTOM_CENTER
                });
            }

            // if (selectedProduct) {
            //     setUpdateListData({
            //         ...addList,
            //         id: "",
            //         quantity: productQuantity,
            //         price: selectedProduct.price,
            //         amount: productQuantity * selectedProduct.price,
            //         purchaseOrderAmount: 0,
            //         product: {
            //             ...selectedProduct // 선택된 상품의 나머지 정보를 복사
            //             // 기본 수량 설정, 필요에 따라 변경 가능
            //             // 기타 필요한 상태 업데이트
            //         }
            //     });
            // }
        }

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <div className={style.wrap}>
                    <VerticalFlex gap={15}>
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <div style={{ borderBottom: "1px solid #999" }}>
                                        <HorizontalFlex>
                                            <FlexChild width={"130px"} borderRight={"1px solid #999"}>
                                                <div style={{ padding: "10px" }}>
                                                    <Center>
                                                        <P>날짜</P>
                                                    </Center>
                                                </div>
                                            </FlexChild>
                                            <FlexChild borderRight={"1px solid #999"}>
                                                <div style={{ padding: "10px 0 " }}>
                                                    <Center>
                                                        <P>상품</P>
                                                    </Center>
                                                </div>
                                            </FlexChild>
                                            <FlexChild width={"160px"} borderRight={"1px solid #999"}>
                                                <div style={{ padding: "10px 0 " }}>
                                                    <Center>
                                                        <P>수량</P>
                                                    </Center>
                                                </div>
                                            </FlexChild>
                                            <FlexChild width={"130px"} borderRight={"1px solid #999"}>
                                                <div style={{ padding: "10px 0 " }}>
                                                    <Center>
                                                        <P>금액</P>
                                                    </Center>
                                                </div>
                                            </FlexChild>
                                            <FlexChild width={"150px"} borderRight={"1px solid #999"}>
                                                <div style={{ padding: "10px 0 " }}>
                                                    <Center>
                                                        <P>상태</P>
                                                    </Center>
                                                </div>
                                            </FlexChild>
                                            <FlexChild width={"100px"} borderRight={"1px solid #999"}>
                                                <div style={{ padding: "10px 0 " }}>
                                                    <Center>
                                                        <P>비고</P>
                                                    </Center>
                                                </div>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                                {
                                    list
                                    &&
                                    list.orderProducts.map((row, index) => (
                                        <FlexChild>
                                            <AdminOrderListRow callback={callback} data={row} index={index} key={index} status={data.status} time={data.createDateTime.slice(0, 10)} purchaseOrderId={data.id} />
                                        </FlexChild>
                                    ))
                                }
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild>
                            {
                                addList &&
                                <VerticalFlex>
                                    <FlexChild height={"100px"} justifyContent={"center"} padding={15} >
                                        <HorizontalFlex>
                                            <FlexChild width={"25%"} >

                                                <Center>
                                                    <P>입점사를 선택하세요</P>
                                                    <CFormSelect onChange={onVendorChange}>
                                                        <option>선택하세요</option>
                                                        {
                                                            vendors &&
                                                            vendors.map((row, index) => (
                                                                <option value={row.id}>{row.businessName}</option>
                                                            ))
                                                        }
                                                    </CFormSelect>
                                                </Center>

                                            </FlexChild>
                                            <FlexChild >

                                                <Center>
                                                    <P>상품을 선택하세요</P>
                                                    <CFormSelect onChange={onProductChange} ref={productsRef}>
                                                        <option>선택하세요</option>
                                                        {
                                                            products &&
                                                            products.map((row, index) => (
                                                                <option value={row.id}>{row.brandTitle} {row.title}</option>
                                                            ))
                                                        }
                                                    </CFormSelect>
                                                </Center>

                                            </FlexChild>
                                            <FlexChild width={"20%"}>
                                                <VerticalFlex gap={5}>
                                                    <FlexChild>
                                                        <P>수량</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <Center>
                                                            <InputNumber ref={addNumberInput} />
                                                        </Center>
                                                    </FlexChild>

                                                </VerticalFlex>

                                            </FlexChild>
                                        </HorizontalFlex>

                                    </FlexChild>
                                    <FlexChild alignItems={"flex-end"} padding={"0 10px 0 0"}>
                                        <CustomButton text={"추가"} onClick={onAddOrderProductClick} />
                                    </FlexChild>
                                </VerticalFlex>

                            }
                        </FlexChild>
                        <FlexChild borderTop={"1px solid #999"} padding={"10px"}>
                            <Center>
                                <CustomButton text={"품목추가"} onClick={addOrderProductClick} />
                            </Center>
                        </FlexChild>
                    </VerticalFlex>
                    <Dummy height={150} />
                </div>
            </ModalBase>
        );
    }
);


export default AdminPurchaseOrderModal;