import { CChartLine } from "@coreui/react-chartjs";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";

function StatisticsSales(props) {
    const {data} = props;
    return (
        <div style={{ backgroundColor: "white" }}>
            <VerticalFlex>
                <FlexChild>
                    <Center width={"100%"} textAlign={"left"}>
                        <P size={"13pt"}>매출통계</P>
                    </Center>
                </FlexChild>
                <FlexChild>
                    <CChartLine data={data} />
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default StatisticsSales;