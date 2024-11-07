import style from "./PartnersStatisticsTotal.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import { useEffect, useState } from "react";
import { requester } from "App";
import VerticalFlex from "layouts/flex/VerticalFlex";

function PartnersStatisticsTotal(props) {
    const [mounted, setMounted] = useState(false);
    const [data, setData] = useState();
    const [todayPartnersVisitor, setTodayPartnersVisitor] = useState();
    const { userInfo } = props;

    useEffect(() => {
        setMounted(true);
    }, [])
    useEffect(() => {
        requester.getUserStatistics((result) => {
            
            const updatedData = result.data.map(item => ({
                text: item.text,
                count: item.totalCount,

            }));
            setData(updatedData);
        })
    }, [mounted])
    useEffect(() => {
        if (userInfo) {
            let data = { partnersUrl: userInfo.partnersUrl };
            requester.partnersAccessStatistics(data, (result) => {
                setTodayPartnersVisitor(result.aggregations.uniq_lines.value);
                console.log(result.aggregations.uniq_lines.value);
            })
        }
    }, [userInfo])

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
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <div style={{backgroundColor: "#eee", padding: "10px"}}>
                                        <Center>
                                            <P size={"14pt"} cursor weight={"bold"} color={"#5471e6"}>{todayPartnersVisitor ? todayPartnersVisitor : 0}</P>
                                            <P cursor onClick={onClick}>{"파트너스 \n일일 방문자수"}</P>
                                        </Center>
                                    </div>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
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

export default PartnersStatisticsTotal;