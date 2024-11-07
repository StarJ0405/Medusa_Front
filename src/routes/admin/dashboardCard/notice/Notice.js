import VerticalFlex from "layouts/flex/VerticalFlex";
import style from "./Notice.module.css";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import Inline from "layouts/container/Inline";


function Notice() {
    const notice = [
        {
            text: "은행 점검에 따른 정산 지연 안내 드립니다.",
            category: "점검공지"
        },
        {
            text: "매주 목요일에 판매수익금이 정산됩니다.",
            category: "정산공지"
        },
        {
            text: "은행 점검에 따른 정산 지연 안내 드립니다.",
            category: "점검공지"
        },
        {
            text: "상품을 예약된 시간에 오픈하도록 설정이 가능한가요 ?",
            category: "점검공지"
        },
        {
            text: "상품을 예약된 시간에 오픈하도록 설정이 가능한가요 ?",
            category: "점검공지"
        },
    ]

    const onClick = (e) => {
        console.log("click");
    }
    return (
        <div className={style.wrap}>
            <VerticalFlex gap={5}>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild>
                            <HorizontalFlex gap={5}>
                                <FlexChild width={"max-content"}>
                                    <VerticalFlex>
                                        <FlexChild>
                                            <CustomIcon name={"notice"} color={"var(--main-color)"} width={15} />
                                        </FlexChild>
                                        <FlexChild>
                                            <div style={{ height: "13px" }} />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <P weight={"bold"}>공지사항</P>
                                </FlexChild>
                            </HorizontalFlex>
                        </FlexChild>
                        <FlexChild width={"max-content"}>
                            <VerticalFlex>
                                <FlexChild>
                                    <CustomIcon name={"right"} width={10} color={"var(--main-color)"} />
                                </FlexChild>

                                <FlexChild>
                                    <div style={{ height: "15px" }} />
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
                {
                    notice &&
                    notice.slice(0, 3).map((data, index) => (
                        <FlexChild key={index}>
                            <Center width={"95%"} textAlign={"left"}>
                                <div className={style.text}>
                                    <Inline>
                                        <P cursor color={"#5471e6"}>{"["}{data.category}{"]"}</P>
                                        <P cursor onClick={onClick}>{data.text}</P>
                                    </Inline>
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

export default Notice;