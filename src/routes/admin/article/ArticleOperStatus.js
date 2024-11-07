import P from "components/P";
import style from "./ArticleOperStatus.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import Inline from "layouts/container/Inline";
import CustomIcon from "components/icons/CustomIcon";
import Center from "layouts/wrapper/Center";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import { useEffect, useState } from "react";
import { requester } from "App";

function ArticleOperStatus() {
    const [mounted, setMounted] = useState(false);
    const [totalArticle, setTotalArticle] = useState();
    const [notice, setNotice] = useState();
    const [qna, setQna] = useState();
    const [review, setReview] = useState();
    
    useEffect(() => {
        setMounted(true);
    }, [])
    useEffect(() => {
        requester.getArticleStatistics2((result) => {

            if (result.code === 0) {
                result.data.map((data, index) => {
                    switch (data.type) {
                        case "totalArticle":
                            setTotalArticle(data.newCount);
                            break;
                        case "notice":
                            setNotice(data.newCount);
                            break;
                        case "qna":
                            setQna(data.newCount);
                            break;
                        case "review":
                            setReview(data.newCount);
                            break;
                    }
                })
            }


        })
        
    }, [mounted])

    const data = [
        {
            title: "공지사항",
            new: notice && notice,
            max: 200,
            line: true
        },
        {
            title: "Q&A",
            new: qna && qna,
            max: 200,
            line: true
        },
        {
            title: "리뷰",
            new: review && review,
            max: 200
        }
    ]

    const Content = (props) => {
        const { data } = props;
        return (
            <FlexChild>
                {
                    data &&
                    <VerticalFlex>
                        <FlexChild>
                            <div className={style.contentArea}>
                                {
                                    data &&
                                    <HorizontalFlex gap={20}>
                                        <FlexChild>{data.title}</FlexChild>
                                        <FlexChild width={"max-content"}>
                                            <HorizontalFlex gap={20}>
                                                <FlexChild width={"max-content"}>
                                                    <P size={15}>신규</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <P color={"var(--main-color)"} size={20} weight={"bold"}>{data.new}</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <P>개</P>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild width={"max-content"}>/</FlexChild>
                                        <FlexChild width={"max-content"}>
                                            <Inline>
                                                <P weight={"bold"} color={"#5471e6"} size={20}>{data.max}</P>
                                                <P size={15}> 개</P>
                                            </Inline>
                                        </FlexChild>
                                    </HorizontalFlex>

                                }
                            </div>
                        </FlexChild>
                        {
                            data.line &&
                            <FlexChild>
                                <div className={style.line} />
                            </FlexChild>
                        }

                    </VerticalFlex>
                }
            </FlexChild>
        );
    }

    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <div className={style.label}>
                        <HorizontalFlex gap={10}>
                            <FlexChild width={"max-content"}>
                                <CustomIcon name={"articleOperStatus"} width={20} />
                            </FlexChild>
                            <FlexChild>
                                <P>게시판 운영 현황</P>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.contentWrap}>
                        <VerticalFlex>
                            <FlexChild>
                                <div className={style.topWrap}>
                                    <HorizontalFlex>
                                        <FlexChild>
                                            <P weight={"bold"} size={17}>현재 운영 게시판</P>
                                        </FlexChild>
                                        <FlexChild justifyContent={"flex-end"}>
                                            <Inline>
                                                <P weight={"bold"} size={20} color={"var(--main-color)"}>{totalArticle && totalArticle}</P>
                                                <P size={15}> 개</P>
                                            </Inline>
                                        </FlexChild>
                                    </HorizontalFlex>
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <VerticalFlex>
                                    {
                                        data &&
                                        data.map((row, index) =>
                                            <Content data={row} />
                                        )
                                    }
                                </VerticalFlex>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div >
    );
}

export default ArticleOperStatus;