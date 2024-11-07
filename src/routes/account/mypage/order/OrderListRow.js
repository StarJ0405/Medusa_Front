import { CButton } from "@coreui/react";
import P from "components/P";
import { t } from "i18next";
import Flex from "layouts/flex/Flex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useContext, useEffect } from "react";
import style from "./OrderListRow.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { addCommas, getCurrentLanguageCode } from "shared/utils/Utils";

function OrderListRow(props) {
    const { data } = props;
    const { isMobile } = useContext(BrowserDetectContext);
    const onTrackOrderClick = () => {
        NiceModal.show("trackOrder", { id: data.product.id });
    }


    return (
        <div className={style.wrap}>
            {
                isMobile
                    ?
                    <FlexChild>
                        <div className={style.tableHeaderWrap}>
                            <HorizontalFlex>
                                <FlexChild height={"120px"} borderRight={"1px solid #999"}>
                                    <HorizontalFlex>
                                        <FlexChild width={"max-content"}>
                                            <div className={style.imgWrap}>
                                                <img width={"85%"} src={data.product.image} />
                                            </div>
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-start"}>
                                            <VerticalFlex>
                                                <FlexChild>
                                                    <Center width={"100%"} textAlign={"left"}>
                                                        <P color={"#999"}>{data.product.brandTitle}</P>
                                                        <P>{data.product.title}</P>
                                                        <P>{t("quantity")} : {data.quantity}</P>
                                                        <P weight={"bold"} color={"var(--main-color)"}>{addCommas(data.amount)}&#8361;</P>
                                                    </Center>
                                                </FlexChild>
                                            </VerticalFlex>
                                        </FlexChild>

                                    </HorizontalFlex>
                                </FlexChild>

                                <FlexChild width={"120px"} justifyContent={"center"} height={"120px"} >
                                    <VerticalFlex>
                                        <P weight={"bold"}>{t("shipping")}</P>
                                        {/* <p onClick={onTrackOrderClick} className={style.trackButton}>{t("배송추적")}</p> */}
                                    </VerticalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </div>
                    </FlexChild>
                    :
                    <FlexChild>
                        <div className={style.tableHeaderWrap}>
                            <HorizontalFlex>
                                <FlexChild height={"120px"} width={"130px"} justifyContent={"center"}>
                                    <div className={style.border}>
                                        <Center>
                                            <P>{props.time}</P>
                                            {/* <P size={"10pt"} color={"#999"}>{t("상세보기")}</P> */}
                                        </Center>
                                    </div>
                                </FlexChild>
                                <FlexChild height={"120px"} borderRight={"1px solid #999"}>
                                    <div className={style.border}>
                                        <HorizontalFlex>
                                            <FlexChild width={"max-content"}>
                                                <div className={style.imgWrap}>
                                                    <img width={"85%"} src={data.product.image} />
                                                </div>
                                            </FlexChild>
                                            <FlexChild justifyContent={"flex-start"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <Center width={"100%"} textAlign={"left"}>
                                                            <P color={"#999"}>{data.product.brandTitle}</P>
                                                            <P>{data.product.title}</P>
                                                        </Center>
                                                    </FlexChild>



                                                </VerticalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>
                                    </div>
                                </FlexChild>
                                <FlexChild width={"50px"} height={"120px"} justifyContent={"center"} borderRight={"1px solid #999"}>
                                    <div className={style.border}>
                                        <P>{data.quantity}</P>
                                    </div>
                                </FlexChild>
                                <FlexChild width={"110px"} justifyContent={"center"} height={"120px"} borderRight={"1px solid #999"}>
                                    <div className={style.border}>
                                        <P weight={"bold"} color={"var(--main-color)"}>{addCommas(data.amount)}&#8361;</P>
                                    </div>
                                </FlexChild>
                                <FlexChild width={"120px"} justifyContent={"center"} height={"120px"} >
                                    <VerticalFlex>
                                        <P weight={"bold"}>{t("orderComplete")}</P>
                                        {/* <p onClick={onTrackOrderClick} className={style.trackButton}>{t("배송추적")}</p> */}
                                    </VerticalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                        </div>
                    </FlexChild>

            }
        </div>

    );
}

export default OrderListRow;