import { useEffect, useState, useRef, useContext } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useTranslation } from "react-i18next";
import ModalBase from "modals/base/ModalBase";
import style from "./ShippingInfoSelectModal.module.css"
import Radio from "components/inputs/radio/Radio";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import FixedFooter from "layouts/container/FixedFooter";
import ButtonEclipse from "components/buttons/ButtonEclipse";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import Dummy from "components/Dummy";
import { BrowserDetectContext } from "providers/BrowserEventProvider";


const ShippingInfoSelectModal = NiceModal.create(
    (props) => {
        const { isMobile } = useContext(BrowserDetectContext);
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["min(100%, 500px)", isMobile ? "60%" : "min(100%, 500px)"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = t("selectShippingInfo");
        const buttonText = t("close");
        const modal = useRef();
        const [shippingInfos, setShippingInfos] = useState();
        const [selectedShippingInfoId, setSelectedShippingInfoId] = useState();


        useEffect(() => {
            requester.getAllShippingInfos((result) => {
                // let responseData = result.data;
                // let selectedId;
                // responseData.map((row) => {
                //     if (row.defaultYn) {
                //         selectedId = row.id;
                //     }
                // });

                setShippingInfos(result.data);
                console.log(result.data);
                // setSelectedShippingInfoId(selectedId);
            });


            return () => {
                if (props.onClose) {
                    props.onClose();
                }
            }
        }, []);

        const onShippingInfoClick = (shippingInfo) => {
            setSelectedShippingInfoId(shippingInfo.id);
            let value = shippingInfo;
            let disabled = true;
            let checked = true;
            if (props.callback) {
                props.callback(value, disabled, checked);
            }
        }

        const onAddShippingInfoClick = () => {
            NiceModal.show("shippingInfoAddKrModal", { onClose: onShippingInfoModalClose });
        }

        const onEditButtonClick = (e, shippingInfo) => {
            e.stopPropagation();
            NiceModal.show("shippingInfoEditModal", { data: shippingInfo, onClose: onShippingInfoModalClose });
        }

        const onShippingInfoModalClose = () => {
            requester.getAllShippingInfos((result) => {
                // let responseData = result.data;
                // let selectedId;
                // responseData.map((row) => {
                //     if (row.defaultYn) {
                //         selectedId = row.id;
                //     }
                // });

                setShippingInfos(result.data);
                
                // setSelectedShippingInfoId(selectedId);
            });
        }

        useEffect(() => {
            if (selectedShippingInfoId) {
                let data = { id: selectedShippingInfoId }
                requester.updateDefaultShippingInfo(data, (result) => {
                    let responseData = result.data;
                    let selectedId;
                    responseData.map((row) => {
                        if (row.defaultYn) {
                            selectedId = row.id;
                        }
                    });

                    setShippingInfos(result.data);
                    setSelectedShippingInfoId(selectedId);
                });
            }
        }, [selectedShippingInfoId]);

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText} borderRadius={10} >
                <div className={style.wrap}>
                    {
                        isMobile
                            ?
                            <VerticalFlex gap={5}>
                                {
                                    shippingInfos ?
                                        shippingInfos.map((shippingInfo, index) =>
                                            <FlexChild height={"initial"} key={index}>
                                                <VerticalFlex gap={10}>
                                                    <FlexChild>
                                                        <div className={style.shippingInfoCard} onClick={() => onShippingInfoClick(shippingInfo)}>
                                                            <HorizontalFlex>
                                                                <FlexChild width={50} padding={"0 0 0 20px"}>
                                                                    <Radio name={"name"} value={shippingInfo.id} selectedValue={selectedShippingInfoId} />
                                                                </FlexChild>
                                                                <FlexChild>
                                                                    <VerticalFlex>
                                                                        <FlexChild alignItems="flex-start">
                                                                            <P>{shippingInfo.receiverName}</P>
                                                                        </FlexChild>
                                                                        <FlexChild alignItems="flex-start">
                                                                            <P>{shippingInfo.mobileNo}</P>
                                                                        </FlexChild>
                                                                        <FlexChild alignItems="flex-start">
                                                                            <P>{shippingInfo.addressDetail}</P>
                                                                        </FlexChild>
                                                                        <FlexChild>
                                                                            <PaddingWrapper padding={"10px 0px"}>
                                                                                <HorizontalFlex justifyContent={"flex-start"} gap={20}>
                                                                                    <FlexChild width={"initial"}>
                                                                                        <div onClick={(e) => onEditButtonClick(e, shippingInfo)}>
                                                                                            <P size={13} color={"#2E9CC3"} weight={"bold"}>{t("edit")}</P>

                                                                                        </div>
                                                                                    </FlexChild>
                                                                                </HorizontalFlex>
                                                                            </PaddingWrapper>
                                                                        </FlexChild>
                                                                    </VerticalFlex>
                                                                </FlexChild>
                                                            </HorizontalFlex>
                                                        </div>
                                                    </FlexChild>

                                                </VerticalFlex>
                                            </FlexChild>
                                        )

                                        :
                                        <VerticalFlex gap={10} padding={"10px 0px"}>
                                            <FlexChild alignItems="flex-start">
                                                <P>{t("noShippingInfo")}</P>
                                            </FlexChild>
                                            <FlexChild alignItems="flex-start">
                                                <P size={13} cursor onClick={onAddShippingInfoClick} color={"#2E9CC3"} weight={"bold"}>+ {t("addAddress")}</P>
                                            </FlexChild>
                                        </VerticalFlex>
                                }
                                <FlexChild alignItems="flex-start">
                                    <P size={13} cursor onClick={onAddShippingInfoClick} color={"#2E9CC3"} weight={"bold"}>+ {t("addAddress")}</P>
                                </FlexChild>
                                <FlexChild height={200}></FlexChild>
                            </VerticalFlex>
                            :
                            <VerticalFlex gap={5}>
                                {
                                    shippingInfos && shippingInfos.length > 0 ?
                                        shippingInfos.map((shippingInfo, index) =>
                                            <FlexChild height={"initial"} key={index}>
                                                <div className={style.shippingInfoCard} onClick={() => onShippingInfoClick(shippingInfo)}>
                                                    <HorizontalFlex>
                                                        <FlexChild width={50} padding={"0 0 0 20px"}>
                                                            <Radio name={"name"} value={shippingInfo.id} selectedValue={selectedShippingInfoId} />
                                                        </FlexChild>
                                                        <FlexChild>
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
                                                                <FlexChild>
                                                                    <PaddingWrapper padding={"10px 0px"}>
                                                                        <HorizontalFlex justifyContent={"flex-start"} gap={20}>
                                                                            <FlexChild width={"initial"}>
                                                                                <div onClick={(e) => onEditButtonClick(e, shippingInfo)}>
                                                                                    <P size={13} color={"#2E9CC3"} weight={"bold"}>{t("edit")}</P>
                                                                                </div>
                                                                            </FlexChild>
                                                                        </HorizontalFlex>
                                                                    </PaddingWrapper>
                                                                </FlexChild>
                                                            </VerticalFlex>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </div>
                                            </FlexChild>
                                        )
                                        :
                                        <VerticalFlex gap={10} padding={"10px 0px"}>
                                            <FlexChild alignItems="flex-start">
                                                <P>{t("noShippingInfo")}</P>
                                            </FlexChild>
                                            <FlexChild alignItems="flex-start">
                                                <P size={13} cursor onClick={onAddShippingInfoClick} color={"#2E9CC3"} weight={"bold"}>+ {t("addAddress")}</P>
                                            </FlexChild>
                                        </VerticalFlex>
                                }
                                <FlexChild height={200}></FlexChild>
                            </VerticalFlex>
                    }
                </div>
            </ModalBase>
        );
    }
);

export default ShippingInfoSelectModal;