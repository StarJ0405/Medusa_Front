import { cilSpeedometer } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect } from "react";

function DashboardTopBox(props) {
    const { data, orderData } = props;

    return (
        <div style={{ backgroundColor: "white" }}>
            <VerticalFlex gap={10}>
                <FlexChild>
                    <HorizontalFlex alignItems={"center"} gap={5}>
                        <FlexChild justifyContent={"flex-end"} width={"40%"}>
                                {data.icon}
                        </FlexChild>
                        <FlexChild>
                            <P size={"14pt"}>{data.title}</P>
                        </FlexChild>
                    </HorizontalFlex>

                </FlexChild>
                <FlexChild width={"90%"}>
                    <div style={{ height: "1px", backgroundColor: "#ddd" }} />
                </FlexChild>
                <FlexChild>
                    <VerticalFlex gap={5} padding={"5px 0 15px 0"}>
                        {
                            data &&
                            data.contents.map((row, index) => (
                                <FlexChild>
                                    <HorizontalFlex width={"70%"}>
                                        <P key={index}>{row.text}</P>
                                        {
                                            orderData ?
                                            orderData.map((item, index) => {
                                                if(row.status === item.status){
                                                    return(
                                                        <P weight={"bold"} color={"#c40d2e"}>{item.count}</P>
                                                    );
                                                }else{
                                                    <P>0</P>
                                                }
                                            })
                                            :
                                            <P>0</P>
                                        }
                                    </HorizontalFlex>
                                </FlexChild>
                            ))
                        }
                    </VerticalFlex>
                </FlexChild>
            </VerticalFlex>
        </div>
    );
}

export default DashboardTopBox;