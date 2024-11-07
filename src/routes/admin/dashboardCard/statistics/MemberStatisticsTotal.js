import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./MemberStatisticsTotal.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import { useEffect, useState } from "react";
import { requester } from "App";

function MemberStatisticsTotal() {
    const [data, setData] = useState();

    useEffect(() => {
        requester.getUserStatistics((result) => {
            console.log("getUserStatistics", result.data);
            const updatedData = result.data.map(item => ({
                text: item.text,
                count: item.totalCount,

            }));
            setData(updatedData);
        })
    }, [])

    const total = [
        {
            text: "일일\n방문자수",
            count: "400"
        },
        {
            text: "일별\n신규회원",
            count: "10"
        },
        {
            text: "월별\n신규회원",
            count: "400"
        }
    ]

    const onClick = (e) => {
        console.log("click");
    }
    return (
        <div className={style.wrap}>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P weight={"bold"}>통계</P>
                    </Center>
                </FlexChild>
                <FlexChild>

                    <HorizontalFlex gap={10}>
                        {
                            data &&
                            data.map((data, index) => (
                                <FlexChild key={index}>
                                    <VerticalFlex gap={10}>
                                        <FlexChild>
                                            <div className={style.boxArea}>
                                                <Center>
                                                    <P size={"14pt"} cursor weight={"bold"} color={"#5471e6"}>{data.count}</P>
                                                    <P cursor onClick={onClick}>{data.text}</P>
                                                </Center>
                                            </div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                            ))
                        }
                    </HorizontalFlex>

                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default MemberStatisticsTotal;