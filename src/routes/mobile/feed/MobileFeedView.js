import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./MobileFeedView.module.css"

import ChoiceCompanyRow from "routes/chat/ChoiceCompanyRow";
import { Link } from "react-router-dom";
import MobileFeedViewRow from "./MobileFeedViewRow";

import mok1 from "resources/img/mokImg/mokImg1.jpg";
import mok2 from "resources/img/mokImg/mokImg2.jpg";
import mok3 from "resources/img/mokImg/mokImg3.jpg";
import mok4 from "resources/img/mokImg/mokImg4.jpg";

function MobileFeedView(props) {
    const { data } = props;

    const rowData = [
        {
            id: 1,
            title: "WOW, SO BEAUTIFUL",
            company: "World International",
            nation: "한국",
            image: mok1,
            subImg1: mok2,
            subImg2: mok3,
        },
        {
            id: 2,
            title: "WOW, SO BEAUTIFUL",
            company: "World",
            nation: "중국",
            image: mok2,
            subImg1: mok3,
            subImg2: mok4,
        },
        {
            id: 3,
            title: "WOW, SO BEAUTIFUL",
            company: "International",
            nation: "일본",
            image: mok3,
            subImg1: mok4,
            subImg2: mok1,
        },
        {
            id: 4,
            title: "WOW, SO BEAUTIFUL",
            company: "World International",
            nation: "프랑스",
            image: mok4,
            subImg1: mok1,
            subImg2: mok2,
        },
        {
            id: 5,
            title: "WOW, SO BEAUTIFUL",
            company: "World",
            nation: "한국",
            image: mok1,
            subImg1: mok2,
            subImg2: mok3,
        },
        {
            id: 6,
            title: "WOW, SO BEAUTIFUL",
            company: "International",
            nation: "중국",
            image: mok2,
            subImg1: mok3,
            subImg2: mok4,
        },
        {
            id: 7,
            title: "WOW, SO BEAUTIFUL",
            company: "World International",
            nation: "일본",
            image: mok3,
            subImg1: mok4,
            subImg2: mok1,
        },

    ]

    return (
        <>

            <div className={style.background}>
                <VerticalFlex height={"intial"}>
                    <FlexChild>

                        {rowData ? rowData.map((data, index) => (
                            <MobileFeedViewRow data={data} />
                        )) : null}

                        <FlexChild height={380}></FlexChild>
                    </FlexChild>


                </VerticalFlex>
            </div>

        </>
    );
}

export default MobileFeedView;