import { cilCloudDownload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCol, CProgress, CRow } from "@coreui/react";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import { requester } from "App";
import CustomButton from "components/buttons/CustomButton";
import P from "components/P";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStyle, hexToRgba } from '@coreui/utils'
import style from "./PartnersHistory.module.css"

function PartnersHistory() {
    const { t } = useTranslation();
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const [selectedPeriod, setSelectedPeriod] = useState('');

    //createDateTime을 넣으면 해당 날짜로 바꿔줌
    const dayOfWeek = (createDateTime) => {
        return new Date(createDateTime).toLocaleDateString('ko-KR', { weekday: 'long' });
    }



    const [dataByPeriod, setDataByPeriod] = useState({
        Week: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [
                {
                    label: 'Data Count',
                    backgroundColor: hexToRgba(getStyle('--cui-warning'), 10),

                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: [
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                    ],
                },
            ],
        },
        Month: {
            labels: [],
            datasets: [
                {
                    label: 'Data Count',
                    backgroundColor: hexToRgba(getStyle('--cui-danger'), 10),

                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: new Array(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).fill(0),
                },
            ],
        },
        Year: {
            labels: [],
            datasets: [
                {
                    label: 'Data Count',
                    backgroundColor: hexToRgba(getStyle('--cui-success'), 10),

                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: new Array(12).fill(0),
                },
            ],
        },
    });
    const [progressData, setProgressData] = useState([
        { title: 'Week', value: 0, color: "primary" },
        { title: 'Month', value: 0, color: "success" },
        { title: 'Year', value: 0, color: 'info' },
    ]);

    const onPeriodClick = (period) => {
        setSelectedPeriod(period);
        requester.findPartnersHistory((result) => {
            const historyData = result.data;
            console.log(historyData);
            const dataCount = [0, 0, 0, 0, 0, 0, 0];
            const monthCount = new Array(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).fill(0);
            const yearCount = new Array(12).fill(0);
            const today = new Date();
            const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
            const currentMonthData = historyData.filter(item => new Date(item.createDateTime).getMonth() === new Date().getMonth());
            const currentWeekData = historyData.filter(item => new Date(item.createDateTime) >= firstDayOfWeek && new Date(item.createDateTime) <= lastDayOfWeek);
            

            for (let i = 0; i < currentWeekData.length; i++) {
                const date = new Date(currentWeekData[i].createDateTime);
                const dayOfWeek = date.getDay();
                dataCount[dayOfWeek]++;
            }

            for (let i = 0; i < currentMonthData.length; i++) {
                const date = new Date(currentMonthData[i].createDateTime);
                const dayOfMonth = date.getDate() - 1;
                const monthIndex = date.getMonth();

                monthCount[dayOfMonth]++;
                
            }

            for (let i = 0; i < historyData.length; i++) {
                const date = new Date(historyData[i].createDateTime);
                const monthIndex = date.getMonth();
              
                yearCount[monthIndex]++;
              }

            const newData = [
                { title: 'Week', value: dataCount.reduce((a, b) => a + b, 0), color: "primary" },
                { title: 'Month', value: monthCount.reduce((a, b) => a + b, 0), color: "success" },
                { title: 'Year', value: yearCount.reduce((a, b) => a + b, 0), color: 'info' },
            ];

            setProgressData(newData);

            setDataByPeriod({
                ...dataByPeriod,
                Week: {
                    ...dataByPeriod.Week,
                    datasets: [
                        {
                            ...dataByPeriod.Week.datasets[0],
                            data: dataCount,
                        },
                    ],
                },
                Month: {
                    ...dataByPeriod.Month,
                    labels: Array.from({ length: monthCount.length }, (_, i) => i + 1),
                    datasets: [
                        {
                            ...dataByPeriod.Month.datasets[0],
                            data: monthCount,
                        },
                    ],
                },
                Year: {
                    ...dataByPeriod.Year,
                    labels: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],
                    datasets: [
                        {
                            ...dataByPeriod.Year.datasets[0],
                            data: yearCount,
                        },
                    ],
                },
            });
        });
    };






    return (

        <CCard className="mb-4">
            <CCardBody>
                <CRow>
                    <CCol sm={5}>
                        <h4 id="traffic" className="card-title mb-0">
                            파트너스 HISTORY
                        </h4>
                        <div className="small text-medium-emphasis">URL 접속 현황</div>
                    </CCol>
                    <CCol sm={7} className="d-md-block">
                        <CButtonGroup className="float-end me-3">
                            {['Week', 'Month', 'Year'].map((value) => (
                                <CButton
                                    color="outline-secondary"
                                    key={value}
                                    className="mx-0"

                                    active={value === selectedPeriod}
                                    onClick={() => onPeriodClick(value)}
                                >
                                    {value}
                                </CButton>
                            ))}
                        </CButtonGroup>
                    </CCol>
                </CRow>
                <CChartBar

                    style={{ height: '300px', marginTop: '40px' }}
                    data={dataByPeriod[selectedPeriod]}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },

                        },
                        scales: {
                            x: {
                                grid: {
                                    drawOnChartArea: false,
                                },
                            },
                            y: {
                                ticks: {
                                    beginAtZero: true,
                                    maxTicksLimit: 5,
                                    stepSize: Math.ceil(250 / 5),
                                    max: 1000,
                                },
                            },

                        },
                        elements: {
                            bar: {
                                categoryPercentage: 0,
                                barPercentage: 0,
                                borderWidth: 0,
                            },
                        },
                        interaction: {
                            intersect: false,
                        },
                        tooltips: {
                            enabled: true,
                            mode: 'nearest',
                            intersect: false,
                            position: 'nearest',
                            custom: function (tooltipModel) {
                                tooltipModel.opacity = 0;
                                tooltipModel.title = '';
                                tooltipModel.body[0].lines = [];
                            },
                            backgroundColor: 'rgba(0,0,0,0)',

                        }

                    }}
                />
            </CCardBody>
            <CCardFooter>
                <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
                    {progressData.map((item, index) => (
                        <CCol className="mb-sm-2 mb-0" key={index}>
                            <div className="text-medium-emphasis">{item.title}</div>
                            <strong>
                                {item.value}
                            </strong>
                            <CProgress thin className="mt-2" value={100} color={item.color} />
                        </CCol>
                    ))}
                </CRow>
            </CCardFooter>
        </CCard>
    );
}

export default PartnersHistory;