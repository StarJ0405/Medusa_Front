import style from "./StatisticsStore.module.css";

const { CChartLine } = require("@coreui/react-chartjs");
const { default: P } = require("components/P");
const { default: FlexChild } = require("layouts/flex/FlexChild");
const { default: HorizontalFlex } = require("layouts/flex/HorizontalFlex");
const { default: VerticalFlex } = require("layouts/flex/VerticalFlex");
const { default: Center } = require("layouts/wrapper/Center");


function StatisticsStore(props) {
    return (
        <div className={style.container} style={{ backgroundColor: "white" }}>
            <VerticalFlex gap={10}>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P padding={"10px"} size={"13pt"}>스토어</P>
                    </Center>
                </FlexChild>
                <FlexChild>
                    <div style={{ height: "1px", backgroundColor: "#aaa" }} />
                </FlexChild>
                <FlexChild height={"100%"} width={"100%"}>
                    <VerticalFlex gap={15} padding={"10px"} >
                        <FlexChild>
                            <VerticalFlex>
                                <FlexChild>
                                    <HorizontalFlex>
                                        <P>오늘 방문</P>
                                        <P>20,000</P>
                                    </HorizontalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <HorizontalFlex>
                                        <P>스토어찜</P>
                                        <P>10,000</P>
                                    </HorizontalFlex>

                                </FlexChild>
                            </VerticalFlex>
                        </FlexChild>
                        <FlexChild>
                            <CChartLine
                                data={{
                                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                    datasets: [
                                        {
                                            label: 'My First dataset',
                                            backgroundColor: 'rgba(220, 220, 220, 0.2)',
                                            borderColor: 'rgba(220, 220, 220, 1)',
                                            pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                                            pointBorderColor: '#fff',
                                            data: [ Math.round(Math.random() * 100),  Math.round(Math.random() * 100),  Math.round(Math.random() * 100),  Math.round(Math.random() * 100),  Math.round(Math.random() * 100),  Math.round(Math.random() * 100),  Math.round(Math.random() * 100)],
                                        }
                                    ],
                                }}
                            />
                        </FlexChild>
                    </VerticalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default StatisticsStore;