import { CButton } from "@coreui/react";
import P from "components/P";
import { t } from "i18next";
import Flex from "layouts/flex/Flex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { useContext, useEffect } from "react";
import style from "./DisputeListRow.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useTranslation } from "react-i18next";
import { addCommas, getCurrentLanguageCode } from "shared/utils/Utils";

function DisputeListRow(props) {
    const { data } = props;
    const { isMobile } = useContext(BrowserDetectContext);
    const {t} = useTranslation();
    const onDisputeModalClick = () => {
        NiceModal.show("dispute", { id: data.product.id });
    }




    return (

        <div className={style.wrap}>
            <FlexChild>
                <div className={style.tableHeaderWrap}>
                    <HorizontalFlex>
                        <FlexChild height={"120px"} width={"150px"} justifyContent={"center"}>
                            
                                <Center>
                                    <P>20221201</P>
                                    <p onClick={onDisputeModalClick} className={style.detailButton}>{t("상세보기")}</p>
                                </Center>
                            
                        </FlexChild>
                        <FlexChild height={"120px"} borderRight={"1px solid #999"}>
                        
                            <HorizontalFlex>
                                {
                                    !isMobile &&
                                    <FlexChild>
                                        <div className={style.imgWrap}>
                                            <img width={"85%"} src={data.product.image} />
                                        </div>
                                    </FlexChild>
                                }
                                <FlexChild justifyContent={"flex-start"}>
                                    <VerticalFlex>
                                        {
                                            isMobile
                                                ?
                                                <FlexChild>
                                                    <Center width={"100%"} textAlign={"left"}>
                                                        <P color={"#999"}>{data.product.brandTitle}</P>
                                                        <P>{data.product.title}</P>
                                                        <P>{t("quantity")} : {data.quantity}</P>
                                                        <P weight={"bold"} color={"var(--main-color)"}>{addCommas(data.amount)}&#8361;</P>
                                                    </Center>
                                                </FlexChild>
                                                :
                                                <FlexChild>
                                                    <Center width={"100%"} textAlign={"left"}>
                                                        <P color={"#999"}>{data.product.brandTitle}</P>
                                                        <P>{data.product.brandTitle}</P>
                                                    </Center>
                                                </FlexChild>
                                        }
                                    </VerticalFlex>
                                </FlexChild>
                            </HorizontalFlex>
                            
                        </FlexChild>

                        {
                            !isMobile
                            &&
                            <HorizontalFlex justifyContent={"flex-end"}>
                                <FlexChild width={"50px"} height={"120px"} justifyContent={"center"} borderRight={"1px solid #999"}>
                                    
                                        <P>{data.quantity}</P>
                                    
                                </FlexChild>
                                <FlexChild width={"100px"} justifyContent={"center"} height={"120px"} borderRight={"1px solid #999"}>
                                    
                                        <P weight={"bold"} color={"var(--main-color)"}>{addCommas(data.amount)}&#8361;</P>
                                    
                                </FlexChild>
                            </HorizontalFlex>
                        }

                        <FlexChild width={"150px"} justifyContent={"center"} height={"120px"} >
                            <P weight={"bold"}>{t("교환중")}</P>
                        </FlexChild>
                    </HorizontalFlex>
                </div>
            </FlexChild>
        </div>

    );
}

export default DisputeListRow;