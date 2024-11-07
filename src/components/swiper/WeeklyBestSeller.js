import { requester, medusaRequester } from "App";
import ProductCard from "components/card/product/ProductCard";
import Dummy from "components/Dummy";
import P from "components/P";
import Inline from "layouts/container/Inline";
import Flex from "layouts/flex/Flex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useState } from "react";
import MockItem from "routes/front/main/MockItem";
import { rpad2D } from "shared/utils/Utils";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./WeeklyBestSeller.module.css";

function WeeklyBestSeller(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const [products, setProducts] = useState();
    const [medusaProducts, setMedusaProducts] = useState();
    const [slides, setSlides] = useState();
    const [medusaSlides, setMedusaSlides] = useState();

    useEffect(() => {
        requester.findWeeklyBestSeller((result) => {
            let slideList = rpad2D(result.data, isMobile ? 2 : 4, null);
            setSlides(slideList);
            setProducts(result.data);
        });
    }, [isMobile]);

    useEffect(() => {
        requester.findWeeklyBestSeller((result) => {
            let slideList = rpad2D(result.data, isMobile ? 2 : 4, null);
            setSlides(slideList);
            setProducts(result.data);
        });
    }, []);

    useEffect(() => {
        let data = "";
        medusaRequester.getBestSellerProducts(data, (result) => {
            let slideList = rpad2D(result.products, isMobile ? 2 : 4, null);
            setMedusaSlides(slideList);
            setMedusaProducts(result.products)
        })
    }, [])

    return (
        <div className={isMobile ? style.mobileSwiperWrap : style.swiperWrap}>
            <Flex flexStart={isMobile ? true : null} direction={isMobile ? "vertical" : null} gap={10}>
                <FlexChild>
                    <VerticalFlex gap={10}>
                        <FlexChild>
                            <VerticalFlex flexStart>
                                <FlexChild>
                                    <P weight={"bold"} size={isMobile ? 16 : 24}>이번주 가장</P>
                                </FlexChild>
                                <FlexChild>
                                    <Inline>
                                        <P weight={"bold"} size={isMobile ? 16 : 24} color={"var(--main-color)"}>많이 판매된</P>
                                        <P weight={"bold"} size={isMobile ? 16 : 24}> 액상</P>
                                    </Inline>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        {
                            !isMobile &&
                            <FlexChild>
                                <VerticalFlex gap={10}>
                                    {
                                        medusaProducts &&
                                        medusaProducts.map((product, index) => {
                                            return (
                                                <FlexChild key={index}>
                                                    <HorizontalFlex gap={10} >
                                                        <FlexChild width={"max-content"}>
                                                            <div className={style.indexCircle}>
                                                                {index + 1}
                                                            </div>
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <P weight={"bold"}>{product.title}</P>
                                                        </FlexChild>
                                                    </HorizontalFlex>
                                                </FlexChild>
                                            );
                                        })
                                    }
                                </VerticalFlex>
                            </FlexChild>
                        }
                    </VerticalFlex>
                </FlexChild>
                <FlexChild width={!isMobile && "72%"} >
                    <Swiper navigation modules={[Navigation]}>
                        {
                            medusaSlides && medusaSlides.map((slide, slideIndex) =>
                                <SwiperSlide key={slideIndex}>
                                    <HorizontalFlex gap={10}>
                                        {
                                            slide.map((product, productIndex) =>
                                                <FlexChild key={productIndex} padding={isMobile ? "10px 10px" : "10px 0px"}>
                                                    {
                                                        product.id &&
                                                        <ProductCard template={"normal"} data={product} rank={slideIndex * slide.length + productIndex + 1} />
                                                    }
                                                </FlexChild>
                                            )
                                        }
                                    </HorizontalFlex >
                                </SwiperSlide>
                            )
                        }
                    </Swiper>

                </FlexChild>
            </Flex>
        </div>
    );

}

export default WeeklyBestSeller