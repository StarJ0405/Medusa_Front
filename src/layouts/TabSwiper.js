import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

function TabSwiper(props) {
    return (
        <>
            <Swiper
                slidesPerView={1}
                direction="vertical"
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><div style={{height:"300px"}}></div>Slide 1</SwiperSlide>
                <SwiperSlide><div style={{height:"300px"}}></div>Slide 2</SwiperSlide>
                <SwiperSlide><div style={{height:"300px"}}></div>Slide 3</SwiperSlide>
                <SwiperSlide><div style={{height:"300px"}}></div>Slide 4</SwiperSlide>

            </Swiper>
        </>
    );
}

export default TabSwiper;