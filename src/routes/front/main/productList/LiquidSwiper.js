import style from "./LiquidSwiper.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { items } from "InitialData/Items";
import FlexChild from "layouts/flex/FlexChild";
import RecommendProductCard from "routes/cart/cartLeft/RecommendProductCard";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { requester } from "App";
import ProductSwiper from "components/ProductSwiper";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import ProductCard from "components/card/product/ProductCard";
import { rpad2D } from "shared/utils/Utils";
import PropTypes from 'prop-types';
import CategoryCard from "components/card/category/CategoryCard";
import SwiperCore from 'swiper';
import _ from "lodash";
import { useParams } from "react-router-dom";
import { BrowserDetectContext } from "providers/BrowserEventProvider";

function LiquidSwiper(props) {
    const [swiper, setSwiper] = useState();
    const [slides, setSlides] = useState();
    const [activeIndex, setActiveIndex] = useState();
    const [initialSlide, setInitialSlide] = useState();
    const { isMobile } = useContext(BrowserDetectContext);

    useEffect(() => {
        let selectedIndex = _.findIndex(props.data, { id: props.selectedCategoryId });
        setSlides(props.data);

        if (selectedIndex >= 0) {
            setInitialSlide(selectedIndex);
        }
    }, [props.data]);

    const onActiveIndexChange = (e) => {
        setActiveIndex(e.activeIndex);
    }

    useEffect(() => {
        if (swiper) {
            swiper.slideTo(activeIndex);
        }

    }, [activeIndex]);

    useEffect(() => {
        if (initialSlide >= 0) {
            setActiveIndex(initialSlide);
        }
    }, [initialSlide]);

    return (
        <>
            {slides ?
                initialSlide >= 0 &&
                <Swiper
                    onSwiper={setSwiper}
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    className={"liquidSwiper"}
                    onActiveIndexChange={onActiveIndexChange}
                    initialSlide={initialSlide}
                >
                    {
                        slides && slides.map((slide, index) =>
                            <SwiperSlide key={index}>
                                <CategoryCard data={slide} active={index === activeIndex} setActiveIndex={setActiveIndex} index={index} />
                            </SwiperSlide>
                        )
                    }
                </Swiper>
                : <Swiper
                    onSwiper={setSwiper}
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    className={"liquidSkeletonSwiper"}
                >
                    <SwiperSlide >
                        <CategoryCard skeleton />
                    </SwiperSlide>
                    <SwiperSlide >
                        <CategoryCard skeleton />
                    </SwiperSlide>
                    <SwiperSlide >
                        <CategoryCard skeleton />
                    </SwiperSlide>
                    <SwiperSlide >
                        <CategoryCard skeleton />
                    </SwiperSlide>
                    <SwiperSlide >
                        <CategoryCard skeleton />
                    </SwiperSlide>
                </Swiper>
            }
        </>

    );
}

export default LiquidSwiper;