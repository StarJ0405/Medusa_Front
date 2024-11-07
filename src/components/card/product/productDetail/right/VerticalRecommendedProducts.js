import style from "./VerticalRecommendedProducts.module.css"
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

function VerticalRecommendedProducts(props) {
    const { product } = props;


    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <Swiper
                        direction={"vertical"}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                    >

                        {product ?
                            <>
                                <SwiperSlide>
                                    <FlexChild>
                                        <img src={product.image} />
                                        <p className={style.price}>{product.price}</p>
                                    </FlexChild>
                                    <FlexChild>
                                        <img src={product.image} />
                                        <p className={style.price}>{product.price}</p>
                                    </FlexChild>
                                    <FlexChild>
                                        <img src={product.image} />
                                        <p className={style.price}>{product.price}</p>
                                    </FlexChild>
                                </SwiperSlide>
                                
                                
                            </>
                            : null}

                    </Swiper>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default VerticalRecommendedProducts;