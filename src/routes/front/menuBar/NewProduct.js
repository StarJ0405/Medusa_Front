import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import P from "components/P";
import Container from "layouts/container/Container";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useContext, useEffect, useState } from "react";
import useAltEffect from "shared/hooks/useAltEffect";
import style from "./NewProduct.module.css";

import BrandCard from "routes/mobile/category/brand/BrandCard";

import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper";
import Dummy from "components/Dummy";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { getCurrentLanguageCode } from "shared/utils/Utils";
import backgroundImg from "resources/img/series/background.png";
import Center from "layouts/wrapper/Center";
import { useNavigate } from "react-router-dom";


function NewProduct() {
    const { isMobile } = useContext(BrowserDetectContext);
    const { t } = useTranslation();
    const [brands, setBrands] = useState();
    const [swiper, setSwiper] = useState();
    const [currentSlideData, setCurrentSlideData] = useState([]);
    const [list, setList] = useState([]);
    const navigate = useNavigate();

    useAltEffect(() => {
        requester.getAllBrands((result) => {
            setBrands(result.data);
        })
    }, [])
    useEffect(() => {
        if (brands) {
            setList(brands[0].children);
        }
    }, [brands])
    useEffect(() => {
        setList(currentSlideData.children);
    }, [currentSlideData])

    useEffect(() => {
        console.log(list);
    }, [list])

    const handleSlideChange = (swiper) => {
        const realIndex = swiper.realIndex;
        const currentData = brands[realIndex];
        setCurrentSlideData(currentData);
    };

    const Card = (props) => {
        const { img, brand, productName } = props;
        const onClick = () => {
            navigate(`/product/detail/${props.id}`);
        }
        return (
            <div onClick={onClick} style={{ display: "flex", flex: "0 1 27%" }}>
                <VerticalFlex flexStart>
                    <FlexChild>
                        <img src={img && img} width={"100%"} style={{ cursor: "pointer", borderRadius: "20px" }} />
                    </FlexChild>
                    <FlexChild>
                        <P cursor weight={"bold"} size={"min(18pt, 2.2vw)"}>{brand && brand}</P>
                        <P cursor size={"min(18pt, 1.7vw)"}>{productName && productName}</P>
                    </FlexChild>
                </VerticalFlex>
            </div>
        );
    }

    return (
        <VerticalFlex gap={isMobile?30:200}>
            <FlexChild>
                <div className={style.topSection}>
                    <FlexChild>
                        <div style={{ backgroundImage: `url(${backgroundImg})`, position: "absolute", height: "70%", backgroundSize: "cover" }} />
                        <Container maxWidth={1200} padding={"4% 4% 0 4%"}>
                            <VerticalFlex>
                                <FlexChild >
                                    <P color={"white"} size={"42pt"}>New Fever</P>
                                    <P color={"white"}>새로운 액상 출시</P>
                                </FlexChild>
                                <FlexChild padding={"40px 40px 0 40px"}>
                                    <Container maxWidth={1200}>
                                        <div className={style.section}>
                                            <div className={style.sectionWrap}>
                                                <div className={style.brandArea}>
                                                    <Swiper
                                                        onSwiper={(swiper) => setSwiper(swiper)}
                                                        onSlideChange={handleSlideChange}
                                                        className="newSwiper"
                                                        grabCursor={true}
                                                        centeredSlides={true}
                                                        slidesPerView={1}
                                                        modules={[Pagination, Navigation]}
                                                        navigation={true}
                                                    >
                                                        {
                                                            brands &&
                                                            brands.map((brand, index) =>
                                                                <SwiperSlide key={index}>
                                                                    <div className={style.card}>
                                                                        <VerticalFlex gap={5} width={"initial"}>
                                                                            <FlexChild>
                                                                                <img className={style.image} src={brand.icon} alt={""} />
                                                                            </FlexChild>
                                                                        </VerticalFlex>
                                                                    </div>
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
                    </FlexChild>
                </div>
            </FlexChild>
            <FlexChild>
                <Container maxWidth={1200}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "20px"
                    }}>
                        {
                            list &&
                            list.map((row, index) => (
                                <Card img={row.image} brand={row.brandTitle} productName={row.title} id={row.id} />
                            ))
                        }
                    </div>
                </Container>
            </FlexChild>
        </VerticalFlex>
    );
}

export default NewProduct;