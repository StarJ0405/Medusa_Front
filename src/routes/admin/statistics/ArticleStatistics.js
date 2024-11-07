import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./ArticleStatistics.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";

function ArticleStatistics() {
    const total = [
        {
            text: "공지사항",
            icon: <CustomIcon name={"notice"} color={"#383E58"} width={20} />,
            count: "2"
        },
        {
            text: "QnA",
            icon: <CustomIcon name={"qna"} color={"#383E58"} width={20} />,
            count: "10"
        },
        {
            text: "리뷰",
            icon: <CustomIcon name={"review"} color={"#383E58"} width={20} />,
            count: "120"
        }
    ]

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
                                        <CustomIcon name={"articleStatus"} color={"white"} width={20} />
                                    </FlexChild>
                                    <FlexChild>

                                        <Center width={"100%"} textAlign={"left"}>
                                            <P color={"white"} weight={"bold"}>게시물 현황</P>
                                        </Center>

                                    </FlexChild>
                                </HorizontalFlex>
                            </FlexChild>
                        </HorizontalFlex>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.boxWrap}>
                        <HorizontalFlex gap={10}>
                            {
                                total &&
                                total.slice(0, 3).map((data, index) => (
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