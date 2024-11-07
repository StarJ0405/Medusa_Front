import style from "./CategoryLayout.module.css"
import { getUniqColumns, getSpreadArray, normalizeArrayHeight, getGroupedList, getMultipleGroupedList, rpad, clone, deepFind } from "shared/utils/Utils";
import RecommendProductCard from "routes/cart/cartLeft/RecommendProductCard";
import FlexChild from "layouts/flex/FlexChild";
import { useContext, useEffect } from "react";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import VerticalFlex from "layouts/flex/VerticalFlex";
import _ from "lodash";

import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "components/card/category/CategoryCard";
import Container from "layouts/container/Container";

function CategoryLayout() {
    const { isMobile } = useContext(BrowserDetectContext);
    const [categories, setCategories] = useState();
    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const { categoryId } = useParams();
    const [swiper, setSwiper] = useState();
    const [slides, setSlides] = useState();
    const [activeIndex, setActiveIndex] = useState();
    const [initialSlide, setInitialSlide] = useState();

    useEffect(() => {
        requester.getAllCategories(result => {
            setCategories(result.data);
        })
    }, []);

    const onActiveIndexChange = (e) => {
        setActiveIndex(e.activeIndex);
    }

    useEffect(() => {
        let selectedIndex = _.findIndex(categories, { id: selectedCategoryId });
        setSlides(categories);

        if (selectedIndex >= 0) {
            setInitialSlide(selectedIndex);
        }
    }, [categories]);

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

    useEffect(() => {
        setSelectedCategoryId(categoryId);
    }, [categoryId]);

    return (
        <Container maxWidth={1200}>
            <VerticalFlex gap={10}>
                <FlexChild>
                    <div className={style.swiperWrap}>
                        {slides ?
                            initialSlide >= 0 &&
                            <Swiper
                                onSwiper={setSwiper}
                                slidesPerView={isMobile ? 5 : 6}
                                spaceBetween={0}
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
                                slidesPerView={isMobile ? 5 : 6}
                                spaceBetween={0}
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
                    </div>
                </FlexChild>
                <FlexChild>
                    <Outlet />
                </FlexChild>
            </VerticalFlex>
        </Container>
    );
}

export default CategoryLayout;