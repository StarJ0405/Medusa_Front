import style from "./DelayStatistics.module.css";
import FlexChild from "layouts/flex/FlexChild";
import Center from "layouts/wrapper/Center";
import P from "components/P";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import VerticalFlex from "layouts/flex/VerticalFlex";



function DelayStatistics() {
    const order = [
        {
            text: "배송지연",
            count: "50"


        },
        {
            text: "반품지연",
            count: "5"
        },
        {
            text: "교환지연",
            count: "50"
        },
        {
            text: "답변지연",
            count: "5"
        }
    ]
    return (

        <HorizontalFlex>
            <FlexChild height={"100%"} width={"max-content"}>
                <div className={style.label}>
                    <VerticalFlex gap={20}>
                        <FlexChild>
                            <CustomIcon name={"delay"} width={30} color={"white"} />
                        </FlexChild>
                        <FlexChild>
                            <Center>

                                <P size={15}>처리지연</P>
                                <P size={15}>현황</P>
                            </Center>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </FlexChild>
            <FlexChild height={"100%"}>
                <div className={style.contentArea}>
                    <VerticalFlex gap={5}>
                        {
                            order &&
                            order.map((data, index) => (
                                <FlexChild width={"95%"}>
                                    <VerticalFlex gap={5}>
                                        <FlexChild>
                                            <HorizontalFlex>
                                                <FlexChild>
                                                    <P>{data.text}</P>
                                                </FlexChild>
                                                <FlexChild justifyContent={"flex-end"}>
                                                    <Inline>
                                                        <P cursor weight={"bold"} color={"var(--main-color)"}>{data.count}</P>
                                                        <P>건</P>
                                                    </Inline>
                                                </FlexChild>
                                            </HorizontalFlex>
                                        </FlexChild>
                                        <FlexChild>
                                            <div className={style.line} />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                            ))
                        }
                    </VerticalFlex>
                </div>
            </FlexChild>
        </HorizontalFlex>

    );

}

export default DelayStatistics;