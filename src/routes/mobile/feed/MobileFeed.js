import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import MobileFeedView from "./MobileFeedView";
import style from "./MobileFeed.module.scss"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";



function MobileFeed() {
    const data = [
        {
            content: "영감"
        },
        {
            content: "팔로잉"
        },
        {
            content: "라이브"
        }

    ]

    const selectData = [
        {
            id: 1,
            select1: "모든기간",
            select2: "지난 6개월",
            select3: "지난 1년",
            select4: "지난 2년",
        },
    ];

    const params = {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: (index, className) => {
                let bullet = ["영감", "팔로잉", "라이브"];
                return '<nav class="' + className + '">' + (bullet[index]) + '</nav>';
            }
        }
    }

    return (
        <>
            <FlexChild>
                <div className={style.headerArea}>
                    <p className={style.title}>피드</p>
                    <FlexChild>
                        <div className={style.searchBarArea}>
                            <div className={style.searchBar}>
                                <HorizontalFlex>
                                    <FlexChild>
                                        <div className={style.searchTextArea}>
                                            <input className={style.searchTextInput} type="text" placeholder={"검색검색"} />
                                        </div>
                                    </FlexChild>
                                    <FlexChild width={50} >
                                        <div className={style.searchButtonArea}>
                                            <FontAwesomeIcon icon={fas["faSearch"]} color={"var(--main-color)"} />
                                        </div>
                                    </FlexChild>
                                </HorizontalFlex>
                            </div>
                        </div>
                    </FlexChild>
                </div>
            </FlexChild>
            <FlexChild height={500}>
                <VerticalFlex>
                    <FlexChild>
                        <div className={style.container}>
                            <div className={style.swiperWrap}>
                                <div className={"swiper-pagination"}
                                    style={{
                                        marginLeft: "-10px",
                                        position: "fixed",
                                        marginTop: "170px",
                                        backgroundColor: "white",
                                        height: "50px",
                                    }}></div>
                            </div>
                        </div>
                    </FlexChild>
                    <FlexChild height={"max-content"}>
                        <Swiper
                            spaceBetween={30}
                            modules={[Pagination]}
                            {...params}
                        >
                            {data ?
                                data.map((data, index) => (
                                    <SwiperSlide>
                                        <MobileFeedView data={data} key={index} />
                                    </SwiperSlide>
                                ))
                                : null}
                        </Swiper>
                    </FlexChild>
                </VerticalFlex>
            </FlexChild>
        </>
    );
}

export default MobileFeed;