import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import style from "./StatisticsOrder.module.css";

function StatisticsOrder(props) {
    const { newOrder, total } = props;
    return (
        <div className={style.container}>
            <VerticalFlex gap={10}>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P padding={"10px"} size={"13pt"}>주문현황</P>
                    </Center>
                </FlexChild>
                <FlexChild>
                    <div style={{ height: "1px", backgroundColor: "#aaa" }} />
                </FlexChild>
                <FlexChild>
                    <VerticalFlex gap={15} padding={"20px"}>
                        <FlexChild>
                            <P>실시간 주문완료</P>
                        </FlexChild>
                        <FlexChild>
                            <P weight={"bold"} color={"#c40d2e"}>{newOrder} 건</P>
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
                <FlexChild>
                    <div style={{ width: "85%", height: "1px", backgroundColor: "#aaa" }} />
                </FlexChild>
                <FlexChild>
                    <VerticalFlex gap={15} padding={"20px"}>
                        <FlexChild>
                            <P>실시간 주문금액</P>
                        </FlexChild>
                        <FlexChild>
                            <P weight={"bold"} color={"#c40d2e"}>{total}</P>
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default StatisticsOrder;