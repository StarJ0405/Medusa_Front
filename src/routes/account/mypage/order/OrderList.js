import { useContext, useEffect, useState } from "react";
import OrderListRow from "./OrderListRow";
import NiceModal from "@ebay/nice-modal-react";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Center from "layouts/wrapper/Center";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import { addCommas, getCurrentLanguageCode } from "shared/utils/Utils";
import { requester } from "App";
import CustomButton from "components/buttons/CustomButton";

function OrderList(props) {
    const { data } = props;
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const onPurchaseOrderClick = () => {
        NiceModal.show("purchaseOrder", { data: data });
    }

    useEffect(() => {


        let orderData = data;
        console.log(orderData);
        // requester.updatePurchaseOrderAddressUpdate(orderData, (result => {
        //     console.log(result.data);
        // }))
    }, [data]);

    // const shippingInfoEditClick = () => {
    //     NiceModal.show("purchaseOrderShippingInfoEditModal", { data: data });
    // }

    const buttonStyle = {
        width: "50%",
        '--cui-btn-line-height': '18px',
        '--cui-btn-color': 'var(--main-color)',
        backgroundColor: "var(--main-color)",
        color: "white",
        border: "none"
    }


    return (
        <HorizontalFlex padding={"10px 0"}>
            <FlexChild width={isMobile ? "100px" : "150px"} justifyContent={"center"}>
                <Center>
                    {/* <P>{data.createDateTime.slice(0, 10)}</P> */}
                    <P>{data.createDateTime.replace('T', ' ').slice(0, 10)}</P>
                    <P>{data.createDateTime.replace('T', ' ').slice(11, 19)}</P>
                    <P onClick={onPurchaseOrderClick} cursor color={"#999"} size={"10pt"}>{t("detailInfo")}</P>
                </Center>
            </FlexChild>
            <FlexChild justifyContent={"center"}>
                {
                    data &&
                    <HorizontalFlex >
                        {
                            !isMobile &&
                            <FlexChild justifyContent={"flex-start"} width={"initial"}>
                                <div>
                                    <img width={"100px"} src={data.orderProducts[0].product.image} />
                                </div>
                            </FlexChild>
                        }

                        <FlexChild>
                            <Center>

                                <P>{data.orderProducts[0].product.brandTitle}</P>
                                <P>{data.orderProducts[0].product.title} {t("other")} {data.orderProducts.length - 1} {t("cases")}</P>
                            </Center>
                        </FlexChild>
                    </HorizontalFlex>
                }
            </FlexChild>
            {
                data ?
                    <>
                        {
                            !isMobile &&
                            <Center>
                                {/* <P>{data.provinceLabel}{data.cityLabel}</P> */}
                                <P>{data.addressDetail}</P>
                                <P>우편번호 : {data.postalCodeLabel}</P>
                                {/* <FlexChild>
                                    <CustomButton style={buttonStyle} text={"수정"} onClick={shippingInfoEditClick} />
                                </FlexChild> */}
                            </Center>

                        }
                    </>
                    :
                    null
            }
            {
                !isMobile &&
                <FlexChild width={"100px"} justifyContent={"center"}>
                    <P weight={"bold"} color={"var(--main-color)"} padding={"20px"}>{addCommas(data.price + data.vat + data.deliveryFee)}&#8361; </P>
                </FlexChild>
            }

            <FlexChild width={"100px"} justifyContent={"center"}>
                <Center>
                    {
                        data &&
                        <P>{t(data.status)}</P>
                    }
                </Center>
            </FlexChild>
        </HorizontalFlex >

    );
}

export default OrderList;