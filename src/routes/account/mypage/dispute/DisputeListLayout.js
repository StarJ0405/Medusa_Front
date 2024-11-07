import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import Container from "layouts/container/Container";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import Inline from "layouts/container/Inline";
import P from "components/P";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { CButton, CFormInput, CFormSelect } from "@coreui/react";
import style from "./DisputeListLayout.module.css"
import { requester } from "App";
import OrderList from "../order/OrderList";
import clsx from "classnames";
import DisputeList from "./DisputeList";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import TestDatePicker from "components/inputs/datePicker/TestDatePicker";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import MypageContentHeader from "../header/MypageContentHeader";

function DisputeListLayout() {
    const [isOrderList, setOrderList] = useState();
    const { t } = useTranslation();
    const { isMobile } = useContext(BrowserDetectContext);
    useEffect(() => {
        requester.getOrderProducts((result) => {
            if (result.code === 0) {

                setOrderList(result.data);
            } else if (result.code === 401) {
                // NiceModal.show("memberSignIn");
            }

        })
    }, [])




    return (
        <Container backgroundColor={"white"}>
            <VerticalFlex gap={10} padding={!isMobile ? "30px 0 0 0" : ""}>
                {/* <FlexChild>
                    <div className={style.wrap}>
                        <HorizontalFlex>
                            <FlexChild>
                                <P size={"16pt"} weight={"bold"} padding={"5px"}>{t("dispute")}</P>
                            </FlexChild>
                            <FlexChild padding={"0 10px 0 0 "}>
                                <div className={style.more}>
                                    <Inline>
                                        <P size={"12pt"} color={"var( --font-color-disabled)"}>{t("more")}</P>
                                        &nbsp;
                                        <FontAwesomeIcon size="lg" icon={faChevronRight} color={"var( --font-color-disabled)"} />
                                    </Inline>
                                </div>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild> */}
                <FlexChild>
                    {
                        isMobile &&
                        <MypageContentHeader />
                    }
                </FlexChild>
                <FlexChild>
                    <DateChoice />
                </FlexChild>
                <FlexChild>
                    <VerticalFlex>
                        <FlexChild>
                            <div className={style.tableHeaderWrap}>
                                {
                                    isMobile
                                        ?
                                        <HorizontalFlex>
                                            <FlexChild width={"100px"} justifyContent={"center"}>
                                                <P>{t("orderTime")}</P>
                                            </FlexChild>
                                            <FlexChild justifyContent={"center"}>
                                                <P>{t("product")}</P>
                                            </FlexChild>
                                            <FlexChild width={"100px"} justifyContent={"center"}>
                                                <P>{t("etc")}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                        :
                                        <HorizontalFlex>
                                            <FlexChild width={"150px"} justifyContent={"center"}>
                                                <P>{t("orderTime")}</P>
                                            </FlexChild>
                                            <FlexChild justifyContent={"center"}>
                                                <P>{t("product")}</P>
                                            </FlexChild>
                                            <FlexChild width={"50px"} justifyContent={"center"}>
                                                <P>{t("quantity")}</P>
                                            </FlexChild>
                                            <FlexChild width={"100px"} justifyContent={"center"}>
                                                <P>{t("price")}</P>
                                            </FlexChild>
                                            <FlexChild width={"150px"} justifyContent={"center"}>
                                                <P>{t("etc")}</P>
                                            </FlexChild>
                                        </HorizontalFlex>
                                }
                            </div>
                        </FlexChild>
                        <FlexChild>
                            {isOrderList
                                &&
                                isOrderList.map((data, index) => (
                                    <DisputeList row={data} key={index} index={index} />
                                ))

                            }
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
            </VerticalFlex>
        </Container>
    );
}

export default DisputeListLayout;