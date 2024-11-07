import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CProgress, CRow } from "@coreui/react";
import { CChartBar, CChartDoughnut, CChartPie } from "@coreui/react-chartjs";
import { requester } from "App";
import CustomButton from "components/buttons/CustomButton";
import TestDatePicker from "components/inputs/datePicker/TestDatePicker";
import InputText from "components/inputs/InputText";
import P from "components/P";
import { format } from "date-fns";
import { data } from "jquery";
import FlexChild from "layouts/flex/FlexChild";
import HorizontalFlex from "layouts/flex/HorizontalFlex";
import VerticalFlex from "layouts/flex/VerticalFlex";
import { useEffect, useRef, useState } from "react";
import { getStyle, hexToRgba } from '@coreui/utils'
import useAltEffect from "shared/hooks/useAltEffect";
import DateChoice from "components/inputs/datePicker/dateChoice/DateChoice";
import MyPartnersPaginatedTable from "routes/table/MyPartnersPaginatedTable";

function CategorySalesStatistics() {
    const dateRef = useRef();
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const [category, setCategory] = useState("");
    const [categoryLabel, setCategoryLabel] = useState([]);
    const [productLabel, setProductLabel] = useState([]);
    const [products, setProducts] = useState([]);
    const [history, setHistory] = useState([]);

    const [progressData, setProgressData] = useState([
        { title: 'ALL', value: 0, color: "primary" },
        { title: 'LIQUID', value: 0, color: "success" },
        { title: 'DEVICE', value: 0, color: 'info' },
    ]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [dataByCategory, setDataByCategory] = useState({
        ALL: {
            labels: ['과일액상', '디저트액상', '음료액상', '기기', '커피액상', '멘솔액상', '연초액상'],
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
        LIQUID: {
            labels: ['과일액상', '디저트액상', '음료액상', '커피액상', '멘솔액상', '연초액상'],
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
        DEVICE: {
            labels: ['기기'],
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



    const onCategoryClick = (value) => {

        setSelectedCategory(value);


        let filteredData = category;

        if (value === 'LIQUID') {
            console.log(category.filter((cat) => cat.titleKr.includes('액상')))
            filteredData = category.filter((cat) => cat.titleKr.includes('액상'));
        } else if (value === 'DEVICE') {
            console.log(category.filter((cat) => cat.titleKr.includes('기기')));
            filteredData = category.filter((cat) => cat.titleKr === '기기');
        }


        const newData = {
            labels: filteredData.map((cat) => cat.titleKr),
            datasets: [
                {
                    label: 'Data Count',
                    backgroundColor: hexToRgba(getStyle('--cui-success'), 10),
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: filteredData.map((cat) => cat.amount),
                },
            ],
        };

        let totalAmount = filteredData.reduce((acc, cur) => acc + cur.amount, 0);
        setProgressData([
            { title: '총합', value: (totalAmount * 1.1).toFixed(0), color: 'primary' },
            { title: '부가세', value: (totalAmount * 0.1).toFixed(0), color: 'warning' },
            { title: '순매출', value: (totalAmount).toFixed(0), color: 'danger' },
        ]);
        setDataByCategory(prevDataByCategory => {
            return {
                ...prevDataByCategory,
                [value]: newData
            }
        });
    };


    const drawChart = () => {
        // 그래프를 그리는 로직
        const chartData = {
            labels: categoryLabel,
            datasets: [
                {
                    data: categoryLabel.map((lbl) => {
                        const found = category.find((cat) => cat.titleKr === lbl);
                        if (!found) {
                            return 0;
                        }
                        console.log((found.quantity / totalQuantity) * 100);
                        return (found.quantity / totalQuantity) * 100;
                    }),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'var(--main-color)', '#3636EE', '#FFCCEE'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'var(--main-color)', '#3636EE', '#FFCCEE'],
                },
            ],
        };
        return (
            <CChartPie
                data={chartData}
            />
        );
    };
    const totalQuantity = category.length > 0 ? category.reduce((total, cat) => {
        return total + cat.quantity;
    }, 0) : 0;

    const onLookUpClick = (start, end) => {
        const startDate = start ? start : null;
        const endDate = end ? end : null;


        const resultStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        const resultEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        let data = { startDate: resultStartDate, endDate: resultEndDate }
        requester.findcategorySalesByDate(data, (result) => {
            setCategory(result.data);
            console.log(result.data.length);
        })
        requester.findSalesHistoryByDate(data, (result) => {
            setHistory(result.data);
        })

    }

    useAltEffect(() => {
        setTimeout(() => {
            requester.findcategorySalesAll((result) => {
                setCategory(result.data);
                console.log(result.data);
            })
            requester.findCategorySalesByProductTop5((result) => {
                console.log(result.data);
                setProducts(result.data);
            })
            requester.findSalesHistoryAll((result) => {
                console.log(result.data);
                setHistory(result.data);
            })
        }, 1500)
    }, [])

    useEffect(() => {
        const productTitleArray = products.map((item) => {
            return (item.brandTitleKr + item.titleKr);
        })
        setProductLabel(productTitleArray);
    }, [products]);

    useEffect(() => {
        if (category) {
            const titleKrArray = category.map((item) => item.titleKr)
            setCategoryLabel(titleKrArray);
            onCategoryClick('ALL');
        }
        drawChart();
        console.log(category);

    }, [category])

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




    return (
        <VerticalFlex gap={20}>
            <FlexChild>
                <DateChoice ref={dateRef} lookUp={onLookUpClick} />
            </FlexChild>

            <FlexChild>
                <HorizontalFlex>
                    <FlexChild justifyContent={"flex-end"}>
                        <CCol xs={9}>
                            <CCard className="mb-4">
                                <CCardHeader>카테고리별 판매율</CCardHeader>
                                <CCardBody>
                                    <CChartPie
                                        data={{
                                            labels: categoryLabel ? categoryLabel : ['test1'],
                                            datasets: [
                                                {
                                                    data: categoryLabel.map((lbl) => {
                                                        const found = category.find((cat) => cat.titleKr === lbl);
                                                        return found ? found.quantity : 0;
                                                    }),
                                                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'var(--main-color)', '#3636EE', '#FFCCEE'],
                                                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'var(--main-color)', '#3636EE', '#FFCCEE'],
                                                },
                                            ],
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </FlexChild>
                    <FlexChild>
                        <CCol xs={9}>
                            <CCard className="mb-4">
                                <CCardHeader>인기품목 TOP5</CCardHeader>
                                <CCardBody>
                                    <CChartDoughnut
                                        data={{
                                            labels: productLabel ? productLabel : null,
                                            datasets: [
                                                {
                                                    data: productLabel.map((row) => {
                                                        const result = products.find((item) => item.brandTitleKr + item.titleKr === row);
                                                        return result ? result.quantity : 0;
                                                    }),
                                                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'var(--main-color)', '#3636EE', '#FFCCEE'],
                                                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', 'var(--main-color)', '#3636EE', '#FFCCEE'],
                                                },
                                            ],
                                        }}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </FlexChild>
                </HorizontalFlex>
            </FlexChild>
            <FlexChild>
                <CCard className="mb-4">
                    <CCardBody>
                        <CRow>
                            <CCol sm={5}>
                                <h4 id="traffic" className="card-title mb-0">
                                    카테고리별 매출통계
                                </h4>
                                <div className="small text-medium-emphasis">카테고리별</div>
                            </CCol>
                            <CCol sm={7} className="d-none d-md-block">
                                <CButtonGroup className="float-end me-3">
                                    {['ALL', 'LIQUID', 'DEVICE'].map((value) => (
                                        <CButton
                                            color="outline-secondary"
                                            key={value}
                                            className="mx-0"

                                            active={value === selectedCategory}
                                            onClick={() => onCategoryClick(value)}
                                        >
                                            {value}
                                        </CButton>
                                    ))}
                                </CButtonGroup>
                            </CCol>
                        </CRow>
                        <CChartBar

                            style={{ height: '300px', marginTop: '40px' }}
                            data={dataByCategory[selectedCategory]}
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

export default CategorySalesStatistics;