import { useEffect, useRef, useState, useContext } from "react";
import style from "./SalesStatus.module.css";
import { Chart, LineController, BarController, LineElement, BarElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
import FlexChild from "layouts/flex/FlexChild";
import VerticalFlex from "layouts/flex/VerticalFlex";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import P from "components/P";
import Center from "layouts/wrapper/Center";
import { useNavigate } from "react-router-dom";
import { requester } from "App";
import { BrowserDetectContext } from "providers/BrowserEventProvider";

Chart.register(LineController, BarController, LineElement, BarElement, PointElement, LinearScale, CategoryScale);

function SalesStatus(props) {

    const { isMobile } = useContext(BrowserDetectContext);
    const navigate = useNavigate();
    const chartContainer2 = useRef(null);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDate = date < 10 ? `0${date}` : date;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    // 오늘 날짜를 'MM월 dd일' 형식으로 표시 (한국어로)
    const todayDateFormatted = today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', });
    const currentMonth = today.toLocaleDateString('ko-KR', { month: 'long', });
    const formattedToday = `${year}-${formattedMonth}-${formattedDate} ${formattedHours}:${formattedMinutes}`;

    const [chartInstance, setChartInstance] = useState();
    const [mounted, setMounted] = useState(false);
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
        

        if (chartInstance) {
            chartInstance.destroy();
        }
    }, [mounted, isMobile]);

    useEffect(() => {
        if (data && chartContainer2.current) {
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


            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: '취소',
                        // data: data[0].orderCount,
                        data: [data[0].refundAmount, data[1].refundAmount, data[2].refundAmount, data[3].refundAmount, data[4].refundAmount, data[5].refundAmount, data[6].refundAmount],
                        backgroundColor: 'transparent',
                        borderColor: 'red',
                        tension: 0.1,
                        fill: true,
                        type: 'line' // Specify this dataset is a line chart
                    },
                    {
                        label: '실매출',
                        data: [data[0].validAmount, data[1].validAmount, data[2].validAmount, data[3].validAmount, data[4].validAmount, data[5].validAmount, data[6].validAmount],
                        backgroundColor: 'transparent',
                        borderColor: 'skyblue',
                        tension: 0.1,
                        fill: true,
                        type: 'line' // Specify this dataset is a line chart
                    },
                    {
                        label: '총주문',
                        data: [data[0].orderAmount, data[1].orderAmount, data[2].orderAmount, data[3].orderAmount, data[4].orderAmount, data[5].orderAmount, data[6].orderAmount],
                        backgroundColor: '#5471e6',
                        type: 'bar' // Specify this dataset is a bar chart
                    }
                ]
            };
            const config = {
                type: 'line', // This is irrelevant when the type is specified on the dataset
                data: chartData,
                options: {
                    maintainAspectRatio: false,
                    // scales: {
                    //     y: {
                    //         type: 'linear',
                    //         ticks: {
                    //             stepSize: 500000,
                    //             callback: function (value) {
                    //                 if (value === 0) return '0';
                    //                 if (value === 2000000) return '200';
                    //                 if (value === 4000000) return '400';
                    //                 if (value === 6000000) return '600';
                    //                 if (value === 8000000) return '800';
                    //                 return null;
                    //             },
                    //         },
                    //     },
                    // },
                },
            };
            // const chartInstance = new Chart(chartContainer.current, config);
            setChartInstance(new Chart(chartContainer2.current, config));
        }
        // return () => {
        //     chartContainer.destroy();
        // };
    }, [data])

    const onStatusClick = () => {

    }

    return (
        <div className={style.container} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
                <div className={style.label}>
                    <p style={{ width: '100%', textAlign: 'left', fontSize: 15 }}>매출 현황</p>
                </div>
            </div>

            <div style={{ flex: 9, padding: "35px", display: 'flex', gap: '30px' }}>

                {
                    isMobile ?
                        <VerticalFlex height={"100%"}>
                            <FlexChild >
                                <div style={{ flex: 3, position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: "-30px", left: 0 }}>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <P color={"#bbb"}>단위/만원</P>
                                            </FlexChild>
                                            <FlexChild justifyContent={"flex-end"} width={"max-content"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <P color={"#bbb"}>최종 업데이트(1시간 마다 업데이트)</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <Center width={"100%"} textAlign={"right"}>
                                                            <P color={"#5471e6"}>{formattedToday}</P>
                                                        </Center>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>

                                    </div>
                                    <canvas ref={chartContainer2} />
                                </div>
                            </FlexChild>
                            <FlexChild>
                                <div style={{ flex: 6 }}>
                                    {
                                        summary &&
                                        <VerticalFlex height={"100%"}>
                                            <FlexChild height={30}>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"}>

                                                    </FlexChild>
                                                    <FlexChild height={"100%"} backgroundColor={"#B9CAF6"} justifyContent={"center"}>
                                                        <P>{todayDateFormatted} (오늘)</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} backgroundColor={"#B9CAF6"} justifyContent={"center"}>
                                                        <P>{currentMonth} 전체</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"} backgroundColor={"#F5F6FB"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P>총주문금액(건수)</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("waitingForPayment")}>{summary.todayOrderAmount} 원 / {summary.todayOrderCount} 건</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("waitingForPayment")}> {summary.totalOrderAmount} 원 /  {summary.totalOrderCount}건</P>

                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"} backgroundColor={"#F5F6FB"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P>총실결제금액(건수)</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("preparingProduct")}>{summary.todayPaidAmount} 원 / {summary.todayPaidCount} 건</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("preparingProduct")}>{summary.totalPaidAmount} 원 / {summary.totalPaidCount} 건</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"} backgroundColor={"#F5F6FB"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P>총환불금액(건수)</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("refund")}>{summary.todayRefundAmount} 원 / {summary.todayRefundCount} 건</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("refund")}>{summary.totalRefundAmount} 원 / {summary.totalRefundCount} 건</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"} backgroundColor={"#F5F6FB"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P>총 매출액(건수)</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P color={"#5572E7"}>{summary.todayValidAmount} 원 / {summary.todayValidCount} 건</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P color={"#5572E7"}>{summary.totalValidAmount} 원 / {summary.totalValidCount} 건</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </VerticalFlex>
                                    }
                                </div>
                            </FlexChild>
                        </VerticalFlex>
                        :
                        <HorizontalFlex>
                            <FlexChild height={"100%"}>
                                <div style={{ flex: 3, position: 'relative', height: "100%" }}>
                                    <div style={{ position: 'absolute', top: "-30px", left: 0 }}>
                                        <HorizontalFlex>
                                            <FlexChild>
                                                <P color={"#bbb"}>단위/만원</P>
                                            </FlexChild>
                                            <FlexChild justifyContent={"flex-end"} width={"max-content"}>
                                                <VerticalFlex>
                                                    <FlexChild>
                                                        <P color={"#bbb"}>최종 업데이트(1시간 마다 업데이트)</P>
                                                    </FlexChild>
                                                    <FlexChild>
                                                        <Center width={"100%"} textAlign={"right"}>
                                                            <P color={"#5471e6"}>{formattedToday}</P>
                                                        </Center>
                                                    </FlexChild>
                                                </VerticalFlex>
                                            </FlexChild>
                                        </HorizontalFlex>

                                    </div>
                                    <canvas ref={chartContainer2} />
                                </div>
                            </FlexChild>
                            <FlexChild height={"100%"}>
                                <div style={{ flex: 6, height: "100%" }}>
                                    {
                                        summary &&
                                        <VerticalFlex height={"100%"}>
                                            <FlexChild height={30}>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"}>

                                                    </FlexChild>
                                                    <FlexChild height={"100%"} backgroundColor={"#B9CAF6"} justifyContent={"center"}>
                                                        <P>{todayDateFormatted} (오늘)</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} backgroundColor={"#B9CAF6"} justifyContent={"center"}>
                                                        <P>{currentMonth} 전체</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"} backgroundColor={"#F5F6FB"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P>총주문금액</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("waitingForPayment")}>{summary.todayOrderAmount} 원 / {summary.todayOrderCount} 건</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("waitingForPayment")}> {summary.totalOrderAmount} 원 /  {summary.totalOrderCount}건</P>

                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"} backgroundColor={"#F5F6FB"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P>총실결제금액</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("preparingProduct")}>{summary.todayPaidAmount} 원 / {summary.todayPaidCount} 건</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("preparingProduct")}>{summary.totalPaidAmount} 원 / {summary.totalPaidCount} 건</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"} backgroundColor={"#F5F6FB"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P>총환불금액</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("refund")}>{summary.todayRefundAmount} 원 / {summary.todayRefundCount} 건</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P cursor hover onClick={() => onStatusClick("refund")}>{summary.totalRefundAmount} 원 / {summary.totalRefundCount} 건</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                            <FlexChild>
                                                <HorizontalFlex>
                                                    <FlexChild height={"100%"} backgroundColor={"#F5F6FB"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P>총 매출액</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P color={"#5572E7"}>{summary.todayValidAmount} 원 / {summary.todayValidCount} 건</P>
                                                    </FlexChild>
                                                    <FlexChild height={"100%"} border={"1px solid #E6E6E6"} justifyContent={"center"}>
                                                        <P color={"#5572E7"}>{summary.totalValidAmount} 원 / {summary.totalValidCount} 건</P>
                                                    </FlexChild>
                                                </HorizontalFlex>
                                            </FlexChild>
                                        </VerticalFlex>
                                    }
                                </div>
                            </FlexChild>
                        </HorizontalFlex>
                }


            </div>
        </div>
    );
}

export default SalesStatus;


