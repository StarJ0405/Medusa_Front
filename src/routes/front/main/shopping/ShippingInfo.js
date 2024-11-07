import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";

const ShippingInfo = forwardRef((props, ref) => {
    const { t } = useTranslation();
    const [shippingInfo, setShippingInfo] = useState();

    useEffect(() => {
        if (props.readOnly) {

        } else {
            requester.getDefaultShippingInfo(result => {
                setShippingInfo(result.data);
            });
        }

    }, []);


    const onShippingInfoClick = () => {
        if (props.readOnly) {

        } else {
            if (shippingInfo) {
                NiceModal.show("shippingInfoSelectModal", { onClose: onShippingInfoModalClose });
            } else {
                NiceModal.show("shippingInfoAddModal", { onClose: onShippingInfoModalClose });
            }
        }

    }

    const onShippingInfoModalClose = () => {
        requester.getDefaultShippingInfo(result => {
            if (result.code === 0) {
                setShippingInfo(result.data);
            }
        });
    }

    useImperativeHandle(ref, () => ({
        getValue() {
            return shippingInfo;
        },
        setValue(value) {
            setShippingInfo(value);
        }
    }));

    return (
        <div onClick={onShippingInfoClick}>
            {
                shippingInfo ?
                    <VerticalFlex>
                        <FlexChild alignItems="flex-start">
                            <P>{shippingInfo.receiverName}</P>
                        </FlexChild>
                        <FlexChild alignItems="flex-start">
                            <P>{shippingInfo.mobileNo}</P>
                        </FlexChild>
                        <FlexChild alignItems="flex-start">
                            <P>({shippingInfo.postalCodeLabel}) {shippingInfo.provinceLabelCn} {shippingInfo.cityLabelCn} {shippingInfo.addressDetail}</P>
                        </FlexChild>
                    </VerticalFlex>
                    :
                    <VerticalFlex gap={10} padding={"10px 0px"}>
                        <FlexChild alignItems="flex-start">
                            <P>{t("noShippingInfo")}</P>
                        </FlexChild>
                        <FlexChild alignItems="flex-start">
                            <P size={13} color={"#2E9CC3"} weight={"bold"}>+ {t("addAddress")}</P>
                        </FlexChild>
                    </VerticalFlex>
            }
        </div>
    );
});

export default ShippingInfo;