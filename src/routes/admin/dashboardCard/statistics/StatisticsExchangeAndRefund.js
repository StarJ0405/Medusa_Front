import style from "./StatisticsExchangeAndRefund.module.css";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import Center from "layouts/wrapper/Center";
import CustomIcon from "components/icons/CustomIcon";
import Inline from "layouts/container/Inline";
import { propTypes } from "react-ui-tree/dist/react-ui-tree";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { requester } from "App";
import { useTranslation } from "react-i18next";

function StatisticsExchangeAndRefund(props) {
    const navigate = useNavigate();
    const [mounted, setMounted] = useState(false);
    const [exchangeAndRefund, setExchangeAndRefund] = useState();
    const {t} = useTranslation();

    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {
        if (mounted) {

            let now = new Date();
            let oneMonthAgo = new Date(new Date().setMonth(now.getMonth() - 1));
            let data = {
                fromDateTime: oneMonthAgo,
                toDateTime: now
            }
            requester.getExchangeAndRefund(data, (result) => {
                console.log(result.data);
                const orderStatusData = [
                    {
                        text: t("Canceled"),
                        value: "CancelRequest",
                        value2: "Canceled",
                        count: result.data.canceledRequest ? result.data.canceledRequest : 0,
                        count2: result.data.canceled ? result.data.canceled : 0
                    },
                    {
                        text: t("Exchange"),
                        value: "ExchangeRequest",
                        value2: "ExchangeCompleted",
                        count: result.data.exchangeRequest ? result.data.exchangeRequest : 0,
                        count2: result.data.exchangeCompleted ? result.data.exchangeCompleted : 0
                    },
                    {
                        text: t("ReturnProduct"),
                        value: "ReturnRequest",
                        value2: "ReturnCompleted",
                        count: result.data.returnRequest ? result.data.returnRequest : 0,
                        count2: result.data.returnCompleted ? result.data.returnCompleted : 0
                    },
                    {
                        text: t("Refund"),
                        value: "RefundRequest",
                        value2: "RefundCompleted",
                        count: result.data.refundRequest ? result.data.refundRequest : 0,
                        count2: result.data.refundCompleted ? result.data.refundCompleted : 0
                    },
                ]
                setExchangeAndRefund(orderStatusData);
            })
        }
        

        // text: dataMapping[item.status],
        // count: item.requestCount,
        // count2: item.inProgressCount,
        // value: item.status === "ReturnProduct" ? "return" : item.status.toLowerCase()
       
    }, [mounted])

    const onStatusClick = (value) => {
        navigate(`/admin/orderStatus/${value}`)
    }


    return (
        <HorizontalFlex>
            <FlexChild height={"100%"} width={"max-content"}>
                <div className={style.label}>
                    <VerticalFlex gap={5}>
                        <FlexChild width={100}>
                            <CustomIcon name={"exchangeAndRefund"} width={30} color={"white"} />

                        </FlexChild>
                        <FlexChild>
                            <Center>
                                <P size={15}>{"환불현황"}</P>
                                {/* <P size={15}></P> */}
                            </Center>
                        </FlexChild>
                    </VerticalFlex>
                </div>
            </FlexChild>
            <FlexChild height={"100%"}>
                <div className={style.contentArea}>
                    <VerticalFlex gap={5}>
                        {
                            exchangeAndRefund &&
                            exchangeAndRefund.map((data, index) => (
                                <FlexChild key={index} width={"95%"}>
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
                                                        <P hover onClick={() => onStatusClick(data.value)} cursor weight={"bold"} color={"var(--main-color)"}>{data.count}</P>
                                                        <P>건</P>
                                                    </Inline>
                                                </FlexChild>
                                                <FlexChild width={"max-content"}>
                                                    <P>/</P>
                                                </FlexChild>
                                                <FlexChild>
                                                    <P>완료</P>
                                                </FlexChild>

                                                <FlexChild>
                                                    <Inline>
                                                        <P hover onClick={() => onStatusClick(data.value2)} cursor weight={"bold"} color={"var(--main-color)"}>{data.count2}</P>
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

export default StatisticsExchangeAndRefund;




