import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ProductStatus.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import Inline from "layouts/container/Inline";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requester } from "App";
import { useTranslation } from "react-i18next";

function ProductStatus() {
    const navigate = useNavigate();
    const [isMounted, setMounted] = useState(false);
    const [data, setData] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        setMounted(true);

    }, [])

    const onTotalProductClick = () => {
        navigate("/admin/productStatus/allProduct");
    }

    const onProductOnSaleClick = () => {
        navigate("/admin/productStatus/productsOnSale");
    }

    const onSoldoutProductClick = () => {
        navigate("/admin/productStatus/soldOutProduct");
    }

    const onNotShownProductClick = () => {
        navigate("/admin/productStatus/soldOutProduct");
    }

    const onMainItemsOnShowProductClick = () => {
        navigate("/admin/productStatus/mainItemsOnShow");
    }

    useEffect(() => {
        if (isMounted) {
            requester.getProductStatistics((result) => {
                setData(result.data);
            })
        }
    }, [isMounted]);


    return (
        <div className={style.wrap}>
            {
                data &&
                <HorizontalFlex>
                    <FlexChild justifyContent={"center"} >
                        <HorizontalFlex>
                            <FlexChild>
                                <VerticalFlex gap={10}>
                                    <FlexChild>
                                        <CustomIcon name={"allProduct"} width={30} />
                                    </FlexChild>
                                    <FlexChild>
                                        <P weight={"bold"}>{t("allProduct")}</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <Inline>
                                            <P cursor hover onClick={onTotalProductClick} weight={"bold"} size={"16pt"} color={"var(--main-color)"}>{data.allProduct}</P>
                                            <P size={"13pt"}> 개</P>
                                        </Inline>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild justifyContent={"center"} >
                        <HorizontalFlex>
                            <FlexChild>
                                <VerticalFlex gap={10}>
                                    <FlexChild>
                                        <CustomIcon name={"productsOnSale"} width={30} />
                                    </FlexChild>
                                    <FlexChild>
                                        <P weight={"bold"}>{t("productsOnSale")}</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <Inline>
                                            <P cursor hover onClick={onProductOnSaleClick} weight={"bold"} size={"16pt"} color={"var(--main-color)"}>{data.productsOnSale}</P>
                                            <P size={"13pt"}> 개</P>
                                        </Inline>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild justifyContent={"center"} >
                        <HorizontalFlex>
                            <FlexChild>
                                <VerticalFlex gap={10}>
                                    <FlexChild>
                                        <CustomIcon name={"soldOutProduct"} width={30} />
                                    </FlexChild>
                                    <FlexChild>
                                        <P weight={"bold"}>{t("soldOutProduct")}</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <Inline>
                                            <P cursor hover onClick={onSoldoutProductClick} weight={"bold"} size={"16pt"} color={"var(--main-color)"}>{data.soldOutProduct}</P>
                                            <P size={"13pt"}> 개</P>
                                        </Inline>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild justifyContent={"center"} >
                        <HorizontalFlex>
                            <FlexChild>
                                <VerticalFlex gap={10}>
                                    <FlexChild>
                                        <CustomIcon name={"productNotShown"} width={30} />
                                    </FlexChild>
                                    <FlexChild>
                                        <P weight={"bold"}>{t("productNotShown")}</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <Inline>
                                            <P cursor hover onClick={onNotShownProductClick} weight={"bold"} size={"16pt"} color={"var(--main-color)"}>{data.productNotShown}</P>
                                            <P size={"13pt"}> 개</P>
                                        </Inline>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                    <FlexChild justifyContent={"center"} >
                        <HorizontalFlex>
                            <FlexChild>
                                <VerticalFlex gap={10}>
                                    <FlexChild>
                                        <CustomIcon name={"mainItemsOnShow"} width={30} />
                                    </FlexChild>
                                    <FlexChild>
                                        <P weight={"bold"}>{t("mainItemsOnShow")}</P>
                                    </FlexChild>
                                    <FlexChild>
                                        <Inline>
                                            <P cursor hover onClick={onMainItemsOnShowProductClick} weight={"bold"} size={"16pt"} color={"var(--main-color)"}>{data.mainItemsOnShow}</P>
                                            <P size={"13pt"}> 개</P>
                                        </Inline>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                </HorizontalFlex>
            }
        </div>
    );
}

export default ProductStatus;