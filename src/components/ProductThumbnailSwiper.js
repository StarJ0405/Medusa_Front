import { useEffect, useRef, useState } from "react";
import { ProductThumbnailType } from "shared/constants/constants";
import { decode } from "shared/utils/Utils";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import style from "./ProductThumbnailSwiper.module.css";

function ProductThumbnailSwiper(props) {
    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        setThumbnails(props.data);
    }, [props.data]);

    const Thumbnail = ({ data }) => {
        const { type, content } = data;

        return (
            <div className={style.thumbnail}>
                {
                    {
                        IMAGE: <img className={style.thumbnailImage} src={data.content} />,
                        VIDEO: <div className={style.thumbnailVideo} dangerouslySetInnerHTML={{ __html: decode(content) }} />
                    }[type]
                }
            </div>
        );
    }

    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Navigation, Pagination]}
            className={"productThumbnailSwiper"}
        >
            {
                thumbnails && thumbnails.map((thumbnail, index) =>
                    <SwiperSlide key={index}>
                        <Thumbnail data={thumbnail} />
                    </SwiperSlide>
                )
            }
        </Swiper>
    );
}

export default ProductThumbnailSwiper;