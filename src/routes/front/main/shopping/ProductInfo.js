import ProgressBar from "components/progressBar/ProgressBar";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ProductInfo.module.css"

import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useTranslation } from "react-i18next";
import Center from "layouts/wrapper/Center";
import Flex from "layouts/flex/Flex";
import { useContext, useEffect, useState } from "react";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import RadarChart from "components/chart/RadarChart";
import { getCurrentLanguageCode } from "shared/utils/Utils";


function ProductInfo(props) {
    const {data} = props;
    const {isMobile} = useContext(BrowserDetectContext);
    const { t } = useTranslation();

    return (
        <div className={style.container}>
            <Flex direction={isMobile ? "vertical" : "horizontal"} justifyContent={"center"}>
                <FlexChild maxWidth={500} alignItems={"flex-start"} >
                    <VerticalFlex alignItems={"flex-start"}>
                        <HorizontalFlex alignItems={"flex-start"}>
                            <FlexChild width={70} padding={"5px"} >
                                <p className={style.title}>{t("productName")}</p>
                            </FlexChild>
                            <FlexChild height={"max-content"} padding={"5px"} >
                                <Center width={"100%"} textAlign={"left"}>
                                    <p className={style.content}>{data.brandTitle}&nbsp;{data.title}</p>
                                </Center>
                            </FlexChild>
                        </HorizontalFlex>
                        <HorizontalFlex alignItems={"flex-start"}>
                            <FlexChild width={70} padding={"5px"} >
                                <p className={style.title}>{t("volume")}</p>
                            </FlexChild>
                            <FlexChild height={"max-content"} padding={"5px"} >
                                <Center width={"100%"} textAlign={"left"}>
                                    <p className={style.content}>30ml</p>
                                </Center>
                            </FlexChild>
                        </HorizontalFlex>
                        {/* <HorizontalFlex alignItems={"flex-start"}>
                            <FlexChild width={70} padding={"5px"} >
                                <p className={style.title}>{t("nicotine")}</p>
                            </FlexChild>
                            <FlexChild height={"max-content"} padding={"5px"} >
                                <Center width={"100%"} textAlign={"left"}>
                                    <p className={style.content}>0.98% | 2% | 3%</p>
                                </Center>
                            </FlexChild>
                        </HorizontalFlex> */}
                        <HorizontalFlex alignItems={"flex-start"}>
                            <FlexChild width={70} padding={"5px"} >
                                <p className={style.title}>{t("expiryDate")}</p>
                            </FlexChild>
                            <FlexChild height={"max-content"} padding={"5px"} >
                                <Center width={"100%"} textAlign={"left"}>
                                    <p className={style.content}>{t("fromTheDateOfManufacture")} 2{t("year")}</p>
                                </Center>
                            </FlexChild>
                        </HorizontalFlex>
                        {/* <HorizontalFlex alignItems={"flex-start"}>
                            <FlexChild width={70} padding={"5px"} >
                                <p className={style.title}>{t("mainIngredient")}</p>
                            </FlexChild>
                            <FlexChild height={"max-content"} padding={"5px"} >
                                <Center width={"100%"} textAlign={"left"}>
                                    <p className={style.content}>{t("vegetableGlycerin")}, {t("propyleneGlycol")}, {t("flavor")}, {t("syntheticNicotine")}</p>
                                </Center>
                            </FlexChild>
                        </HorizontalFlex> */}
                    </VerticalFlex>
                </FlexChild>
                {/* <FlexChild width={250}>
                    <PaddingWrapper padding={20}>
                       <RadarChart data={data.productSpecs}/>
                    </PaddingWrapper>
                </FlexChild> */}
            </Flex>
        </div>
    );
}

export default ProductInfo;