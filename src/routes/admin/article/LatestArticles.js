import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./LatestArticles.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import Inline from "layouts/container/Inline";
import Center from "layouts/wrapper/Center";
import clsx from "classnames";

function LatestArticles() {

    const articles = [
        {
            type: "[상품문의]",
            content: "상품이 파손되어 도착했습니다. 확인 부탁드립니다."
        },
        {
            type: "[리뷰등록]",
            content: "먹어본 액상 중 가장 맛있습니다. 가성비 좋고, 타격감 좋고, 앞으로 자주 이용하도록 하겠습니다."
        },
        {
            type: "[공지등록]",
            content: "21일(금) 휴무 공지."
        },
        {
            type: "[상품문의]",
            content: "상품이 파손되어 도착했습니다. 확인 부탁드립니다."
        },
        {
            type: "[리뷰등록]",
            content: "먹어본 액상 중 가장 맛있습니다. 가성비 좋고, 타격감 좋고, 앞으로 자주 이용하도록 하겠습니다."
        }
    ]

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
                                <P>게시판 최신글</P>
                            </FlexChild>

                        </HorizontalFlex>

                    </div>
                </FlexChild>
                <FlexChild>
                    <VerticalFlex>
                        {
                            articles &&
                            articles.map((row, index) => (
                                <FlexChild>
                                    <div className={index % 2 === 0 ? style.evenRow : style.oddRow}>
                                        <Center width={"100%"} textAlign={"left"}>
                                            <Inline>
                                                <P color={"#5471e6"}>{row.type} </P>
                                                <P>{row.content}</P>
                                            </Inline>
                                        </Center>
                                    </div>
                                </FlexChild>
                            ))
                        }
                    </VerticalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default LatestArticles;