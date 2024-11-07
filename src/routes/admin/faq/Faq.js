import style from ":"
import VerticalFlex from "layouts/flex/VerticalFlex";
import FlexChild from "layouts/flex/FlexChild";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import Inline from "layouts/container/Inline";
import CustomIcon from "components/icons/CustomIcon";
import HorizontalFlex from "layouts/flex/HorizontalFlex";


function Faq() {
    const question = [
        {
            text: "상품을 예약된 시간에 오픈하도록 설정이 가능한가요 ?"
        },
        {
            text: "게시글 용량이 다 찼어요. 어떻게 해야하나요 ?"
        },
        {
            text: "상품등록에 실패했어요. 어떻게 해야하나요 ?"
        },
        {
            text: "상품등록에 실패했어요. 어떻게 해야하나요 ?"
        },
        {
            text: "상품등록에 실패했어요. 어떻게 해야하나요 ?"
        },
        {
            text: "상품등록에 실패했어요. 어떻게 해야하나요 ?"
        },
    ]

    const onClick = (e) => {
        console.log("click");
    }
    return (
        <div className={style.wrap}>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <HorizontalFlex gap={10}>
                        <FlexChild width={"max-content"}>
                            <CustomIcon name={"question"} width={20} />
                        </FlexChild>
                        <FlexChild>
                            <P weight={"bold"}>자주묻는질문</P>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                {
                    question &&
                    question.slice(0, 3).map((data, index) => (
                        <FlexChild key={index}>
                            <Center width={"95%"} textAlign={"left"}>
                                <div className={style.text}>
                                    <P cursor onClick={onClick}>Q. {data.text}</P>
                                </div>
                                <div className={style.line} />
                            </Center>
                        </FlexChild>
                    ))
                }
            </VerticalFlex>
        </div>
    );
}

export default Faq;