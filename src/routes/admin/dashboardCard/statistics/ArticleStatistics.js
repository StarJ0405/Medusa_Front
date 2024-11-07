import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ArticleStatistics.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import { useEffect, useState } from "react";
import { requester } from "App";

function ArticleStatistics() {
    const [mounted, setMounted] = useState(false);
    const [article, setArticle] = useState();
    useEffect(() => {
        setMounted(true);
    },[])
    useEffect(() => {
        requester.getArticleStatistics((result) => {
            console.log(result.data);
            const updatedData = result.data.map(item => ({
                text: item.text,
                count: item.totalCount,
                icon: <CustomIcon name={item.status} color={"#383E58"} width={20} />,
            }));
            setArticle(updatedData);
        })
    },[mounted])

    const onClick = (e) => {
        console.log("click");
    }
    return (
        <div className={style.wrap}>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <div className={style.label}>
                        <HorizontalFlex padding={"0 10px"}>
                            <FlexChild>
                                <HorizontalFlex gap={5}>
                                    <FlexChild width={"max-content"}>
                                        <CustomIcon name={"articleStatus"} width={20} color={"white"} />
                                    </FlexChild>
                                    <FlexChild>

                                        <Center width={"100%"} textAlign={"left"}>
                                            <P color={"white"} weight={"bold"}>게시물 현황</P>
                                        </Center>

                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                            <FlexChild width={"max-content"}>
                                <VerticalFlex>
                                    <FlexChild>
                                        <P size={"14pt"} color={"white"}>{">"}</P>
                                    </FlexChild>
                                </VerticalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.boxWrap}>
                        <HorizontalFlex gap={10}>
                            {
                                article &&
                                article.map((data, index) => (
                                    <FlexChild key={index}>
                                        <div className={style.boxArea}>
                                            <VerticalFlex gap={10}>
                                                <FlexChild>
                                                    {data.icon}
                                                </FlexChild>
                                                <FlexChild>
                                                    <Center>
                                                        <P onClick={onClick}>{data.text}</P>

                                                    </Center>
                                                </FlexChild>
                                            </VerticalFlex>
                                            <div className={style.count}>
                                                <Center>
                                                    <P>{data.count}</P>
                                                </Center>
                                            </div>
                                        </div>
                                    </FlexChild>
                                ))
                            }
                        </HorizontalFlex>
                    </div>

                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default ArticleStatistics;