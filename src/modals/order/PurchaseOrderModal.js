import ModalBase from "modals/base/ModalBase";
import { useContext, useEffect, useRef } from "react";
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



const PurchaseOrderModal = NiceModal.create(
    (props, ref) => {
        const modal = useRef();
        const [withHeader, withFooter] = [true,
            false];
        const { isMobile } = useContext(BrowserDetectContext);
        const { t } = useTranslation();
        const [width, height] = [isMobile ? "100%" : "730px", "65vh"];
        const withCloseButton = true;
        const clickOutsideToClose = true;
        const title = t("orderHistory");
        const { data } = props;
        const buttonText = "close";

        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <div className={style.wrap}>
                    <FlexChild>
                        <HorizontalFlex padding={5}>
                            <FlexChild width={"max-content"}>
                                <VerticalFlex >
                                    {/* <FlexChild alignItems={"flex-end"}>
                                        <P weight={"bold"}>{t("name")} : </P>
                                    </FlexChild>
                                    <FlexChild alignItems={"flex-end"}>
                                        <P weight={"bold"}>{t("address")} : </P>
                                    </FlexChild>
                                    <FlexChild>
                                        <P weight={"bold"}>ZIPCODE : </P>
                                    </FlexChild> */}

                                </VerticalFlex>
                            </FlexChild>
                            <FlexChild>
                                {
                                    data &&
                                    <VerticalFlex flexStart>
                                        {/* <FlexChild>
                                            <P>{data.receiverName}</P>
                                        </FlexChild>
                                        <FlexChild>
                                            <Inline>
                                                <P>{data.provinceLabel}{data.cityLabel} </P>
                                                <P>{data.addressDetail} </P>
                                            </Inline>
                                        </FlexChild>
                                        <FlexChild>
                                            <P> {data.postalCodeLabel}</P>
                                        </FlexChild> */}


                                    </VerticalFlex>

                                }
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild padding={10}>
                        <P weight={"bold"}>주문내역</P>
                    </FlexChild>
                    {
                        data
                        &&
                        data.orderProducts.map((row, index) => (
                            <>
                                <OrderListRow data={row} index={index} key={index} time={data.createDateTime.slice(0, 10)} />
                            </>
                        ))
                    }
                    <Dummy height={150} />
                </div>
            </ModalBase>
        );
    }
);


export default PurchaseOrderModal;