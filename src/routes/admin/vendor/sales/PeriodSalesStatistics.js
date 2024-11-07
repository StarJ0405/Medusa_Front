import { DatePicker } from "antd";
import { requester } from "App";
import CustomButton from "components/buttons/CustomButton";
import TestDatePicker from "components/inputs/datePicker/TestDatePicker";
import P from "components/P";
import { format } from "date-fns";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStyle, hexToRgba } from '@coreui/utils'
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCol, CProgress, CRow } from "@coreui/react";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import MyPartnersPaginatedTable from "routes/table/MyPartnersPaginatedTable";
import useAltEffect from "shared/hooks/useAltEffect";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";


function PeriodSalesStatistics() {
    const dateRef = useRef();
    const [history, setHistory] = useState([]);

    const [progressData, setProgressData] = useState([
        { title: 'Week', value: 0, color: "primary" },
        { title: 'Month', value: 0, color: "success" },
        { title: 'Year', value: 0, color: 'info' },
    ]);
    const [selectedPeriod, setSelectedPeriod] = useState('');
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
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
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
        Month3: {
            labels: [],
            datasets: [
                {
                    label: 'Data Count',
                    backgroundColor: hexToRgba(getStyle('--cui-warning'), 10),
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: new Array(3).fill(0),
                },
            ],
        },
        Month6: {
            labels: [],
            datasets: [
                {
                    label: 'Data Count',
                    backgroundColor: hexToRgba(getStyle('--cui-success'), 10),
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: new Array(6).fill(0),
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

    const columns = [
        "번호",
        "상품사진",
        "상품명",
        "상품가격",
        "수량",
        "총합",
        "주문날짜",
        "이메일"
    ];

    useAltEffect(() => {
        setTimeout(() => {
            requester.findSalesHistoryAll((result) => {
                setHistory(result.data);
            })
        }, 1500)
    }, [])

    const onClick = (start, end, active) => {
        console.log(start);
        console.log(end);
        console.log(active);
        let startDate = start ? start : null;
        let endDate = end ? end : null;



        const resultStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        const resultEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        console.log(resultStartDate);
        console.log(resultEndDate);
        let data = { startDate: resultStartDate, endDate: resultEndDate }
        if (active[0]) { // 1주일
            data = { startDate: resultStartDate, endDate: resultEndDate, type: "Week" }
        } else if (active[1]) { // 1달
            data = { startDate: resultStartDate, endDate: resultEndDate, type: "Month" }
        } else if (active[2]) { // 3달
            data = { startDate: resultStartDate, endDate: resultEndDate, type: "Month3" }
        } else if (active[3]) { // 6달
            data = { startDate: resultStartDate, endDate: resultEndDate, type: "Month6" }
        } else if (active[4]) { // 1년
            data = { startDate: resultStartDate, endDate: resultEndDate, type: "Year" }
        } else { // 날짜 선택

        }


        const today = new Date();
        const daysInMonth = new Date(start.currentYear, start.currentMonth + 1, 0).getDate();
        const month3Labels = new Array(3).fill(0).map((_, index) => {
            const date = new Date(today.getFullYear(), today.getMonth() - index, 1);
            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                label: `${date.getFullYear()} / ${date.getMonth() + 1}`,
            };
        }).reverse();



        requester.periodSales(data, (result) => {
            const month6Data = new Array(6).fill(0);
            const month3data = month3Labels.map(({ year, month, label }) => {
                const found = result.data.find(d => d.year === year && d.monthOfYear === month);
                return {
                    label,
                    amount: found ? found.amount : 0,
                };
            });
            console.log(month3data);

            for (let i = 0; i < result.data.length; i++) {
                const month = result.data[i].dayOfMonth;
                month6Data[month - 1] += result.data[i].amount;
            }




            console.log(result.data);

            if (result.data.length > 0) {
                setSelectedPeriod(result.data[0].type);
                setDataByPeriod(prevState => ({
                    ...prevState,
                    Week: {
                        ...prevState.Week,
                        datasets: [
                            {
                                ...prevState.Week.datasets[0],
                                data: [
                                    result.data.find(d => d.dayOfWeek === 1)?.amount || 0,
                                    result.data.find(d => d.dayOfWeek === 2)?.amount || 0,
                                    result.data.find(d => d.dayOfWeek === 3)?.amount || 0,
                                    result.data.find(d => d.dayOfWeek === 4)?.amount || 0,
                                    result.data.find(d => d.dayOfWeek === 5)?.amount || 0,
                                    result.data.find(d => d.dayOfWeek === 6)?.amount || 0,
                                    result.data.find(d => d.dayOfWeek === 7)?.amount || 0,
                                ]
                            }
                        ]
                    },
                    Month: {
                        ...prevState.Month,
                        labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
                        datasets: [
                            {
                                ...prevState.Month.datasets[0],
                                data: Array.from({ length: daysInMonth }, (_, i) => {
                                    const salesData = result.data.find(d =>
                                        new Date(d.year, d.monthOfYear - 1, d.dayOfMonth).getTime() ===
                                        new Date(start.getFullYear(), start.getMonth(), i + 1).getTime());
                                    return salesData ? salesData.amount : 0;
                                })
                            }
                        ]
                    },
                    Month3: {
                        ...prevState.Month3,
                        labels: month3data.map(({ label }) => label),
                        datasets: [
                            {
                                ...prevState.Month3.datasets[0],
                                data: month3data.map(({ amount }) => amount),
                            },
                        ],
                    },
                    Month6: {
                        ...prevState.Month6,
                        labels: new Array(6)
                            .fill(0)
                            .map((_, index) => {
                                const date = new Date(new Date().getFullYear(), new Date().getMonth() - index);
                                return `${date.getFullYear()} / ${date.getMonth() + 1}`;
                            })
                            .reverse(),
                        datasets: [
                            {
                                ...prevState.Month6.datasets[0],
                                data: new Array(6)
                                    .fill(0)
                                    .map((_, index) => {
                                        const targetMonth = new Date(new Date().getFullYear(), new Date().getMonth() - index).getMonth() + 1;

                                        const targetData = result.data.find(d => d.dayOfMonth === targetMonth);

                                        return targetData ? targetData.amount : 0;
                                    })
                                    .reverse(),
                            },
                        ],
                    },
                    Year: {
                        ...prevState.Year,
                        labels: new Array(12)
                            .fill(0)
                            .map((_, index) => {
                                const date = new Date(new Date().getFullYear(), new Date().getMonth() - index);
                                return `${date.getMonth() + 1}`;
                            })
                            .reverse(),
                        datasets: [
                            {
                                ...prevState.Year.datasets[0],
                                data: Array.from({ length: 12 }, (_, i) => {
                                    const monthOfYear = (new Date().getMonth() + 12 - i) % 12 + 1;
                                    return result.data.filter(d => d.monthOfYear === monthOfYear).reduce((sum, d) => sum + d.amount, 0);
                                })
                                    .reverse()
                            }
                        ]
                    }
                }));
            } else {
                console.log("data가 없음");
                setDataByPeriod({
                    Week: {
                        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                        datasets: [
                            {
                                label: 'Data Count',
                                backgroundColor: hexToRgba(getStyle('--cui-warning'), 10),

                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                data: [
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0
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
                    Month3: {
                        labels: [],
                        datasets: [
                            {
                                label: 'Data Count',
                                backgroundColor: hexToRgba(getStyle('--cui-warning'), 10),
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                data: new Array(3).fill(0),
                            },
                        ],
                    },
                    Month6: {
                        labels: [],
                        datasets: [
                            {
                                label: 'Data Count',
                                backgroundColor: hexToRgba(getStyle('--cui-success'), 10),
                                pointHoverBackgroundColor: '#fff',
                                borderWidth: 2,
                                data: new Array(6).fill(0),
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
                })
            }
        })
        requester.findSalesHistoryByDate(data, (result) => {
            setHistory(result.data);
            console.log(result.data);
        })

    }

    useEffect(() => {
        console.log(selectedPeriod);
    }, [selectedPeriod])

    return (
        <VerticalFlex gap={20}>
            <FlexChild>
                <DateChoice ref={dateRef} lookUp={onClick} />
            </FlexChild>
            <FlexChild>
                <CCard className="mb-4">
                    <CCardBody>
                        <CRow>
                            <CCol sm={5}>
                                <h4 id="traffic" className="card-title mb-0">
                                    기간별 매출 통계
                                </h4>
                                <div className="small text-medium-emphasis">매출통계</div>
                            </CCol>

                        </CRow>
                        <CChartLine

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
                                    line: {
                                        borderWidth: 2,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 0,
                                        hitRadius: 10,
                                        hoverRadius: 4,
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
                                },
                            }}
                        />
                    </CCardBody>
                </CCard>
            </FlexChild>
            <FlexChild>
                <P size={"24pt"}>상품상세내역</P>
            </FlexChild>
            <FlexChild>
                <MyPartnersPaginatedTable columns={columns} data={history} />
            </FlexChild>
        </VerticalFlex>

    );
}

export default PeriodSalesStatistics;