import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import style from "./ProductSwiper.module.css";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import ProductCard from "components/card/product/ProductCard";
import { items } from "InitialData/Items";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { rpad2D } from "shared/utils/Utils";

function ProductSwiper(props) {
    const cols = props.cols;
    const [slides, setSlides] = useState();
    useEffect(() => {
        let initialData = { id: null, image: null, currentAmount: null, beforeAmount: null };
        let slidesRpad = rpad2D(props.products, cols, initialData);
        setSlides(slidesRpad);
    }, []);

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={props.autoPlay ? {
                delay: props.autoPlay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            } : false}
            
            navigation={props.navigation ? props.navigation : false}
            modules={[Autoplay, Navigation]}
            className={"itemSwiper"}
        >
            {
                slides ?
                    slides.map((slide, index) =>
                        <SwiperSlide key={index}>
                            <div className={style.wrap}>
                                <HorizontalFlex gap={props.gap}>
                                    {
                                        slide ?
                                            slide.map((column, index) =>
                                                <FlexChild key={index}>
                                                    {
                                                        column.id ?
                                                            <ProductCard data={column} template={props.innerTemplate} />
                                                            : null
                                                    }


                                                </FlexChild>
                                            )
                                            : null
                                    }
                                </HorizontalFlex>
                            </div>
                        </SwiperSlide>
                    )
                    : null
            }
        </Swiper>
    );
}

export default ProductSwiper;