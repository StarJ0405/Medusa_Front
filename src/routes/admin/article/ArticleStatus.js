import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ArticleStatus.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import ProgressBar from "./progressBar/ProgressBar";
import Center from "layouts/wrapper/Center";
import Inline from "layouts/container/Inline";
import { useEffect, useState } from "react";
import { requester } from "App";



function ArticleStatus() {
    const [mounted, setMounted] = useState(false);
    const [totalArticleVolumePersent, setTotalArticleVolumePersent] = useState();
    const [articleVolume, setArticleVolume] = useState();
    const [articleInUse, setArticleInUse] = useState();
    const [articleAvailable, setArticleAvailable] = useState();


    useEffect(() => {
        setMounted(true);
    },[])
    useEffect(() => {
        requester.getArticleVolumeStatistics((result) => {
            console.log(result.data);
            if (result.code === 0) {
                result.data.map((data, index) => {
                    switch (data.type) {
                        case "totalArticleVolumePersent":
                            setTotalArticleVolumePersent(data.value);
                            
                            break;
                        case "articleVolume":
                            setArticleVolume(data.value);
                            break;
                        case "articleInUse":
                            setArticleInUse(data.value);
                            break;
                        case "articleAvailable":
                            setArticleAvailable(data.value);
                            break;
                    }
                })
            }
        })
    },[mounted])
    useEffect(() => {
        console.log(totalArticleVolumePersent);
    },[totalArticleVolumePersent])

    const total = [
        {
            text: "게시판 총 용량",
            count: articleVolume && articleVolume,
            color: "var(--main-color)"
        },
        {
            text: "사용중",
            count: articleInUse && articleInUse,
            color: "var(--main-color)"
        },
        {
            text: "사용가능",
            count: articleAvailable && articleAvailable,
            color: "#5471e6"
        }
    ]


    return (
        <div className={style.container}>
            <VerticalFlex gap={20}>
                <FlexChild>
                    <div className={style.label}>
                        <HorizontalFlex gap={10}>
                            <FlexChild width={"max-content"}>
                                <CustomIcon name={"articleCapacity"} width={20} />
                            </FlexChild>
                            <FlexChild>
                                <P>게시판 용량 현황</P>
                            </FlexChild>

                        </HorizontalFlex>

                    </div>
                </FlexChild>
                <FlexChild>
                    <VerticalFlex>
                        <FlexChild width={"90%"}>
                            <VerticalFlex gap={5}>
                                <FlexChild>
                                    <ProgressBar bgcolor={"#5471e6"} completed={totalArticleVolumePersent && totalArticleVolumePersent} />
                                </FlexChild>
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild>
                                                    <div className={style.verticalLine} />
                                                </FlexChild>
                                                <FlexChild justifyContent={"center"}>
                                                    <div className={style.verticalLine} />
                                                </FlexChild>
                                                <FlexChild justifyContent={"flex-end"}>
                                                    <div className={style.verticalLine} />
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.horizontalLine}></div>
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <P>0</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"center"}>
                                            <P>50</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-end"}>
                                            <P>100</P>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>

                    </VerticalFlex>
                </FlexChild>
                <FlexChild width={"90%"}>
                    <HorizontalFlex gap={10}>
                        {
                            total &&
                            total.slice(0, 3).map((data, index) => (
                                <FlexChild key={index}>
                                    <div className={style.boxArea}>
                                        <VerticalFlex gap={10}>
                                            <FlexChild>
                                                <Center>
                                                    <P size={20}>{data.text}</P>
                                                </Center>
                                            </FlexChild>
                                            <FlexChild>
                                                <Center>
                                                    <Inline>
                                                        <P size={20} weight={"bold"} color={data.color}>{data.count}</P>
                                                        <P> MB</P>
                                                    </Inline>
                                                </Center>
                                            </FlexChild>
                                        </VerticalFlex>
                                    </div>
                                </FlexChild>
                            ))
                        }
                    </HorizontalFlex>
                </FlexChild>
            </VerticalFlex>
        </div >
    );
}

export default ArticleStatus;