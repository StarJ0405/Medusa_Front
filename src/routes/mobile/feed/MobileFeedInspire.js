import style from "./MobileFeedInspire.module.css"

import mok1 from "resources/img/mokImg/mokImg1.jpg";
import mok2 from "resources/img/mokImg/mokImg2.jpg";
import mok3 from "resources/img/mokImg/mokImg3.jpg";
import mok4 from "resources/img/mokImg/mokImg4.jpg";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";

function MobileFeedInspire() {
    const rowData = [
        {
            id: 1,
            title: "엔젤 케이스 키보드 무선 마우스",
            company: "World International",
            nation: "한국",
            image: mok1,
        },
        {
            id: 2,
            title: "잘 사용합니다 생각보다 좋습니다",
            company: "World",
            nation: "중국",
            image: mok2,
        },
        {
            id: 3,
            title: "미니 휴대용 전기 재봉틀 야간 조용 가정용 스트레이트",
            company: "International",
            nation: "일본",
            image: mok3,
        },
        {
            id: 4,
            title: "배송 정말 빠르네요",
            company: "World International",
            nation: "프랑스",
            image: mok4,
            subImg1: mok1,
            subImg2: mok2,
        },
        {
            id: 5,
            title: "알루미늄 합금 매직 트랙 패드 키보드 케이스",
            company: "World",
            nation: "한국",
            image: mok1,
        },
        {
            id: 6,
            title: "새로운 도착 팬 샤워 머리",
            company: "International",
            nation: "중국",
            image: mok2,
        },
        {
            id: 7,
            title: "가격대비 품질의 퀄리티가 너무 좋은 제품입니다.",
            company: "World International",
            nation: "일본",
            image: mok3,
        },

    ]

    return (
        <>
            <VerticalFlex height={"intial"} flexStart={true} >

                {rowData ? rowData.map(() => (
                    <FlexChild>
                        <HorizontalFlex>
                            <FlexChild>1</FlexChild>
                            <FlexChild>2</FlexChild>
                        </HorizontalFlex>
                    </FlexChild>
                )) : null}

            </VerticalFlex>
        </>
    );
}

export default MobileFeedInspire;