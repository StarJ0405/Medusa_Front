import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import style from "./BannerSwiper.module.css";
import slide1 from "resources/img/main/banner/mainBanner_7.png";
// import slide1 from "resources/img/main/banner/mainBanner_1.png";
// import slide2 from "resources/img/main/banner/mainBanner_2.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BannerSwiper(props) {
    const { slides } = props;
    const navigate = useNavigate();

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className={"bannerSwiper"}
        >
            {
                slides.map((slide, index) =>
                    <SwiperSlide key={index}>
                        <div className={style.wrap} onClick={() => navigate(slide.to)}>
                            <img className={style.sildeImg} src={slide.image} alt={""} />
                        </div>
                    </SwiperSlide>
                )
            }

            {/* <SwiperSlide>
                <div className={style.wrap}>
                    <img className={style.sildeImg} src={slide2} alt={""} />
                </div>
            </SwiperSlide> */}
        </Swiper>
    );
}

export default BannerSwiper;