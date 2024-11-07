import { useEffect, useRef, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalBase from "modals/base/ModalBase";
import TabView from "layouts/view/TabView";
import style from "./PaymentModal.module.css";
import { useTranslation } from "react-i18next";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/effect-fade';
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import PaymentInfo from "./PaymentInfo";
import clsx from "classnames";




const PaymentModal = NiceModal.create(
    (props, ref) => {
        const modal = useRef();
        const asd = useModal(PaymentModal);
        const { t } = useTranslation();
        const [withHeader, withFooter] = [true, false];
        const [width, height] = ["auto", "auto"];
        const withCloseButton = true;
        const clickOutsideToClose = false;
        const title = "결제 방법";
        const buttonText = "close";
        const swiperRef = useRef(null);
        const swiper = useSwiper();



        const goNext = () => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slideNext();
            }
        }

        const goPrev = () => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slidePrev();
            }
        }


        return (
            <ModalBase ref={modal} width={width} height={height} withHeader={withHeader} withFooter={withFooter} withCloseButton={withCloseButton} clickOutsideToClose={clickOutsideToClose} title={title} buttonText={buttonText}>
                <Swiper
                    modules={[EffectFade]}
                    effect="fade"
                    ref={swiperRef}
                    allowTouchMove={false}
                >
                    <VerticalFlex>
                        <SwiperSlide>
                            <FlexChild>
                                <div className={style.newCardWrap} onClick={goNext}>
                                    <p className={style.newCard}><input type="radio" /> <FontAwesomeIcon icon={faCreditCard} /> 새로운 카드 추가</p>
                                </div>
                                <div className={style.content}>
                                    <p>100% 안전한 결제 서비스 제공</p>
                                </div>
                            </FlexChild>
                        </SwiperSlide>
                        <SwiperSlide>
                            <FlexChild>
                                <PaymentInfo goPrev={goPrev} />
                            </FlexChild>
                        </SwiperSlide>
                    </VerticalFlex>
                </Swiper>
            </ModalBase>
        );
    }
);

export default PaymentModal;
