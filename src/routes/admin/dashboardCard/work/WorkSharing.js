import style from "./WorkSharing.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import P from "components/P";
import Inline from "layouts/container/Inline";
import Center from "layouts/wrapper/Center";
import VerticalFlex from "layouts/flex/VerticalFlex";

function WorkSharing() {
    const total = [
        {
            text: "공지사항",
            icon: <CustomIcon name={"notice"} color={"#383E58"} width={20} />
        },
        {
            text: "QnA",
            icon: <CustomIcon name={"qna"} color={"#383E58"} width={20} />
        },
        {
            text: "리뷰",
            icon: <CustomIcon name={"review"} color={"#383E58"} width={20} />
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
                        <FlexChild>
                            <Center>
                                <P color={"white"} weight={"bold"}>업무공유</P>
                            </Center>

                        </FlexChild>
                    </div>
                </FlexChild>
                <FlexChild>
                    <div className={style.textWrap}>
                        <VerticalFlex gap={10}>
                            <FlexChild>
                                <Center width={"100%"} textAlign={"left"}>
                                    <P>7월 18일</P>
                                </Center>
                            </FlexChild>
                            <FlexChild>
                                <Center width={"100%"} textAlign={"left"}>
                                    <P>{">"} 야유회 휴무 공지 디자인 올리기</P>
                                </Center>
                            </FlexChild>
                            <FlexChild>
                                <Center width={"100%"} textAlign={"left"}>
                                    <P>{">"} 품질상품 체크하기</P>
                                </Center>
                            </FlexChild>
                        </VerticalFlex>
                    </div>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default WorkSharing;