import style from "./StatisticsCalculate.module.css";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";

function StatisticsCalculate(props) {
    const { data } = props;
    return (
        <div className={style.container}>
            <VerticalFlex>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P size={"13pt"}>정산현황</P>
                    </Center>
                </FlexChild>
                <FlexChild>
                    <HorizontalFlex>
                        <FlexChild>
                            <CChartBar
                                data={{
                                    labels: ['22.01', '22.02', '22.03', '22.04', '22.05', '22.06'],
                                    datasets: [
                                        {
                                            label: '정산현황',
                                            backgroundColor: '#c40d2e',
                                            data: [40, 20, 12, 39, 10, 40],
                                        },
                                    ],
                                }}

                            />
                        </FlexChild>
                        <FlexChild width={"40%"}>
                            <VerticalFlex gap={20}>
                                <FlexChild>
                                    <HorizontalFlex width={"80%"}>
                                        <P>이달매출</P>
                                        <P color={"#c40d2e"} weight={"bold"}>300,000,000</P>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex width={"80%"}>
                                        <P>이달매출</P>
                                        <P color={"#c40d2e"} weight={"bold"}>500,000,000</P>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex width={"80%"}>
                                        <P>이달매출</P>
                                        <P color={"#c40d2e"} weight={"bold"}>800,000,000</P>
                                    </HorizontalFlex>
                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                    </HorizontalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default StatisticsCalculate;


