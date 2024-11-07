import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useContext, useEffect, useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./BrandLayout.module.scss";
import seriesBanner from "resources/img/urlBanner/series.png";
import UrlBanner from "components/UrlBanner";
import BrandCard from "routes/mobile/category/brand/BrandCard";
import PaddingWrapper from "layouts/wrapper/PaddingWrapper";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import Dummy from "components/Dummy";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { getCurrentLanguageCode } from "shared/utils/Utils";
import logo1 from "resources/img/brand/logo/show.jpg";
import logo2 from "resources/img/brand/logo/mov.jpg";
import logo3 from "resources/img/brand/logo/naple.jpg";
import logo4 from "resources/img/brand/logo/mekgosipo.jpg";
import logo5 from "resources/img/brand/logo/toktok.jpg";
import character from "resources/img/brand/character.png";
import { Outlet, useParams } from "react-router-dom";
import _ from "lodash";

function BrandsLayout() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const [brands, setBrands] = useState();
    const [swiper, setSwiper] = useState();
    const [activeIndex, setActiveIndex] = useState();
    const [selectedBrandId, setSelectedBrandId] = useState();
    const { brandId } = useParams();
    const [initialSlide, setInitialSlide] = useState();

    useAltEffect(() => {
        requester.findAllBrandsOnlyTitle((result) => {
            setBrands(result.data);
        })
    }, [])

    const handleSlideChange = (swiper) => {
        const realIndex = swiper.realIndex;
        const currentData = brands[realIndex];

    };

    const onActiveIndexChange = (e) => {
        setActiveIndex(e.activeIndex);
    }

    useEffect(() => {
        let selectedIndex = _.findIndex(brands, { id: selectedBrandId });

        if (selectedIndex >= 0) {
            setInitialSlide(selectedIndex);
        } else {
            setInitialSlide(0);
        }
    }, [brands]);

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
        setSelectedBrandId(brandId);
    }, [brandId]);

    return (
        <VerticalFlex gap={isMobile?10:50} backgroundColor={"white"}>
            {
                isMobile ?
                    <FlexChild padding={"20px 10px 0px 10px"}>
                        <Container maxWidth={1200}>
                            <div className={style.section}>
                                <div className={style.sectionWrap}>
                                    <div className={style.brandArea}>
                                        <Swiper
                                            onSwiper={(swiper) => setSwiper(swiper)}
                                            onSlideChange={handleSlideChange}
                                            onActiveIndexChange={onActiveIndexChange}
                                            effect={"coverflow"}
                                            grabCursor={true}
                                            centeredSlides={true}
                                            initialSlide={initialSlide}
                                            slidesPerView={4}
                                            coverflowEffect={{
                                                rotate: 30,
                                                stretch: 20,
                                                depth: 100,
                                                modifier: 0.6,
                                                slideShadows: false,
                                                scale: 0.8
                                            }}
                                            modules={[EffectCoverflow, Pagination]}
                                        >
                                            {
                                                brands &&
                                                brands.map((brand, index) =>
                                                    <SwiperSlide key={index}>
                                                        <BrandCard data={brand} active={index === activeIndex} setActiveIndex={setActiveIndex} index={index} />
                                                    </SwiperSlide>
                                                )
                                            }
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </FlexChild>
                    :
                    <FlexChild>
                        <div className={style.topSection}>
                            <div style={{ backgroundColor: "#e7e7e7", position: "absolute", height: "88%" }} />
                            <Container maxWidth={1100} padding={"4% 4% 0 4%"}>
                                <VerticalFlex>
                                    {/* <FlexChild>
                                        <HorizontalFlex justifyContent={"center"} gap={20}>
                                            {
                                                categories && categories.map((category) =>
                                                    <FlexChild width={"initial"}>
                                                        <div className={style.categorySelect}>
                                                            <P>{category.title}</P>
                                                        </div>
                                                    </FlexChild>)
                                            }
                                        </HorizontalFlex>
                                    </FlexChild> */}
                                    {/* <FlexChild>
                                        <div style={{ border: "5px solid white", position: "relative", height: "350px" }}>
                                            <VerticalFlex gap={20}>
                                                <FlexChild>
                                                    <div className={style.labels} >
                                                        <img src={logo1} width={"17%"} />
                                                        <img src={logo2} width={"17%"} />
                                                        <img src={logo3} width={"17%"} />
                                                        <img src={logo4} width={"17%"} />
                                                        <img src={logo5} width={"17%"} />
                                                    </div>
                                                </FlexChild>
                                                <FlexChild>
                                                    <P size={"32pt"}>브랜드별</P>
                                                    <P size={"24pt"}>내가 원하는 브랜드 액상별로!</P>
                                                </FlexChild>
                                            </VerticalFlex>
                                            <img style={{ position: "absolute", right: "-5%", bottom: 0 }} src={character} width={"15%"} />
                                        </div>
                                    </FlexChild> */}
                                    <FlexChild padding={"40px 40px 0 40px"}>
                                        <Container maxWidth={1200}>
                                            <div className={style.section}>
                                                <div className={style.sectionWrap}>
                                                    <div className={style.brandArea}>
                                                        <Swiper
                                                            onSwiper={(swiper) => setSwiper(swiper)}
                                                            onSlideChange={handleSlideChange}
                                                            onActiveIndexChange={onActiveIndexChange}
                                                            effect={"coverflow"}
                                                            grabCursor={true}
                                                            centeredSlides={true}
                                                            slidesPerView={4}
                                                            initialSlide={initialSlide}
                                                            coverflowEffect={{
                                                                rotate: 30,
                                                                stretch: 80,
                                                                depth: -30,
                                                                modifier: 0.6,
                                                                slideShadows: false,
                                                                scale: 0.8
                                                            }}
                                                            modules={[EffectCoverflow, Pagination]}
                                                        >
                                                            {
                                                                brands &&
                                                                brands.map((brand, index) =>
                                                                    <SwiperSlide key={index}>
                                                                        <BrandCard data={brand} active={index === activeIndex} setActiveIndex={setActiveIndex} index={index} />
                                                                        {/* <BrandCard data={brand} /> */}
                                                                    </SwiperSlide>
                                                                )
                                                            }
                                                        </Swiper>
                                                    </div>
                                                </div>
                                            </div>
                                        </Container>
                                    </FlexChild>
                                </VerticalFlex>
                            </Container>

                        </div>
                    </FlexChild>
            }

            <FlexChild>
                <Container maxWidth={1200}>
                    <Outlet />
                    {/* <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "20px"

                    }}>
                        {
                            list &&
                            list.map((row, index) => (
                                <Card img={row.image} brand={row.brandTitle} productName={row.title} />
                            ))
                        }
                    </div> */}
                </Container>
            </FlexChild>
        </VerticalFlex>

    );
}

export default BrandsLayout;