import style from "./OrderStatus.module.css";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";

function OrderStatus(props) {

    const order = [
        {
            text: "입금대기",
            count: "50",
            icon: <CustomIcon name={"waitingForPayment"} width={30} color={"black"} />
        },
        {
            text: "상품준비",
            count: "5",
            icon: <CustomIcon name={"preparingProduct"} width={30} color={"black"} />
        },
        {
            text: "배송대기",
            count: "50",
            icon: <CustomIcon name={"waitingForDelivery"} width={30} color={"black"} />
        },
        {
            text: "배송중",
            count: "5",
            icon: <CustomIcon name={"shipping"} width={30} color={"black"} />
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
                                        <CustomIcon name={"orderList"} width={30} color={"white"} />
                                    </FlexChild>
                                    <FlexChild>
                                        <Center>
                                            <P size={15}>주문{"\n"}현황</P>
                                        </Center>
                                    </FlexChild>
                                </VerticalFlex>
                            </div>
                        </FlexChild>
                        <FlexChild height={"100%"}>
                        <div className={style.contentArea}>
                            <HorizontalFlex gap={5}>
                                {
                                    order &&
                                    order.map((data, index) => (
                                        <FlexChild height={"100%"}>
                                            <div className={style.boxArea}>
                                                <VerticalFlex gap={5}>
                                                    <FlexChild>
                                                        {data.icon}
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <P>{data.text}</P>
                                                    </FlexChild>
                                                    <FlexChild justifyContent={"flex-end"}>
                                                        <Inline>
                                                            <P cursor weight={"bold"} color={"var(--main-color)"}>{data.count}</P>
                                                            <P>건</P>
                                                        </Inline>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </div>
                                        </FlexChild>
                                    ))
                                }
                            </HorizontalFlex>
                                </div>
                        </FlexChild>
                    </HorizontalFlex>
                    :
                    <HorizontalFlex>
                        <FlexChild height={"100%"} width={"max-content"}>
                            <div className={style.label}>
                                <VerticalFlex gap={20}>
                                    <FlexChild>
                                        <CustomIcon name={"orderList"} width={30} color={"white"} />
                                    </FlexChild>
                                    <FlexChild>
                                        <Center>
                                            <P size={15}>주문현황</P>
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
            }
        </>
    );
}

export default OrderStatus;


