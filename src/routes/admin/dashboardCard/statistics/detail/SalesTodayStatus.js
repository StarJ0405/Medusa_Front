import FlexChild from "layouts/flex/FlexChild";
import style from "./SalesTodayStatus.module.css";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import Inline from "layouts/container/Inline";
import CustomIcon from "components/icons/CustomIcon";
import Center from "layouts/wrapper/Center";
import clsx from "classnames";
import Dummy from "components/Dummy";
import { useContext, useEffect, useRef, useState } from "react";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";
import { useNavigate } from "react-router-dom";

function SalesTodayStatus() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const formattedToday = `${year}년 ${month}월 ${date}일`;
    const [mounted, setMounted] = useState(false);
    const [totalRealPayment, setTotalRealPayment] = useState();
    const [totalRefund, setTotalRefund] = useState();
    const [totalSales, setTotalSales] = useState();


    const { isMobile } = useContext(BrowserDetectContext);
    const navigate = useNavigate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = date < 10 ? `0${date}` : date;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    // 오늘 날짜를 'MM월 dd일' 형식으로 표시 (한국어로)
    const todayDateFormatted = today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', });
    const currentMonth = today.toLocaleDateString('ko-KR', { month: 'long', });

    const [data, setData] = useState();
    const [summary, setSummary] = useState();

    useEffect(() => {
        setMounted(true);
    }, [])

    useEffect(() => {
        if (mounted) {
            let totalOrderCount = 0;
            let totalOrderAmount = 0;
            let totalPaidCount = 0;
            let totalPaidAmount = 0;
            let totalRefundCount = 0;
            let totalRefundAmount = 0;
            let totalValidCount = 0;
            let totalValidAmount = 0;

            requester.getTodayOrderStatistics((result) => {
                result.data.map((row) => {
                    totalOrderCount += row.orderCount;
                    totalOrderAmount += row.orderAmount;
                    totalPaidCount += row.paidCount;
                    totalPaidAmount += row.paidAmount;
                    totalRefundCount += row.refundCount;
                    totalRefundAmount += row.refundAmount;
                    totalValidCount += row.validCount;
                    totalValidAmount += row.validAmount;
                })
                setData(result.data);
                let tempSummary = {
                    todayOrderCount: result.data[6].orderCount,
                    todayOrderAmount: result.data[6].orderAmount,
                    todayPaidCount: result.data[6].paidCount,
                    todayPaidAmount: result.data[6].paidAmount,
                    todayRefundCount: result.data[6].refundCount,
                    todayRefundAmount: result.data[6].refundAmount,
                    todayValidCount: result.data[6].validCount,
                    todayValidAmount: result.data[6].validAmount,

                    totalOrderCount: totalOrderCount,
                    totalOrderAmount: totalOrderAmount,
                    totalPaidCount: totalPaidCount,
                    totalPaidAmount: totalPaidAmount,
                    totalRefundCount: totalRefundCount,
                    totalRefundAmount: totalRefundAmount,
                    totalValidCount: totalValidCount,
                    totalValidAmount: totalValidAmount
                }
                setSummary(tempSummary);
            })

        }
    }, [mounted, isMobile]);



    useEffect(() => {
        if (data) {
            const labels = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const formattedDate = date.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                });
                labels.unshift(formattedDate);
            }
        };
    }, [data])

    const Content = (props) => {
        const { data, color, minus, title, amount } = props;
        return (
            <div className={clsx(style.contentArea, { [style.bgColor]: color })}>
                <HorizontalFlex>
                    <FlexChild>
                        <P size={15}>{title}</P>
                    </FlexChild>
                    <FlexChild justifyContent={"flex-end"}>
                        {
                            minus &&
                            <div className={style.minus}>-</div>
                        }
                        <Dummy width={10} />
                        <Inline>
                            <P size={20} weight={"bold"} >{amount}</P>
                            <P>원</P>
                        </Inline>
                    </FlexChild>
                </HorizontalFlex>
            </div>
        );
    }

    return (
        <div className={style.container}>
            {summary &&
                <VerticalFlex>
                    <FlexChild>
                        <div className={style.label}>
                            <Center width={"100%"} textAlign={"left"}>
                                <P size={15}>{formattedToday} 매출 현황</P>
                            </Center>
                        </div>
                    </FlexChild>
                    <FlexChild>
                        <div className={style.contentWrap}>
                            <VerticalFlex border={"1px solid black"} borderRadius={"5px"} padding={"20px 0"}>
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild width={"90%"}>
                                            <Content data={summary} title={"결제금액"} amount={summary.todayPaidAmount} />
                                        </FlexChild>
                                        <FlexChild width={"90%"}>
                                            <div className={style.line} />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild width={"90%"}>
                                            <Content data={summary} minus title={"환불금액"} amount={summary.todayRefundAmount} />
                                        </FlexChild>
                                        <FlexChild width={"90%"}>
                                            <div className={style.line} />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                                <FlexChild>
                                    <VerticalFlex>
                                        <FlexChild width={"90%"}>
                                            <Content data={summary} color title={"총매출"} amount={summary.todayValidAmount} />
                                        </FlexChild>
                                        <FlexChild width={"90%"}>
                                            <div className={style.line} />
                                        </FlexChild>
                                    </VerticalFlex>
                                </FlexChild>
                            </VerticalFlex>
                        </div>
                    </FlexChild>
                </VerticalFlex>
            }

        </div >
    );
}

export default SalesTodayStatus;