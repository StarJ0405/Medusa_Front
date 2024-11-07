import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dummy from "components/Dummy";
import { AuthContext } from "providers/AuthProvider";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation, Pagination } from "swiper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper } from "swiper/react";

function ProgressbarSwiper(props) {
    const { isMobile } = useContext(BrowserDetectContext);
    const { userName } = useContext(AuthContext);
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(1);
    const [totalSlides, setTotalSlides] = useState(props.totalSlides);
    const [currentMobileIndex, setCurrentMobileIndex] = useState(1);
    const [totalMobileSlides, setTotalMobileSlides] = useState(props.totalSlides);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        if (isMobile) {
            const mobileSwiperInstance = document.querySelector('.mySwiperMobile').swiper;
  
            if (mobileSwiperInstance) {
                setTotalMobileSlides(mobileSwiperInstance.slides.length);
                setCurrentMobileIndex(mobileSwiperInstance.activeIndex);
                mobileSwiperInstance.on('slideChange', () => {
                    setCurrentMobileIndex(mobileSwiperInstance.activeIndex); // 슬라이드 변경 시 인덱스 업데이트
                });
            }

        } else {
            const swiperInstance = document.querySelector('.mySwiper').swiper;

            if (swiperInstance) {
                setTotalSlides(swiperInstance.slides.length);
                setCurrentIndex(swiperInstance.activeIndex); // 초기 인덱스 설정
                swiperInstance.on('slideChange', () => {
                    setCurrentIndex(swiperInstance.activeIndex); // 슬라이드 변경 시 인덱스 업데이트
                });
            }
        }
    }, [props.totalSlides])


    return (
        <>
            <Dummy height={25} />
            {
                isMobile
                    ?
                    <>

                        <Swiper
                            modules={[Pagination, Navigation]}
                            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                            spaceBetween={20}
                            pagination={{ type: 'progressbar' }}
                            onInit={(swiper) => {
                                // Swiper instance needs to know about our custom navigation elements
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                            className="mySwiperMobile"
                            onSlideChange={(swiper) => { setCurrentMobileIndex(swiper.activeIndex); /* 현재 인덱스를 저장합니다. */ }}
                        >
                            {props.children}

                        </Swiper>
                        <div className="swiper-navigation-container-mobile">
                            <div
                                style={{ cursor: "pointer" }}
                                className={`swiper-custom-button-prev-mobile ${currentMobileIndex === 0 ? 'disabled' : ''}`}
                                onClick={() => {
                                    // Swiper 인스턴스에 접근하여 이전 슬라이드로 이동합니다.
                                    document.querySelector('.mySwiperMobile').swiper.slidePrev();
                                }}
                            >
                                <FontAwesomeIcon fontSize={13} icon={faArrowLeft} color={currentMobileIndex === 0 ? "#999" : "black"} size="lg" />
                            </div>
                            <div className="swiper-pagination-custom-mobile">
                                {currentMobileIndex + 1} / {totalMobileSlides}
                            </div>
                            <div
                                style={{ cursor: "pointer", textAlign: "right" }}
                                className={`swiper-custom-button-next-mobile ${currentMobileIndex === totalMobileSlides - 1 ? 'disabled' : ''}`}
                                onClick={() => {
                                    // Swiper 인스턴스에 접근하여 다음 슬라이드로 이동합니다.
                                    document.querySelector('.mySwiperMobile').swiper.slideNext();
                                }}
                            >
                                <FontAwesomeIcon fontSize={13} icon={faArrowRight} color={currentMobileIndex === totalMobileSlides - 1 ? "#999" : "black"} size="lg" />
                            </div>
                        </div>
                    </>

                    :
                    <div style={{ position: "relative" }}>
                        <Swiper
                            modules={[Pagination, Navigation]}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            pagination={{
                                type: 'progressbar',
                            }}
                            onInit={(swiper) => {
                                // Swiper instance needs to know about our custom navigation elements
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                            className="mySwiper"
                            onSlideChange={(swiper) => {
                                setCurrentIndex(swiper.activeIndex); // 현재 인덱스를 저장합니다.
                            }}
                        >
                            {props.children}

                        </Swiper>
                        <div className="swiper-navigation-container">
                            <div
                                style={{ cursor: "pointer" }}
                                className={`swiper-custom-button-prev ${currentIndex === 0 ? 'disabled' : ''}`}
                                onClick={() => {
                                    // Swiper 인스턴스에 접근하여 이전 슬라이드로 이동합니다.
                                    document.querySelector('.mySwiper').swiper.slidePrev();
                                }}
                            >
                                <FontAwesomeIcon fontSize={13} icon={faArrowLeft} color={currentIndex === 0 ? "#999" : "black"} size="lg" />
                            </div>
                            <div className="swiper-pagination-custom">
                                {currentIndex + 1} / {totalSlides}
                            </div>
                            <div
                                style={{ cursor: "pointer", textAlign: "right" }}
                                className={`swiper-custom-button-next ${currentIndex === totalSlides - 1 ? 'disabled' : ''}`}
                                onClick={() => {
                                    // Swiper 인스턴스에 접근하여 다음 슬라이드로 이동합니다.
                                    document.querySelector('.mySwiper').swiper.slideNext();
                                }}
                            >
                                <FontAwesomeIcon fontSize={13} icon={faArrowRight} color={currentIndex === totalSlides - 1 ? "#999" : "black"} size="lg" />
                            </div>
                        </div>
                    </div>
            }
        </>
    );



}

export default ProgressbarSwiper;