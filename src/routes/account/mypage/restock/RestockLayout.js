import { requester } from "App";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import { AuthContext } from "providers/AuthProvider";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import style from "./RestockLayout.module.css"
import NiceModal from "@ebay/nice-modal-react";
import { t } from "i18next";
import MypageContentHeader from "../header/MypageContentHeader";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { addCommas, clone } from "shared/utils/Utils";

function RestockLayout() {
    const [product, setProduct] = useState();
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    useEffect(() => {
        if (userName) {
            let searchCondition = clone(initialSearchCondition);
            searchCondition.productId = "a938b80c-a7ab-462b-a2ec-d5142b1610fc";
            requester.searchProducts(searchCondition, (result) => {
                setProduct(result.data[0]);
            });
        } else {
            // NiceModal.show("memberSignIn");
        }
    }, [])

    const Row = () => {
        return (
            <>
                {
                    product &&
                    <HorizontalFlex padding={"10px"}>
                        <FlexChild justifyContent={"center"}>
                            <HorizontalFlex>
                                {
                                    !isMobile &&
                                    <FlexChild width={"initial"}>
                                        <img src={product.image} width={isMobile ? "60px" : "100px"} />
                                    </FlexChild>
                                }

                                <FlexChild padding={"0 0 0 20px"}>
                                    <Center width={"100%"} textAlign={"left"}>
                                        <P size={isMobile ? "10pt" : ""}>월드인터네셔널</P>
                                        <P size={isMobile ? "10pt" : ""} weight={"bold"}>{product.brandTitleKr} 시리즈</P>
                                        <P size={isMobile ? "10pt" : ""} weight={"bold"}>{product.titleKr} 30ml</P>
                                    </Center>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild width={isMobile ? "50px" : "100px"} justifyContent={"center"}>
                            <P weight={"bold"} color={"var(--main-color)"}>{addCommas(product.price)}&#8361;</P>
                        </FlexChild>
                        <FlexChild justifyContent={"center"} width={isMobile ? "100px" : "150px"}>
                            <P size={"10pt"}>2022.12.02~<br />2023.01.01</P>
                        </FlexChild>
                        <FlexChild width={isMobile ? "80px" : "150px"} justifyContent={"center"}>
                            <P cursor size={"10pt"} borderRadius={"3px"} padding={"2px 25px"} border={"1px solid #ddd"}>삭제</P>
                        </FlexChild>
                    </HorizontalFlex >
                }

                <FlexChild padding={"10px 0 0 0"}>
                    <div className={style.line}></div>
                </FlexChild>
            </>
        );
    }

    return (
        <VerticalFlex backgroundColor={"white"}>
            <FlexChild>
                {
                    isMobile &&
                    <MypageContentHeader />
                }
            </FlexChild>
            <FlexChild>
                <div className={style.horizontalLine}></div>
            </FlexChild>
            <FlexChild backgroundColor={"var(--box-color)"} padding={"15px"}>
                {
                    isMobile
                        ?
                        <HorizontalFlex>
                            <FlexChild justifyContent={"center"}>
                                <P>{t("product")}</P>
                            </FlexChild>
                            <FlexChild width={"50px"} justifyContent={"center"}>
                                <P>{t("price")}</P>
                            </FlexChild>
                            <FlexChild justifyContent={"center"} width={"100px"}>
                                <P>{t("alarm")}</P>
                            </FlexChild>
                            <FlexChild width={"80px"} justifyContent={"center"}>
                                <P>{t("etc")}</P>
                            </FlexChild>
                        </HorizontalFlex>
                        :
                        <HorizontalFlex>
                            <FlexChild justifyContent={"center"}>
                                <P>{t("product")}</P>
                            </FlexChild>
                            <FlexChild width={"100px"} justifyContent={"center"}>
                                <P>{t("price")}</P>
                            </FlexChild>
                            <FlexChild justifyContent={"center"} width={"150px"}>
                                <P>{t("alarm")}</P>
                            </FlexChild>
                            <FlexChild width={"150px"} justifyContent={"center"}>
                                <P>{t("etc")}</P>
                            </FlexChild>
                        </HorizontalFlex>
                }
            </FlexChild>
            <FlexChild>
                {
                    userName
                        ?
                        <VerticalFlex>
                            {/* <FlexChild >
                                <Row />
                            </FlexChild>
                            <FlexChild >
                                <Row />
                            </FlexChild>
                            <FlexChild >
                                <Row />
                            </FlexChild> */}
                        </VerticalFlex>
                        :
                        <P>{t("pleaseLogin")}</P>
                }
            </FlexChild>
        </VerticalFlex>
    );
}

export default RestockLayout;