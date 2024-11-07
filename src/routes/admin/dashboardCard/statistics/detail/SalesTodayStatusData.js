import { useEffect, useRef, useState, useContext } from "react";
import style from "./SalesTodayStatusData.module.css";
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

function SalesTodayStatusData(props) {

    const { isMobile } = useContext(BrowserDetectContext);
    const navigate = useNavigate();
    const chartContainer = useRef(null);
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
        return () => {
            chartContainer.destroy();
        };
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
            setChartInstance(new Chart(chartContainer.current, config));
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
                    <canvas ref={chartContainer} />
                </div>
            </div>
        </div>
    );
}

export default SalesTodayStatusData;


