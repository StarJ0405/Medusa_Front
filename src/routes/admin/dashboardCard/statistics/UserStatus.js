import { CCard, CCardBody, CCol, CCardHeader, CRow, CTableHead, CTableRow, CTable, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react'
import {
    CChartBar,
    CChartDoughnut,
    CChartLine,
    CChartPie,
    CChartPolarArea,
    CChartRadar,
} from '@coreui/react-chartjs'
import style from "./UserStatus.module.css";
import FlexChild from 'layouts/flex/FlexChild';
import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import P from 'components/P';
import HorizontalFlex from 'layouts/flex/HorizontalFlex';
import VerticalFlex from 'layouts/flex/VerticalFlex';
import Center from 'layouts/wrapper/Center';
import Inline from 'layouts/container/Inline';
import Dummy from 'components/Dummy';
import { requester } from 'App';
import axios from 'axios';



const esHost = 'http://worldvape.co.kr:9200';

function UserStatus() {
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
    const [mounted, setMounted] = useState(false);
    const [weekVisitorStatistics, setWeekVisitorStatistics] = useState();
    const [weekNewMemberStatistics, setWeekNewMemberStatistics] = useState();
    const [weekWithdrawalMember, setWeekWithdrawalMember] = useState();
    const [todayAccessTotal, setTodayAccessTotal] = useState([]);
    const [esData, setEsData] = useState([]);

    const formattedToday = `${year}-${formattedMonth}-${formattedDate} ${formattedHours}:${formattedMinutes}`;


    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        console.log(esData);
    }, [esData])

    useEffect(() => {

        requester.getWeekVisitorStatistics((result) => {
            console.log(result.data)   
        })
        
        // requester.todayAccessStatistics((result) => {
        //     console.log(result.hits.total.value);
        //     // setTodayAccessTotal(result.hits.total.value);
        // })
    }, [mounted])
    useEffect(() => {
        newMemberData();
    }, [weekVisitorStatistics])
    useEffect(() => {
        withdrawalMemberData();
    }, [weekNewMemberStatistics])
    useEffect(() => {
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
        //const labels = ['07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17'];
        const data = {
            labels: labels,
            datasets: [
                {
                    label: '신규가입',
                    data: weekNewMemberStatistics && weekNewMemberStatistics,
                    backgroundColor: 'transparent',
                    borderColor: 'red',
                    tension: 0.1,
                    fill: true,
                    type: 'line' // Specify this dataset is a line chart
                },
                {
                    label: '탈퇴회원',
                    data: weekWithdrawalMember && weekWithdrawalMember,
                    backgroundColor: 'transparent',
                    borderColor: 'skyblue',
                    tension: 0.1,
                    fill: true,
                    type: 'line' // Specify this dataset is a line chart
                },
                {
                    label: '방문자수',
                    data: weekVisitorStatistics && weekVisitorStatistics,
                    backgroundColor: '#5471e6',
                    type: 'bar' // Specify this dataset is a bar chart
                }
            ]
        };

        const config = {
            type: 'line', // This is irrelevant when the type is specified on the dataset
            data: data,
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
                scales: {
                    y: {
                        type: 'linear',
                        ticks: {
                            stepSize: 500000,
                            callback: function (value) {
                                if (value === 0) return '0';
                                if (value === 2000000) return '200';
                                if (value === 4000000) return '400';
                                if (value === 6000000) return '600';
                                if (value === 8000000) return '800';
                                return null;
                            },
                        },
                    },
                },
            },
        };

        const chartInstance = new Chart(chartContainer.current, config);

        return () => {
            chartInstance.destroy();
        };
    }, [weekWithdrawalMember])

    const newMemberData = () => {
        requester.getWeekNewMemberStatistics((result) => {
            const totalArray = result.data.map(item => item.count);
            setWeekNewMemberStatistics(totalArray)
            console.log(result.data);
        })
    }
    const withdrawalMemberData = () => {
        requester.getWeekWithdrawalMember((result) => {
            const totalArray = result.data.map(item => item.count);
            setWeekWithdrawalMember(totalArray);
        })
    }




    return (
        <div className={style.container} style={{ display: 'flex', flexDirection: 'column' }}>


            <div style={{ flex: 9, padding: "35px", display: 'flex', gap: '30px' }}>
                <div style={{ flex: 3, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: "-30px", left: 0 }}>
                        <HorizontalFlex>
                            <FlexChild>
                                <P color={"#bbb"}>단위/명</P>
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
            <div className={style.labelWrap}>
                <Inline>
                    <P color={"#5471e6"}>■ 방문자수 </P>
                    <Dummy width={"30px"} />
                    <P color={"red"}>■ 신규가입 </P>
                    <Dummy width={"30px"} />
                    <P color={"skyblue"}>■ 탈퇴회원</P>
                </Inline>
            </div>
        </div>
    );
}

export default UserStatus;