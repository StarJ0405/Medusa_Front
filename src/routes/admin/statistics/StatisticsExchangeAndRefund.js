import style from "./StatisticsExchangeAndRefund.module.css";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import { propTypes } from "react-ui-tree/dist/react-ui-tree";

function StatisticsExchangeAndRefund(props) {
    const order = [
        {
            text: "배송전 취소",
            count: "50",
            count2: "50"

        },
        {
            text: "교환",
            count: "5",
            count2: "50"
        },
        {
            text: "반품",
            count: "50",
            count2: "50"
        },
        {
            text: "환불",
            count: "5",
            count2: "50"
        }
    ]
    return (

        <>
            {
                props.orderManagement
                    ?
                    <HorizontalFlex>
                        <FlexChild height={"100%"} width={"max-content"}>
                            <div className={style.label}>
                                <VerticalFlex gap={20}>
                                    <FlexChild>
                                        <CustomIcon name={"exchangeAndRefund"} width={30} color={"white"} />
                                    </FlexChild>
                                    <FlexChild>
                                        <Center>
                                            <P size={15}>주문</P>
                                            <P size={15}>취소</P>
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
                                                        <HorizontalFlex gap={5}>
                                                            <FlexChild width={"30%"}>
                                                                <Center>
                                                                    <P>{data.text}</P>
                                                                </Center>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <P>신청</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <Inline>
                                                                    <P cursor weight={"bold"} color={"var(--main-color)"}>{data.count}</P>
                                                                    <P>건</P>
                                                                </Inline>
                                                            </FlexChild>
                                                            <FlexChild width={"max-content"}>
                                                                <P>/</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <P>처리중</P>
                                                            </FlexChild>

                                                            <FlexChild>
                                                                <Inline>
                                                                    <P cursor weight={"bold"} color={"var(--main-color)"}>{data.count2}</P>
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
                    :
                    <HorizontalFlex>
                        <FlexChild height={"100%"} width={"max-content"}>
                            <div className={style.label}>
                                <VerticalFlex gap={20}>
                                    <FlexChild>
                                        <CustomIcon name={"exchangeAndRefund"} width={30} color={"white"} />
                                    </FlexChild>
                                    <FlexChild>
                                        <Center>
                                            <P size={15}>교환 및</P>
                                            <P size={15}>환불현황</P>
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
                                                        <HorizontalFlex gap={5}>
                                                            <FlexChild width={"30%"}>
                                                                <Center>
                                                                    <P>{data.text}</P>
                                                                </Center>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <P>신청</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <Inline>
                                                                    <P cursor weight={"bold"} color={"var(--main-color)"}>{data.count}</P>
                                                                    <P>건</P>
                                                                </Inline>
                                                            </FlexChild>
                                                            <FlexChild width={"max-content"}>
                                                                <P>/</P>
                                                            </FlexChild>
                                                            <FlexChild>
                                                                <P>처리중</P>
                                                            </FlexChild>

                                                            <FlexChild>
                                                                <Inline>
                                                                    <P cursor weight={"bold"} color={"var(--main-color)"}>{data.count2}</P>
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
            }
        </>

    );
}

export default StatisticsExchangeAndRefund;




