import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import NormalProductCard from "components/card/product/NormalProductCard";
import SpecialPriceCard from "components/card/product/SpecialPriceCard";

import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import CardList from "layouts/wrapper/CardList";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./SeriesLayout.module.css";
import specialPriceBanner from "resources/img/urlBanner/specialPrice.png";
import UrlBanner from "components/UrlBanner";
import MobileSearchBar from "components/MobileSearchBar";
import backgrouncImg from "resources/img/series/background.png";
import icon1 from "resources/img/main/icon1.png"
import { getCurrentLanguageCode } from "shared/utils/Utils";
import Center from "layouts/wrapper/Center";
import Dummy from "components/Dummy";
import initialSearchCondition from "InitialData/InitialSearchCondition.json";
import { useNavigate } from "react-router-dom";
import { clone } from "lodash";

function SeriesLayout() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const [brands, setBrands] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        requester.getAllBrands((result => {
            console.log(result.data);
            setBrands(result.data);
        }))
    }, [])

    const HorizontalCard = (props) => {
        const onBrandClick = () => {
            let productSearchCondition = clone(initialSearchCondition);
            
            productSearchCondition.brands = [props.id];
            console.log(productSearchCondition.brands);
            navigate("/productList/search", {
                state: {
                    productSearchCondition: productSearchCondition
                }
            });
            // navigate(`/product/detail/${data.id}`);
        }

        return (
            <div style={{ position: "relative", cursor: "pointer" }} onClick={onBrandClick}>
                <img width={"15%"} src={props.img} style={{ position: "relative", zIndex: 3, left: "2%", borderRadius: "20px" }} />
                <div className={style.horizontalCard}>
                    <VerticalFlex flexStart>
                        <FlexChild padding={"0 0 0 30%"}>
                            <HorizontalFlex>
                                <FlexChild>
                                    <P weight={"bold"} size={"min(24pt, 3vw)"}>{props.title}</P>
                                </FlexChild>
                                <FlexChild justifyContent={"flex-end"} padding={"0 20px 0 0"}>
                                    {/* <img src={icon1} />
                                    <P>입호흡</P> */}
                                </FlexChild>

                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild padding={"0 0 0 30%"}>
                            <P weight={"bold"} size={"min(16pt, 2vw)"}>{props.title}</P>
                        </FlexChild>
                        <FlexChild padding={"0 0 0 30%"} width={"60%"}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",

                            }}>
                                {
                                    props.product &&
                                    props.product.map((row, index) => {
                                        return (

                                            <div style={{ display: "flex", flex: "1 1 45%" }}>
                                                <HorizontalFlex gap={10}>
                                                    <FlexChild width={"max-content"}>
                                                        <div style={{ width: "15px", height: "15px", borderRadius: "50%", backgroundColor: row.color ?row.color : "#e7e7e7" }}></div>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <Center width={"95%"} textAlign={"left"}>
                                                            <P ellipsis size={"1vw"}>{row.title}</P>
                                                        </Center>
                                                        {/* brand={row.brandTitle} productName={row.title} */}
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </div>


        );
    }

    

    return (
        <Container>
            asdasd
            <VerticalFlex gap={30}>
                {/* {isMobile &&
                    <FlexChild height={35}>
                        <div className={style.mobileSearchBar}>
                            <MobileSearchBar />
                        </div>
                    </FlexChild>
                } */}
                <FlexChild>
                    <div className={style.topBg} style={{ backgroundImage: `url(${backgrouncImg})` }}>
                        <Container maxWidth={1200}>
                            <div style={{ position: "relative" }}>
                                <FlexChild>
                                    <P size={"52pt"} color={"white"}>SERIES Flavor</P>
                                    <P color={"white"}>액상 시리즈별</P>
                                </FlexChild>
                                {
                                    brands &&
                                    <div style={{ position: "absolute", top: "-10%", left: "30%" }}>
                                        <div style={{ position: "absolute", top: "250px", left: "70%", transform: "translate(-50%, -50%)" }}>
                                            <img src={brands[30].image} width={"200px"} className={style.sectionImg} />
                                        </div>
                                        <div style={{ position: "absolute", top: "300px", left: "60%", transform: "translate(-50%, -50%)" }}>
                                            <img src={brands[31].image} width={"200px"} className={style.sectionImg} />
                                        </div>
                                        <div style={{ position: "absolute", top: "350px", left: "50%", transform: "translate(-50%, -50%)" }}>
                                            <img src={brands[32].image} width={"200px"} className={style.sectionImg} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </Container>
                    </div>
                </FlexChild>
                <FlexChild maxWidth={1200} alignItems={"flex-start"}>
                    <VerticalFlex>
                        <FlexChild>
                            <VerticalFlex gap={120}>
                                {
                                    brands &&
                                    brands.map((row, index) => {
                                        
                                        return (
                                            <FlexChild>
                                                <HorizontalCard img={row.image} title={row.title} product={row.children} id={row.id} />
                                            </FlexChild>
                                        )

                                    })
                                }
                                <Dummy height={"150px"} />
                            </VerticalFlex>
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
            </VerticalFlex>



        </Container>
    );

}

export default SeriesLayout;