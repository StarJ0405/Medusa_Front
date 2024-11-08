import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, EffectFade, EffectCreative } from "swiper";
import style from "./NewProductSwiper.module.css";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import ProductCard from "components/card/product/ProductCard";
import { items } from "InitialData/Items";
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from "react";
import { rpad2D } from "shared/utils/Utils";
import { requester, medusaRequester } from "App";
import Container from "layouts/container/Container";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import 'swiper/css/effect-creative';
import 'swiper/css/effect-fade';

function NewProductSwiper(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const [brands, setBrands] = useState();
    const [medusaNewProducts, setMedusaNewProducts] = useState();
    const [newProducts, setNewProducts] = useState();

    const groupByBrandId = (products) => {
        return Object.values(products.reduce((grouped, product) => {
            const { brandId } = product;
            if (!grouped[brandId]) {
                grouped[brandId] = { brand: product.brand, products: [] };
            }
            grouped[brandId].products.push(product);
            return grouped;
        }, {}));
    };

    useEffect(() => {
        if (medusaNewProducts) {
            setNewProducts(medusaNewProducts[0].rule.conditions[0].products)
        }
    }, [medusaNewProducts])

    useEffect(() => {
        requester.getNewProducts((result) => {
            setBrands(groupByBrandId(result.data));
        });
    }, []);

    useEffect(() => {
        let data = "NEW";
        medusaRequester.getDiscountsProducts(data, (result) => {
            setMedusaNewProducts(result.products)
            // console.log("medusa 통신 New Products Result : ", result)
        })
    }, [])

    return (
        <Container>
            <div>
                <Swiper autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                    // effect={"fade"}
                    navigation modules={[Navigation, Autoplay, EffectCreative, EffectFade]}>
                    {
                        newProducts && newProducts.map((slide, index) =>
                            <SwiperSlide key={index}>
                                <div style={{ backgroundColor: "white" }}>
                                    {
                                        isMobile ?
                                            <div style={{ position: "relative" }}>
                                                <img src={slide.thumbnail} style={{ width: "100%", position: "absolute" }} />
                                                <img src={slide.thumbnail} style={{ width: "100%", zIndex: -1 }} />
                                                <div style={{ position: "absolute", bottom: "5%", left: "50%", transform: "translateX(-50%)" }}>
                                                    <Swiper autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }} slidesPerView={4} pagination modules={[Pagination, Autoplay]}>
                                                        {
                                                            slide.variants && slide.variants.map((product, index) =>
                                                                <SwiperSlide key={index}>
                                                                    <ProductCard data={product} template={"simple"} />
                                                                </SwiperSlide>
                                                            )
                                                        }
                                                    </Swiper>
                                                </div>
                                            </div>
                                            :
                                            <HorizontalFlex gap={30}>
                                                <FlexChild width={"70%"}>
                                                    <VerticalFlex gap={10}>
                                                        <FlexChild>
                                                            <div className={style.header}>
                                                                {slide.title}
                                                            </div>
                                                        </FlexChild>
                                                        <FlexChild>
                                                            <Swiper autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }} slidesPerView={4} spaceBetween={30} modules={[Autoplay]}>
                                                                {
                                                                    slide.variants && slide.variants.map((product, index) =>
                                                                        <SwiperSlide key={index}>
                                                                            <ProductCard data={product} template={"normal"} />
                                                                        </SwiperSlide>
                                                                    )
                                                                }
                                                            </Swiper>
                                                        </FlexChild>
                                                    </VerticalFlex>
                                                </FlexChild>
                                                <FlexChild>
                                                    <div>
                                                        <img src={slide.thumbnail} style={{ width: "100%" }} />
                                                    </div>
                                                </FlexChild>
                                            </HorizontalFlex>
                                    }
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </Container>
    );
}

export default NewProductSwiper;